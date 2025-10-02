import React, { useState } from 'react';
import './KnowledgeGraph.css';

const KnowledgeGraph = () => {
  const [activeTab, setActiveTab] = useState('details');

  const tabs = [
    { id: 'details', label: 'Details' },
    { id: 'resources', label: 'Resources' },
    { id: 'teams', label: 'Teams' }
  ];

  return (
    <section className="knowledge-graph">
      <div className="container">
        <div className="kg-content">
          {/* Left side - Profile and content */}
          <div className="kg-left">
            <div className="profile-section">
              <div className="profile-picture">
                <img 
                  src="https://images.unsplash.com/photo-1581833971358-2c8b550f87b3?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=300&q=80" 
                  alt="Profile"
                />
              </div>
            </div>
            
            {/* Tab navigation */}
            <div className="tab-navigation">
              <div className="tabs">
                {tabs.map(tab => (
                  <button
                    key={tab.id}
                    className={`tab ${activeTab === tab.id ? 'active' : ''}`}
                    onClick={() => setActiveTab(tab.id)}
                  >
                    {tab.label}
                  </button>
                ))}
              </div>
            </div>
            
            {/* Tab content */}
            <div className="tab-content">
              {activeTab === 'details' && (
                <div className="content-panel">
                  <h3>Research Details</h3>
                  <p>
                    Explore detailed information about ongoing space biology research, 
                    methodologies, and findings from various NASA missions.
                  </p>
                  <ul>
                    <li>Microgravity effects on biological systems</li>
                    <li>Radiation impact studies</li>
                    <li>Plant growth in space environments</li>
                    <li>Cellular behavior analysis</li>
                  </ul>
                </div>
              )}
              
              {activeTab === 'resources' && (
                <div className="content-panel">
                  <h3>Available Resources</h3>
                  <p>
                    Access publications, datasets, and research papers related to 
                    space biology and astrobiology research.
                  </p>
                  <div className="resource-links">
                    <a href="#" className="resource-link">Research Papers</a>
                    <a href="#" className="resource-link">Data Sets</a>
                    <a href="#" className="resource-link">Video Library</a>
                    <a href="#" className="resource-link">Interactive Tools</a>
                  </div>
                </div>
              )}
              
              {activeTab === 'teams' && (
                <div className="content-panel">
                  <h3>Research Teams</h3>
                  <p>
                    Meet the dedicated teams of scientists and researchers working 
                    on space biology projects across various NASA centers.
                  </p>
                  <div className="team-grid">
                    <div className="team-member">
                      <h4>Astrobiology Team</h4>
                      <p>Studying life in extreme environments</p>
                    </div>
                    <div className="team-member">
                      <h4>Plant Biology Team</h4>
                      <p>Space agriculture research</p>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
          
          {/* Right side - Knowledge Graph visualization */}
          <div className="kg-right fade-in-right">
            <div className="graph-container">
              <h3>Knowledge Graph</h3>
              <div className="graph-visualization">
                {/* Simulated knowledge graph */}
                <div className="graph-nodes">
                  <div className="node primary">
                    <span>Space Biology</span>
                  </div>
                  <div className="node secondary">
                    <span>Microgravity</span>
                  </div>
                  <div className="node secondary">
                    <span>Radiation</span>
                  </div>
                  <div className="node tertiary">
                    <span>DNA</span>
                  </div>
                  <div className="node tertiary">
                    <span>Proteins</span>
                  </div>
                  <div className="node tertiary">
                    <span>Cells</span>
                  </div>
                </div>
                
                {/* Connection lines */}
                <svg className="graph-connections" viewBox="0 0 400 300">
                  <line x1="200" y1="150" x2="100" y2="100" stroke="var(--color-bright-yellow-green)" strokeWidth="2" opacity="0.6"/>
                  <line x1="200" y1="150" x2="300" y2="100" stroke="var(--color-bright-yellow-green)" strokeWidth="2" opacity="0.6"/>
                  <line x1="100" y1="100" x2="50" y2="200" stroke="var(--color-teal-blue)" strokeWidth="1.5" opacity="0.4"/>
                  <line x1="100" y1="100" x2="150" y2="200" stroke="var(--color-teal-blue)" strokeWidth="1.5" opacity="0.4"/>
                  <line x1="300" y1="100" x2="250" y2="200" stroke="var(--color-teal-blue)" strokeWidth="1.5" opacity="0.4"/>
                  <line x1="300" y1="100" x2="350" y2="200" stroke="var(--color-teal-blue)" strokeWidth="1.5" opacity="0.4"/>
                </svg>
              </div>
              
              <div className="graph-controls">
                <button className="btn btn-secondary refresh-btn">
                  Refresh
                </button>
                <button className="btn btn-secondary filter-btn">
                  Filter
                </button>
              </div>
            </div>
            
            {/* Search results section */}
            <div className="search-results">
              <h4>Recent Search Results</h4>
              <div className="result-item">
                <h5>Microgravity Effects on Plant Growth</h5>
                <p>Recent findings on how reduced gravity affects cellular development...</p>
              </div>
              <div className="result-item">
                <h5>Radiation Shielding in Space</h5>
                <p>Advanced materials research for protecting biological systems...</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default KnowledgeGraph;