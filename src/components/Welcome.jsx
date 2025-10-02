import React from 'react';
import './Welcome.css';

const Welcome = ({ setCurrentPage }) => {
  const handleSearchClick = () => {
    setCurrentPage('search');
  };

  const handleResourcesClick = () => {
    setCurrentPage('resources');
  };

  const handleProfileClick = () => {
    setCurrentPage('profile');
  };

  return (
    <section className="welcome">
      <div className="container">
        <div className="welcome-content">
          {/* Main welcome section */}
          <div className="welcome-main">
            <div className="welcome-header">
              <h2>Dynamic Research Dashboard</h2>
              <p>Leverage AI and knowledge graphs to explore NASA's space biology research</p>
            </div>
            
            {/* Quick action cards */}
            <div className="action-cards">
              <div className="action-card">
                <div className="card-icon">
                  <svg viewBox="0 0 24 24" fill="currentColor">
                    <path d="M15.5 14h-.79l-.28-.27C15.41 12.59 16 11.11 16 9.5 16 5.91 13.09 3 9.5 3S3 5.91 3 9.5 5.91 16 9.5 16c1.61 0 3.09-.59 4.23-1.57l.27.28v.79l5 4.99L20.49 19l-4.99-5zm-6 0C7.01 14 5 11.99 5 9.5S7.01 5 9.5 5 14 7.01 14 9.5 11.99 14 9.5 14z"/>
                  </svg>
                </div>
                <h3>Search Publications</h3>
                <p>Explore 608 NASA bioscience publications with AI-powered search and filtering</p>
                <button 
                  className="btn btn-primary"
                  onClick={handleSearchClick}
                >
                  Start Searching
                </button>
              </div>
              
              <div className="action-card highlight">
                <div className="card-icon">
                  <svg viewBox="0 0 24 24" fill="currentColor">
                    <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/>
                  </svg>
                </div>
                <h3>Knowledge Insights</h3>
                <p>Discover scientific progress, gaps, and consensus areas for mission planning</p>
                <button 
                  className="btn btn-primary"
                  onClick={handleResourcesClick}
                >
                  Explore Insights
                </button>
              </div>
              
              <div className="action-card">
                <div className="card-icon">
                  <svg viewBox="0 0 24 24" fill="currentColor">
                    <path d="M16 1H4c-1.1 0-2 .9-2 2v14h2V3h12V1zm3 4H8c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h11c1.1 0 2-.9 2-2V7c0-1.1-.9-2-2-2zm0 16H8V7h11v14z"/>
                  </svg>
                </div>
                <h3>Join Researchers</h3>
                <p>Connect with scientists, managers, and mission architects advancing space exploration</p>
                <button 
                  className="btn btn-primary"
                  onClick={handleProfileClick}
                >
                  Join Community
                </button>
              </div>
            </div>
          </div>
          
          {/* Target Audience section */}
          <div className="audience-section">
            <h3>Built For Space Exploration Teams</h3>
            <div className="audience-grid">
              <div className="audience-item">
                <div className="audience-icon">
                  <div className="icon-text">Lab</div>
                </div>
                <div>
                  <h4>Scientists</h4>
                  <p>Generate new hypotheses from comprehensive research analysis</p>
                </div>
              </div>
              <div className="audience-item">
                <div className="audience-icon">
                  <div className="icon-text">Mgmt</div>
                </div>
                <div>
                  <h4>Investment Managers</h4>
                  <p>Identify opportunities and gaps for strategic research investment</p>
                </div>
              </div>
              <div className="audience-item">
                <div className="audience-icon">
                  <div className="icon-text">Arch</div>
                </div>
                <div>
                  <h4>Mission Architects</h4>
                  <p>Access actionable insights for safe Moon and Mars exploration</p>
                </div>
              </div>
            </div>
          </div>

          {/* Statistics section */}
          <div className="stats-section">
            <div className="stats-grid">
              <div className="stat-item">
                <div className="stat-number">608</div>
                <div className="stat-label">NASA Publications</div>
              </div>
              <div className="stat-item">
                <div className="stat-number">AI</div>
                <div className="stat-label">Powered Analysis</div>
              </div>
              <div className="stat-item">
                <div className="stat-number">∞</div>
                <div className="stat-label">Research Insights</div>
              </div>
              <div className="stat-item">
                <div className="stat-number">Space</div>
                <div className="stat-label">Future Missions</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Welcome;