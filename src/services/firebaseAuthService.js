// Firebase Authentication Service for NASA Space Biology Knowledge Graph
import {
  auth,
  db,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  updateProfile,
  sendPasswordResetEmail,
  onAuthStateChanged,
  doc,
  setDoc,
  getDoc,
  updateDoc
} from '../config/firebase.js';

class FirebaseAuthService {
  constructor() {
    this.currentUser = null;
    this.authStateListeners = [];
    this.initializeAuthListener();
  }

  // Initialize auth state listener
  initializeAuthListener() {
    onAuthStateChanged(auth, (user) => {
      this.currentUser = user;
      // Notify all listeners about auth state changes
      this.authStateListeners.forEach(listener => {
        if (typeof listener === 'function') {
          listener(user);
        }
      });
    });
  }

  // Add auth state change listener
  addAuthStateListener(callback) {
    this.authStateListeners.push(callback);
    // Return unsubscribe function
    return () => {
      this.authStateListeners = this.authStateListeners.filter(
        listener => listener !== callback
      );
    };
  }

  // Get current user
  getCurrentUser() {
    return this.currentUser;
  }

  // Check if user is authenticated
  isAuthenticated() {
    return !!this.currentUser;
  }

  // Register new user
  async register(userData) {
    try {
      const { email, password, firstName, lastName, institution, researchArea } = userData;
      
      // Create user account
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;

      // Update the user's profile
      await updateProfile(user, {
        displayName: `${firstName} ${lastName}`.trim()
      });

      // Create user document in Firestore
      const userDocData = {
        uid: user.uid,
        email: user.email,
        firstName: firstName || '',
        lastName: lastName || '',
        institution: institution || '',
        researchArea: researchArea || '',
        role: 'scientist',
        createdAt: new Date().toISOString(),
        lastLogin: new Date().toISOString(),
        profileComplete: true
      };

      await setDoc(doc(db, 'users', user.uid), userDocData);

      return {
        success: true,
        user: {
          uid: user.uid,
          email: user.email,
          ...userDocData
        },
        message: 'Registration successful'
      };
    } catch (error) {
      console.error('Registration error:', error);
      return {
        success: false,
        error: this.getErrorMessage(error),
        code: error.code
      };
    }
  }

  // Login user
  async login(credentials) {
    try {
      const { email, password } = credentials;
      
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;

      // Update last login in Firestore
      const userDocRef = doc(db, 'users', user.uid);
      await updateDoc(userDocRef, {
        lastLogin: new Date().toISOString()
      });

      // Get user data from Firestore
      const userDoc = await getDoc(userDocRef);
      const userData = userDoc.exists() ? userDoc.data() : {};

      return {
        success: true,
        user: {
          uid: user.uid,
          email: user.email,
          ...userData
        },
        message: 'Login successful'
      };
    } catch (error) {
      console.error('Login error:', error);
      return {
        success: false,
        error: this.getErrorMessage(error),
        code: error.code
      };
    }
  }

  // Logout user
  async logout() {
    try {
      await signOut(auth);
      this.currentUser = null;
      return {
        success: true,
        message: 'Logout successful'
      };
    } catch (error) {
      console.error('Logout error:', error);
      return {
        success: false,
        error: this.getErrorMessage(error)
      };
    }
  }

  // Get user profile data
  async getUserProfile(uid) {
    try {
      const userDoc = await getDoc(doc(db, 'users', uid || this.currentUser?.uid));
      
      if (userDoc.exists()) {
        return {
          success: true,
          user: {
            uid: userDoc.id,
            ...userDoc.data()
          }
        };
      } else {
        return {
          success: false,
          error: 'User profile not found'
        };
      }
    } catch (error) {
      console.error('Get profile error:', error);
      return {
        success: false,
        error: this.getErrorMessage(error)
      };
    }
  }

  // Update user profile
  async updateProfile(profileData) {
    try {
      if (!this.currentUser) {
        throw new Error('No authenticated user');
      }

      const userDocRef = doc(db, 'users', this.currentUser.uid);
      
      // Update Firestore document
      await updateDoc(userDocRef, {
        ...profileData,
        updatedAt: new Date().toISOString()
      });

      // Update Firebase Auth profile if name changed
      if (profileData.firstName || profileData.lastName) {
        await updateProfile(this.currentUser, {
          displayName: `${profileData.firstName || ''} ${profileData.lastName || ''}`.trim()
        });
      }

      // Get updated user data
      const updatedProfile = await this.getUserProfile();
      
      return {
        success: true,
        user: updatedProfile.user,
        message: 'Profile updated successfully'
      };
    } catch (error) {
      console.error('Update profile error:', error);
      return {
        success: false,
        error: this.getErrorMessage(error)
      };
    }
  }

  // Reset password
  async resetPassword(email) {
    try {
      await sendPasswordResetEmail(auth, email);
      return {
        success: true,
        message: 'Password reset email sent'
      };
    } catch (error) {
      console.error('Reset password error:', error);
      return {
        success: false,
        error: this.getErrorMessage(error)
      };
    }
  }

  // Get user display name
  getUserDisplayName(user = this.currentUser) {
    if (!user) return '';
    
    // Try display name from Firebase Auth
    if (user.displayName) return user.displayName;
    
    // Try first and last name from Firestore data
    if (user.firstName || user.lastName) {
      return `${user.firstName || ''} ${user.lastName || ''}`.trim();
    }
    
    // Fallback to email
    return user.email || 'User';
  }

  // Get user initials
  getUserInitials(user = this.currentUser) {
    if (!user) return 'U';
    
    if (user.firstName && user.lastName) {
      return `${user.firstName[0]}${user.lastName[0]}`.toUpperCase();
    }
    
    if (user.displayName) {
      const names = user.displayName.split(' ');
      if (names.length >= 2) {
        return `${names[0][0]}${names[names.length - 1][0]}`.toUpperCase();
      }
      return names[0][0].toUpperCase();
    }
    
    if (user.email) {
      return user.email[0].toUpperCase();
    }
    
    return 'U';
  }

  // Convert Firebase error to user-friendly message
  getErrorMessage(error) {
    switch (error.code) {
      case 'auth/user-not-found':
        return 'No account found with this email address.';
      case 'auth/wrong-password':
        return 'Incorrect password. Please try again.';
      case 'auth/invalid-email':
        return 'Please enter a valid email address.';
      case 'auth/user-disabled':
        return 'This account has been disabled. Please contact support.';
      case 'auth/email-already-in-use':
        return 'An account with this email already exists.';
      case 'auth/weak-password':
        return 'Password should be at least 6 characters long.';
      case 'auth/operation-not-allowed':
        return 'Email/password accounts are not enabled. Please contact support.';
      case 'auth/invalid-credential':
        return 'Invalid email or password. Please check your credentials.';
      case 'auth/too-many-requests':
        return 'Too many failed attempts. Please try again later.';
      case 'auth/network-request-failed':
        return 'Network error. Please check your internet connection.';
      default:
        return error.message || 'An unexpected error occurred. Please try again.';
    }
  }

  // Check if error is authentication related
  isAuthError(error) {
    return error?.code?.startsWith('auth/') || false;
  }
}

// Create singleton instance
const firebaseAuthService = new FirebaseAuthService();
export default firebaseAuthService;