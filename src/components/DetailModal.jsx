import React, { useState, useEffect } from 'react';
import './DetailModal.css';

const DetailModal = ({ result, isOpen, onClose }) => {
  const [activeTab, setActiveTab] = useState('overview');
  const [knowledgeGraphData, setKnowledgeGraphData] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (isOpen && result) {
      // Simulate loading knowledge graph data
      setLoading(true);
      setTimeout(() => {
        setKnowledgeGraphData({
          entities: [
            { id: 1, name: 'Microgravity', type: 'Condition', connections: 15 },
            { id: 2, name: 'Gene Expression', type: 'Process', connections: 23 },
            { id: 3, name: 'Arabidopsis', type: 'Organism', connections: 18 },
            { id: 4, name: 'Cell Wall', type: 'Structure', connections: 12 },
            { id: 5, name: 'Space Flight', type: 'Environment', connections: 31 }
          ],
          relationships: [
            { from: 1, to: 2, type: 'affects', strength: 0.8 },
            { from: 2, to: 3, type: 'occurs_in', strength: 0.9 },
            { from: 1, to: 4, type: 'modifies', strength: 0.7 },
            { from: 5, to: 1, type: 'creates', strength: 0.95 }
          ],
          relatedConcepts: [
            'Gravitational Biology',
            'Space Adaptation',
            'Molecular Biology',
            'Plant Physiology',
            'Stress Response'
          ]
        });
        setLoading(false);
      }, 1000);
    }
  }, [isOpen, result]);

  if (!isOpen || !result) return null;

  const handleBackdropClick = (e) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  const renderOverviewTab = () => (
    <div className="tab-content">
      <div className="detail-header">
        <h2>{result.title}</h2>
        <div className="detail-meta">
          <span className="detail-type">{result.type}</span>
          <span className="detail-date">{result.date}</span>
        </div>
      </div>

      <div className="detail-section">
        <h3>Authors</h3>
        <p>{result.authors}</p>
      </div>

      {result.journal && (
        <div className="detail-section">
          <h3>Publication</h3>
          <p>{result.journal}</p>
        </div>
      )}

      <div className="detail-section">
        <h3>Abstract</h3>
        <p>{result.abstract || result.description}</p>
      </div>

      {result.tags && (
        <div className="detail-section">
          <h3>Keywords</h3>
          <div className="tags-container">
            {result.tags.map(tag => (
              <span key={tag} className="detail-tag">{tag}</span>
            ))}
          </div>
        </div>
      )}

      <div className="detail-section">
        <h3>Identifiers</h3>
        <div className="identifiers">
          {result.osdrId && <div className="identifier">OSDR ID: {result.osdrId}</div>}
          {result.grantId && <div className="identifier">Grant ID: {result.grantId}</div>}
          {result.doi && <div className="identifier">DOI: {result.doi}</div>}
        </div>
      </div>
    </div>
  );

  const renderKnowledgeGraphTab = () => (
    <div className="tab-content">
      {loading ? (
        <div className="loading-container">
          <div className="loading-spinner"></div>
          <p>Loading knowledge graph data...</p>
        </div>
      ) : (
        <>
          <div className="knowledge-graph-section">
            <h3>Connected Entities</h3>
            <div className="entities-grid">
              {knowledgeGraphData?.entities.map(entity => (
                <div key={entity.id} className={`entity-card ${entity.type.toLowerCase()}`}>
                  <div className="entity-name">{entity.name}</div>
                  <div className="entity-type">{entity.type}</div>
                  <div className="entity-connections">{entity.connections} connections</div>
                </div>
              ))}
            </div>
          </div>

          <div className="knowledge-graph-section">
            <h3>Key Relationships</h3>
            <div className="relationships-list">
              {knowledgeGraphData?.relationships.map((rel, index) => {
                const fromEntity = knowledgeGraphData.entities.find(e => e.id === rel.from);
                const toEntity = knowledgeGraphData.entities.find(e => e.id === rel.to);
                return (
                  <div key={index} className="relationship-item">
                    <span className="entity-name">{fromEntity?.name}</span>
                    <span className="relationship-type">{rel.type}</span>
                    <span className="entity-name">{toEntity?.name}</span>
                    <div className="relationship-strength">
                      Strength: {(rel.strength * 100).toFixed(0)}%
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          <div className="knowledge-graph-section">
            <h3>Related Concepts</h3>
            <div className="concepts-cloud">
              {knowledgeGraphData?.relatedConcepts.map(concept => (
                <span key={concept} className="concept-tag">{concept}</span>
              ))}
            </div>
          </div>

          <div className="knowledge-graph-section">
            <h3>Graph Visualization</h3>
            <div className="graph-placeholder">
              <div className="graph-nodes">
                {knowledgeGraphData?.entities.slice(0, 5).map((entity, index) => (
                  <div 
                    key={entity.id} 
                    className={`graph-node ${entity.type.toLowerCase()}`}
                    style={{
                      left: `${20 + index * 15}%`,
                      top: `${30 + (index % 2) * 20}%`
                    }}
                  >
                    {entity.name}
                  </div>
                ))}
              </div>
              <svg className="graph-connections">
                <line x1="20%" y1="40%" x2="35%" y2="50%" stroke="#E6F400" strokeWidth="2"/>
                <line x1="35%" y1="50%" x2="50%" y2="30%" stroke="#E6F400" strokeWidth="2"/>
                <line x1="50%" y1="30%" x2="65%" y2="60%" stroke="#E6F400" strokeWidth="2"/>
                <line x1="65%" y1="60%" x2="80%" y2="40%" stroke="#E6F400" strokeWidth="2"/>
              </svg>
            </div>
          </div>
        </>
      )}
    </div>
  );

  const renderDataTab = () => (
    <div className="tab-content">
      <div className="data-section">
        <h3>Dataset Information</h3>
        <div className="data-grid">
          <div className="data-item">
            <label>Data Type:</label>
            <span>Transcriptomic, Proteomic</span>
          </div>
          <div className="data-item">
            <label>Sample Size:</label>
            <span>24 biological replicates</span>
          </div>
          <div className="data-item">
            <label>Platform:</label>
            <span>RNA-seq, Mass Spectrometry</span>
          </div>
          <div className="data-item">
            <label>File Format:</label>
            <span>FASTQ, RAW, CSV</span>
          </div>
          <div className="data-item">
            <label>Size:</label>
            <span>2.3 GB</span>
          </div>
          <div className="data-item">
            <label>Access Level:</label>
            <span>Public</span>
          </div>
        </div>
      </div>

      <div className="data-section">
        <h3>Experimental Conditions</h3>
        <div className="conditions-list">
          <div className="condition-item">
            <strong>Microgravity Exposure:</strong> 48 hours
          </div>
          <div className="condition-item">
            <strong>Temperature:</strong> 22°C ± 1°C
          </div>
          <div className="condition-item">
            <strong>Humidity:</strong> 70% ± 5%
          </div>
          <div className="condition-item">
            <strong>Light Cycle:</strong> 16h light / 8h dark
          </div>
        </div>
      </div>

      <div className="data-section">
        <h3>Download Options</h3>
        <div className="download-buttons">
          <button className="btn btn-primary">Download Raw Data</button>
          <button className="btn btn-secondary">Download Processed Data</button>
          <button className="btn btn-secondary">Download Metadata</button>
          <button className="btn btn-secondary">Download Analysis Scripts</button>
        </div>
      </div>
    </div>
  );

  return (
    <div className="modal-backdrop" onClick={handleBackdropClick}>
      <div className="detail-modal">
        <div className="modal-header">
          <div className="modal-title">Research Details</div>
          <button className="close-btn" onClick={onClose}>
            <svg viewBox="0 0 24 24" fill="currentColor">
              <path d="M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z"/>
            </svg>
          </button>
        </div>

        <div className="modal-tabs">
          <button 
            className={`tab-btn ${activeTab === 'overview' ? 'active' : ''}`}
            onClick={() => setActiveTab('overview')}
          >
            Overview
          </button>
          <button 
            className={`tab-btn ${activeTab === 'knowledge-graph' ? 'active' : ''}`}
            onClick={() => setActiveTab('knowledge-graph')}
          >
            Knowledge Graph
          </button>
          <button 
            className={`tab-btn ${activeTab === 'data' ? 'active' : ''}`}
            onClick={() => setActiveTab('data')}
          >
            Data & Methods
          </button>
        </div>

        <div className="modal-content">
          {activeTab === 'overview' && renderOverviewTab()}
          {activeTab === 'knowledge-graph' && renderKnowledgeGraphTab()}
          {activeTab === 'data' && renderDataTab()}
        </div>

        <div className="modal-footer">
          <div className="action-buttons">
            <button className="btn btn-primary">Access in OSDR</button>
            <button className="btn btn-secondary">View Related Studies</button>
            <button className="btn btn-secondary">Export Citation</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DetailModal;