import React, { useEffect } from 'react';
import { useAuth } from '../hooks/useAuth';
import './UserProfile.css';

const UserProfile = ({ setCurrentPage }) => {
  const { user, logout, loading, isAuthenticated, getUserInitials } = useAuth();

  // Redirect to signin if not authenticated
  useEffect(() => {
    if (!isAuthenticated && !loading) {
      setCurrentPage('signin');
    }
  }, [isAuthenticated, loading, setCurrentPage]);

  const handleLogout = async () => {
    try {
      await logout();
      setCurrentPage('home');
    } catch (err) {
      console.error('Logout error:', err);
    }
  };

  // Show loading while checking authentication
  if (loading) {
    return (
      <div className="user-profile-page">
        <div className="container">
          <div className="loading-container">
            <div className="loading-spinner"></div>
            <p>Loading your profile...</p>
          </div>
        </div>
      </div>
    );
  }

  // Show nothing if not authenticated (will redirect)
  if (!isAuthenticated) {
    return null;
  }

  return (
    <div className="user-profile-page">
      <div className="container">
        <div className="profile-dashboard">
          <div className="dashboard-header">
            <div className="user-info">
              <div className="user-avatar">
                <div className="avatar-text">
                  {getUserInitials()}
                </div>
              </div>
              <div className="user-details">
                <h1>Welcome back, {user.firstName}!</h1>
                <p className="user-email">{user.email}</p>
                {user.institution && (
                  <p className="user-institution">{user.institution}</p>
                )}
              </div>
            </div>
            <button 
              className="btn btn-secondary logout-btn"
              onClick={handleLogout}
              disabled={loading}
            >
              {loading ? 'Signing out...' : 'Sign Out'}
            </button>
          </div>

          <div className="dashboard-content">
            <div className="profile-stats">
              <div className="stat-card">
                <div className="stat-number">24</div>
                <div className="stat-label">Publications Accessed</div>
              </div>
              <div className="stat-card">
                <div className="stat-number">7</div>
                <div className="stat-label">Searches This Month</div>
              </div>
              <div className="stat-card">
                <div className="stat-number">3</div>
                <div className="stat-label">Saved Queries</div>
              </div>
            </div>

            <div className="profile-sections">
              <div className="section">
                <h3>Research Interests</h3>
                <div className="research-area">
                  {user.researchArea || 'Not specified'}
                </div>
              </div>

              <div className="section">
                <h3>Recent Activity</h3>
                <div className="activity-list">
                  <div className="activity-item">
                    <span className="activity-icon">🔍</span>
                    <span>Searched for "microgravity plant biology"</span>
                    <span className="activity-time">2 hours ago</span>
                  </div>
                  <div className="activity-item">
                    <span className="activity-icon">📄</span>
                    <span>Accessed "Effects of Microgravity on Plant Growth"</span>
                    <span className="activity-time">1 day ago</span>
                  </div>
                  <div className="activity-item">
                    <span className="activity-icon">💾</span>
                    <span>Saved search query</span>
                    <span className="activity-time">3 days ago</span>
                  </div>
                </div>
              </div>

              <div className="section">
                <h3>Quick Actions</h3>
                <div className="quick-actions">
                  <button 
                    className="btn btn-primary"
                    onClick={() => setCurrentPage('search')}
                  >
                    Search Publications
                  </button>
                  <button 
                    className="btn btn-secondary"
                    onClick={() => setCurrentPage('resources')}
                  >
                    Browse Resources
                  </button>
                  <button 
                    className="btn btn-secondary"
                    onClick={() => setCurrentPage('about')}
                  >
                    About Research
                  </button>
                </div>
              </div>

              <div className="section">
                <h3>Account Settings</h3>
                <div className="settings-grid">
                  <div className="setting-item">
                    <h4>Personal Information</h4>
                    <p>Update your name and contact information</p>
                    <button className="btn btn-outline">Edit Profile</button>
                  </div>
                  <div className="setting-item">
                    <h4>Research Preferences</h4>
                    <p>Customize your research area and interests</p>
                    <button className="btn btn-outline">Update Preferences</button>
                  </div>
                  <div className="setting-item">
                    <h4>Notifications</h4>
                    <p>Manage email notifications and alerts</p>
                    <button className="btn btn-outline">Notification Settings</button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserProfile;