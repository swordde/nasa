import { useState, useEffect, useContext, createContext } from 'react';
import { 
  auth, 
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  updateProfile,
  sendPasswordResetEmail,
  onAuthStateChanged,
  db,
  doc,
  setDoc,
  getDoc,
  updateDoc
} from '../config/firebase.js';

const AuthContext = createContext({});

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (firebaseUser) => {
      if (firebaseUser) {
        try {
          const userDocRef = doc(db, 'users', firebaseUser.uid);
          const userDoc = await getDoc(userDocRef);
          
          const userData = {
            id: firebaseUser.uid,
            email: firebaseUser.email,
            firstName: firebaseUser.displayName?.split(' ')[0] || '',
            lastName: firebaseUser.displayName?.split(' ').slice(1).join(' ') || '',
            institution: '',
            researchArea: '',
            role: 'scientist',
            avatar: firebaseUser.photoURL,
            createdAt: firebaseUser.metadata.creationTime,
            lastLogin: firebaseUser.metadata.lastSignInTime,
            ...(userDoc.exists() ? userDoc.data() : {})
          };
          
          setUser(userData);
        } catch (error) {
          console.error('Error fetching user data:', error);
          setUser({
            id: firebaseUser.uid,
            email: firebaseUser.email,
            firstName: firebaseUser.displayName?.split(' ')[0] || '',
            lastName: firebaseUser.displayName?.split(' ').slice(1).join(' ') || '',
            institution: '',
            researchArea: '',
            role: 'scientist',
            avatar: firebaseUser.photoURL,
            createdAt: firebaseUser.metadata.creationTime,
            lastLogin: firebaseUser.metadata.lastSignInTime
          });
        }
      } else {
        setUser(null);
      }
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  const login = async (credentials) => {
    setLoading(true);
    setError(null);
    
    try {
      const { email, password } = credentials;
      await signInWithEmailAndPassword(auth, email, password);
      
      return {
        success: true,
        message: 'Login successful'
      };
    } catch (error) {
      console.error('Login error:', error);
      let errorMessage = 'Login failed';
      
      if (error.code === 'auth/user-not-found') {
        errorMessage = 'No account found with this email address';
      } else if (error.code === 'auth/wrong-password') {
        errorMessage = 'Incorrect password';
      } else if (error.code === 'auth/invalid-email') {
        errorMessage = 'Please enter a valid email address';
      } else if (error.code === 'auth/too-many-requests') {
        errorMessage = 'Too many failed attempts. Please try again later';
      } else if (error.code === 'auth/invalid-credential') {
        errorMessage = 'Invalid email or password';
      }
      
      setError(errorMessage);
      return {
        success: false,
        error: errorMessage
      };
    } finally {
      setLoading(false);
    }
  };

  const register = async (userData) => {
    setLoading(true);
    setError(null);
    
    try {
      const { email, password, firstName, lastName, institution, researchArea } = userData;
      
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      const firebaseUser = userCredential.user;
      
      const displayName = `${firstName} ${lastName}`.trim();
      if (displayName) {
        await updateProfile(firebaseUser, { displayName });
      }
      
      const userDocData = {
        email,
        firstName,
        lastName,
        institution: institution || '',
        researchArea: researchArea || '',
        role: 'scientist',
        createdAt: new Date().toISOString(),
        lastLogin: new Date().toISOString()
      };
      
      await setDoc(doc(db, 'users', firebaseUser.uid), userDocData);
      
      return {
        success: true,
        user: { id: firebaseUser.uid, ...userDocData },
        message: 'Registration successful'
      };
    } catch (error) {
      console.error('Registration error:', error);
      let errorMessage = 'Registration failed';
      
      if (error.code === 'auth/email-already-in-use') {
        errorMessage = 'This email address is already registered';
      } else if (error.code === 'auth/weak-password') {
        errorMessage = 'Password should be at least 6 characters';
      } else if (error.code === 'auth/invalid-email') {
        errorMessage = 'Please enter a valid email address';
      }
      
      setError(errorMessage);
      return {
        success: false,
        error: errorMessage
      };
    } finally {
      setLoading(false);
    }
  };

  const logout = async () => {
    setLoading(true);
    
    try {
      await signOut(auth);
      return {
        success: true,
        message: 'Logout successful'
      };
    } catch (error) {
      console.error('Logout error:', error);
      return {
        success: true,
        message: 'Logout successful'
      };
    } finally {
      setLoading(false);
    }
  };

  const forgotPassword = async (email) => {
    setLoading(true);
    setError(null);
    
    try {
      await sendPasswordResetEmail(auth, email);
      return {
        success: true,
        message: 'Password reset email sent'
      };
    } catch (error) {
      console.error('Password reset error:', error);
      let errorMessage = 'Failed to send password reset email';
      
      if (error.code === 'auth/user-not-found') {
        errorMessage = 'No account found with this email address';
      } else if (error.code === 'auth/invalid-email') {
        errorMessage = 'Please enter a valid email address';
      }
      
      setError(errorMessage);
      return {
        success: false,
        error: errorMessage
      };
    } finally {
      setLoading(false);
    }
  };

  const updateUserProfile = async (profileData) => {
    setLoading(true);
    setError(null);
    
    try {
      const { firstName, lastName, institution, researchArea } = profileData;
      const currentUser = auth.currentUser;
      
      if (!currentUser) {
        throw new Error('No user logged in');
      }
      
      const displayName = `${firstName} ${lastName}`.trim();
      if (displayName && displayName !== currentUser.displayName) {
        await updateProfile(currentUser, { displayName });
      }
      
      const userDocRef = doc(db, 'users', currentUser.uid);
      const updateData = {
        firstName,
        lastName,
        institution: institution || '',
        researchArea: researchArea || '',
        lastUpdated: new Date().toISOString()
      };
      
      await updateDoc(userDocRef, updateData);
      
      setUser(prevUser => ({ ...prevUser, ...updateData }));
      
      return {
        success: true,
        message: 'Profile updated successfully'
      };
    } catch (error) {
      console.error('Profile update error:', error);
      const errorMessage = error.message || 'Failed to update profile';
      setError(errorMessage);
      return {
        success: false,
        error: errorMessage
      };
    } finally {
      setLoading(false);
    }
  };

  const clearError = () => setError(null);
  
  const isAuthenticated = () => !!user;
  
  const getUserDisplayName = () => {
    if (!user) return '';
    return `${user.firstName} ${user.lastName}`.trim() || user.email || 'User';
  };

  const getUserInitials = () => {
    if (!user) return '?';
    if (user.firstName && user.lastName) {
      return `${user.firstName[0]}${user.lastName[0]}`.toUpperCase();
    }
    if (user.email) {
      return user.email[0].toUpperCase();
    }
    return '?';
  };

  const value = {
    user,
    loading,
    error,
    login,
    register,
    logout,
    forgotPassword,
    updateUserProfile,
    clearError,
    isAuthenticated,
    getUserDisplayName,
    getUserInitials
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};