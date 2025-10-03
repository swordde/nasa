import React, { useState, useEffect } from 'react';
import './ResourcesPage.css';

const ResourcesPage = () => {
  const [activeTab, setActiveTab] = useState('details');
  const [tabAnimation, setTabAnimation] = useState(false);

  const tabs = [
    { id: 'details', label: 'Research Details', icon: '🔬' },
    { id: 'resources', label: 'Available Resources', icon: '📚' },
    { id: 'teams', label: 'Research Teams', icon: '👨‍🚀' }
  ];

  // Trigger animation when tab changes
  useEffect(() => {
    setTabAnimation(true);
    const timer = setTimeout(() => setTabAnimation(false), 500);
    return () => clearTimeout(timer);
  }, [activeTab]);

  return (
    <div className="resources-page">
      <div className="container">
        <div className="resources-layout">
          {/* Left Content Area */}
          <div className="resources-main">
            {/* Header Section */}
            <div className="resources-header">
              <h1>About the Resources</h1>
              <p className="subtitle">
                Explore our comprehensive collection of publications and research materials 
                focused on space biology and astrobiology research.
              </p>
            </div>

            {/* Content Description Box */}
            <div className="content-description">
              <div className="description-box">
                <h3>Resource Information</h3>
                <p>
                  Our resource collection includes peer-reviewed publications, research datasets, 
                  experimental protocols, and collaborative research findings from NASA's space 
                  biology program. These materials provide comprehensive insights into how 
                  biological systems respond to space environments.
                </p>
                <div className="resource-stats">
                  <div className="stat">
                    <span className="stat-number">1,247</span>
                    <span className="stat-label">Publications</span>
                  </div>
                  <div className="stat">
                    <span className="stat-number">89</span>
                    <span className="stat-label">Datasets</span>
                  </div>
                  <div className="stat">
                    <span className="stat-number">456</span>
                    <span className="stat-label">Experiments</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Tab Navigation */}
            <div className="tab-navigation fade-in-up">
              <div className="tabs">
                {tabs.map(tab => (
                  <button
                    key={tab.id}
                    className={`tab ${activeTab === tab.id ? 'active' : ''}`}
                    onClick={() => setActiveTab(tab.id)}
                    aria-selected={activeTab === tab.id}
                  >
                    <span className="tab-icon">{tab.icon}</span>
                    <span className="tab-label">{tab.label}</span>
                  </button>
                ))}
              </div>
            </div>

            {/* Tab Content */}
            <div className={`tab-content ${tabAnimation ? 'tab-fade-in' : ''}`}>
              {activeTab === 'details' && (
                <div className="content-panel">
                  <h3>Research Details</h3>
                  <p>
                    Comprehensive information about space biology research methodologies, 
                    experimental designs, and scientific findings.
                  </p>
                  <div className="detail-grid">
                    <div className="detail-item">
                      <h4>Microgravity Research</h4>
                      <p>Studies on how reduced gravity affects biological systems</p>
                    </div>
                    <div className="detail-item">
                      <h4>Radiation Biology</h4>
                      <p>Research on radiation effects on living organisms</p>
                    </div>
                    <div className="detail-item">
                      <h4>Plant Biology</h4>
                      <p>Agricultural research for space missions</p>
                    </div>
                    <div className="detail-item">
                      <h4>Cellular Studies</h4>
                      <p>Molecular and cellular response to space environments</p>
                    </div>
                  </div>
                </div>
              )}
              
              {activeTab === 'resources' && (
                <div className="content-panel">
                  <h3>Available Resources</h3>
                  <p>
                    Access our extensive library of research materials, datasets, 
                    and scientific publications.
                  </p>
                  <div className="resource-grid">
                    <div className="resource-card">
                      <div className="resource-icon">📄</div>
                      <h4>Research Papers</h4>
                      <p>Peer-reviewed scientific publications</p>
                      <span className="resource-count">1,247 papers</span>
                    </div>
                    <div className="resource-card">
                      <div className="resource-icon">📊</div>
                      <h4>Datasets</h4>
                      <p>Raw and processed experimental data</p>
                      <span className="resource-count">89 datasets</span>
                    </div>
                    <div className="resource-card">
                      <div className="resource-icon">
                        <div className="icon-text">Vid</div>
                      </div>
                      <h4>Video Library</h4>
                      <p>Educational and experimental videos</p>
                      <span className="resource-count">234 videos</span>
                    </div>
                    <div className="resource-card">
                      <div className="resource-icon">
                        <div className="icon-text">Lab</div>
                      </div>
                      <h4>Protocols</h4>
                      <p>Experimental procedures and methods</p>
                      <span className="resource-count">156 protocols</span>
                    </div>
                  </div>
                </div>
              )}
              
              {activeTab === 'teams' && (
                <div className="content-panel">
                  <h3>Research Teams</h3>
                  <p>
                    Meet the dedicated teams working on space biology research 
                    across various NASA centers and partner institutions.
                  </p>
                  <div className="team-grid">
                    <div className="team-card">
                      <div className="team-avatar">
                        <div className="avatar-text">AS</div>
                      </div>
                      <h4>Astrobiology Team</h4>
                      <p>Studying life in extreme environments and the search for extraterrestrial life</p>
                      <div className="team-members">15 researchers</div>
                    </div>
                    <div className="team-card">
                      <div className="team-avatar">
                        <div className="avatar-text">PB</div>
                      </div>
                      <h4>Plant Biology Team</h4>
                      <p>Developing sustainable agriculture for long-duration space missions</p>
                      <div className="team-members">12 researchers</div>
                    </div>
                    <div className="team-card">
                      <div className="team-avatar">👨‍💻</div>
                      <h4>Data Science Team</h4>
                      <p>Creating knowledge graphs and analyzing complex biological datasets</p>
                      <div className="team-members">8 researchers</div>
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* Call to Action */}
            <div className="cta-section fade-in-up">
              <div className="cta-card">
                <h3>About NASA Space Biology Knowledge Graph</h3>
                <p>
                  Learn more about our comprehensive knowledge graph that connects 
                  research findings, datasets, and scientific discoveries.
                </p>
                <button className="btn btn-primary glow">Learn More</button>
              </div>
            </div>
          </div>

          {/* Right Sidebar */}
          <aside className="resources-sidebar fade-in-right">
            <div className="sidebar-card">
              <h4>Quick Access</h4>
              <div className="quick-links">
                <a href="#" className="quick-link">
                  <span className="link-icon">🔍</span>
                  <span>Search Resources</span>
                </a>
                <a href="#" className="quick-link">
                  <span className="link-icon">📚</span>
                  <span>Browse Publications</span>
                </a>
                <a href="#" className="quick-link">
                  <span className="link-icon">💾</span>
                  <span>Download Data</span>
                </a>
                <a href="#" className="quick-link">
                  <span className="link-icon">🤝</span>
                  <span>Collaborate</span>
                </a>
              </div>
            </div>

            <div className="sidebar-card">
              <h4>Featured Resources</h4>
              <div className="featured-list">
                <div className="featured-item">
                  <h5>Space Radiation Effects</h5>
                  <p>Latest research on radiation biology</p>
                </div>
                <div className="featured-item">
                  <h5>Plant Growth Systems</h5>
                  <p>Advanced agricultural protocols</p>
                </div>
                <div className="featured-item">
                  <h5>Microgravity Studies</h5>
                  <p>Comprehensive analysis reports</p>
                </div>
              </div>
            </div>
          </aside>
        </div>
      </div>
    </div>
  );
};

export default ResourcesPage;