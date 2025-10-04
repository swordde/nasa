import React, { useState, useEffect, useCallback, useRef } from 'react';
import './DetailModal.css';

// Import libraries for PDF export
import { jsPDF } from 'jspdf';
import html2canvas from 'html2canvas';

const DetailModal = ({ result, isOpen, onClose }) => {
  const [activeTab, setActiveTab] = useState('summary');
  const [knowledgeGraphData, setKnowledgeGraphData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [extendedData, setExtendedData] = useState(null);
  const [relatedStudies, setRelatedStudies] = useState([]);
  const [actionLoading, setActionLoading] = useState({
    export: false,
    share: false,
    download: false,
    citation: false
  });

  // Load data when modal opens
  useEffect(() => {
    if (isOpen && result) {
      // Load knowledge graph data
      setLoading(true);
      
      // Simulate loading data
      setTimeout(() => {
        setKnowledgeGraphData({
          entities: [
            { id: 1, name: 'Microgravity', type: 'Condition', connections: 15, score: 0.95 },
            { id: 2, name: 'Gene Expression', type: 'Process', connections: 23, score: 0.92 },
            { id: 3, name: 'Arabidopsis', type: 'Organism', connections: 18, score: 0.88 },
            { id: 4, name: 'Cell Wall', type: 'Structure', connections: 12, score: 0.79 },
            { id: 5, name: 'Space Flight', type: 'Environment', connections: 31, score: 0.98 },
            { id: 6, name: 'Protein Synthesis', type: 'Process', connections: 19, score: 0.82 },
            { id: 7, name: 'Cytoskeleton', type: 'Structure', connections: 14, score: 0.75 },
            { id: 8, name: 'NASA', type: 'Organization', connections: 27, score: 0.94 }
          ],
          relationships: [
            { from: 1, to: 2, type: 'affects', strength: 0.8, papers: 24 },
            { from: 2, to: 3, type: 'occurs_in', strength: 0.9, papers: 31 },
            { from: 1, to: 4, type: 'modifies', strength: 0.7, papers: 19 },
            { from: 5, to: 1, type: 'creates', strength: 0.95, papers: 42 },
            { from: 2, to: 6, type: 'regulates', strength: 0.65, papers: 17 },
            { from: 4, to: 7, type: 'interacts_with', strength: 0.72, papers: 15 },
            { from: 8, to: 5, type: 'conducts', strength: 0.98, papers: 76 }
          ],
          relatedConcepts: [
            'Gravitational Biology',
            'Space Adaptation',
            'Molecular Biology',
            'Plant Physiology',
            'Stress Response',
            'Systems Biology',
            'Genomic Regulation',
            'Space Medicine'
          ]
        });
        
        // Extended data including methods, visualizations, and citations
        setExtendedData({
          methods: {
            techniques: ['RNA-Seq', 'Proteomics', 'Microscopy', 'Flow Cytometry'],
            controls: ['Ground Control', '1g Centrifuge Control'],
            replicates: 6,
            analysis: ['DESeq2', 'Gene Ontology Analysis', 'Pathway Enrichment']
          },
          visualizations: [
            { type: 'Volcano Plot', description: 'Shows differentially expressed genes', url: '#' },
            { type: 'Heatmap', description: 'Gene expression patterns across conditions', url: '#' },
            { type: 'PCA', description: 'Principal Component Analysis of samples', url: '#' }
          ],
          citations: [
            { count: 47, year: 2024 },
            { count: 82, year: 2023 },
            { count: 36, year: 2022 },
            { count: 28, year: 2021 }
          ],
          funding: {
            agency: 'NASA',
            grantNumbers: ['NNX15AB45C', 'NNH18ZTT003N'],
            amount: '$1.2M',
            period: '2020-2025'
          }
        });
        
        // Related studies
        setRelatedStudies([
          {
            id: 'rel-1',
            title: 'Effects of Microgravity on Plant Cell Walls',
            authors: 'Johnson K, Smith A, Williams P',
            year: 2023,
            relevance: 92,
            journal: 'Frontiers in Space Biology'
          },
          {
            id: 'rel-2',
            title: 'Genomic Response to Space Radiation in Arabidopsis',
            authors: 'Chen L, Rodriguez M, Patel R',
            year: 2022,
            relevance: 87,
            journal: 'npj Microgravity'
          },
          {
            id: 'rel-3',
            title: 'Comparative Proteomics of Plants in Space Flight',
            authors: 'Martinez S, Huang T, Lee D',
            year: 2024,
            relevance: 95,
            journal: 'Astrobiology'
          }
        ]);
        
        setLoading(false);
      }, 800);
    } else {
      // Reset data when modal is closed
      setExtendedData(null);
      setRelatedStudies([]);
    }
  }, [isOpen, result]);

  // Button handler functions
  const handleExportCitation = useCallback(() => {
    setActionLoading(prev => ({ ...prev, citation: true }));
    
    // Simulate citation export
    setTimeout(() => {
      const citation = `${result.authors} (${result.date}). ${result.title}. ${result.journal || 'NASA Space Biology Database'}. https://doi.org/${result.doi || '10.xxxx/xxxxx'}`;
      
      // Create a temporary textarea element to copy text to clipboard
      const textarea = document.createElement('textarea');
      textarea.value = citation;
      document.body.appendChild(textarea);
      textarea.select();
      document.execCommand('copy');
      document.body.removeChild(textarea);
      
      alert('Citation copied to clipboard!');
      setActionLoading(prev => ({ ...prev, citation: false }));
    }, 500);
  }, [result]);
  
  const handleShareSummary = useCallback(() => {
    setActionLoading(prev => ({ ...prev, share: true }));
    
    // For demo purposes, simulate sharing
    setTimeout(() => {
      if (navigator.share) {
        navigator.share({
          title: result.title,
          text: `Check out this research: ${result.title}`,
          url: `https://spacekgraph.nasa.gov/research/${result.id}`,
        });
      } else {
        // Fallback for browsers that don't support navigator.share
        const shareUrl = `https://spacekgraph.nasa.gov/research/${result.id}`;
        const textarea = document.createElement('textarea');
        textarea.value = shareUrl;
        document.body.appendChild(textarea);
        textarea.select();
        document.execCommand('copy');
        document.body.removeChild(textarea);
        alert('Link copied to clipboard!');
      }
      setActionLoading(prev => ({ ...prev, share: false }));
    }, 500);
  }, [result]);
  
  const handleDownloadData = useCallback((dataType) => {
    setActionLoading(prev => ({ ...prev, download: true }));
    
    // For demo purposes, simulate download
    setTimeout(() => {
      alert(`${dataType} download started!`);
      setActionLoading(prev => ({ ...prev, download: false }));
    }, 700);
  }, []);
  
  const handleAccessOSDR = useCallback(() => {
    // Mock opening an external resource
    alert('Opening resource in OSDR');
  }, []);
  
  const handleViewRelatedStudy = useCallback((studyId) => {
    // In a real implementation, would open the related study
    // For now just alert with the study ID
    alert(`Opening related study ${studyId}`);
  }, []);
  
  const contentRef = useRef(null);
  
  const handleExportToPDF = useCallback(() => {
    setActionLoading(prev => ({ ...prev, export: true }));
    
    if (contentRef.current) {
      // Get the content to export
      const contentElement = contentRef.current;
      
      // Use html2canvas to capture the content as an image
      html2canvas(contentElement, {
        scale: 2, // Higher scale for better quality
        useCORS: true, // Enable CORS for external images
        logging: false, // Disable logging
        backgroundColor: '#121212' // Match the dark theme background
      }).then(canvas => {
        // Create a new PDF document in A4 format
        const pdf = new jsPDF({
          orientation: 'portrait',
          unit: 'mm',
          format: 'a4',
        });
        
        // Calculate dimensions
        const imgWidth = 210; // A4 width in mm
        const pageHeight = 297; // A4 height in mm
        const imgHeight = (canvas.height * imgWidth) / canvas.width;
        
        // Add image to PDF
        const imgData = canvas.toDataURL('image/jpeg', 1.0);
        pdf.addImage(imgData, 'JPEG', 0, 0, imgWidth, imgHeight);
        
        // Check if additional pages are needed for long content
        let heightLeft = imgHeight - pageHeight;
        let position = -pageHeight; // Start position for next page
        
        // Add new pages if content is longer than one page
        while (heightLeft > 0) {
          pdf.addPage();
          pdf.addImage(imgData, 'JPEG', 0, position, imgWidth, imgHeight);
          heightLeft -= pageHeight;
          position -= pageHeight;
        }
        
        // Save the PDF with a dynamic name based on the research title
        pdf.save(`${result.title ? result.title.substring(0, 50) : 'research-details'}.pdf`);
        
        // Update loading state
        setActionLoading(prev => ({ ...prev, export: false }));
      }).catch(err => {
        console.error('Error generating PDF:', err);
        alert('Failed to export PDF. Please try again.');
        setActionLoading(prev => ({ ...prev, export: false }));
      });
    } else {
      alert('Unable to generate PDF at this time. Please try again.');
      setActionLoading(prev => ({ ...prev, export: false }));
    }
  }, [result]);

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

  const renderSummaryTab = () => (
    <div className="tab-content summary-content">
      <div className="summary-header">
        <h3>Executive Summary</h3>
        <div className="summary-meta">
          <span className="summary-indicator high-relevance">High Relevance</span>
          <span className="summary-date">Last Updated: {new Date().toLocaleDateString()}</span>
        </div>
      </div>

      <div className="summary-section key-findings">
        <h4>Key Findings</h4>
        <ul className="findings-list">
          <li>Exposure to microgravity conditions results in significant changes to gene expression patterns in {result.organism || 'organisms'}</li>
          <li>Cell wall formation and structural proteins showed altered regulation after space flight</li>
          <li>Stress response pathways were consistently upregulated across multiple experiments</li>
          <li>Evidence suggests adaptation mechanisms develop within 48-72 hours of exposure</li>
          <li>Molecular signaling cascades show distinctive patterns that differ from terrestrial stress responses</li>
          <li>Photosynthetic efficiency decreased by 18% in spaceflight conditions compared to ground controls</li>
        </ul>
      </div>

      <div className="summary-section impact-assessment">
        <h4>Impact on Human Exploration</h4>
        <div className="impact-grid">
          <div className="impact-card">
            <div className="impact-level high">High</div>
            <div className="impact-area">Astronaut Health</div>
            <p>Findings directly relate to cellular stress responses observed in human tissue samples</p>
            <div className="impact-details">
              <span className="impact-metric">18 related studies</span>
              <span className="impact-metric">3 countermeasures</span>
            </div>
          </div>
          <div className="impact-card">
            <div className="impact-level medium">Medium</div>
            <div className="impact-area">Life Support Systems</div>
            <p>Results inform development of bioregenerative life support components</p>
            <div className="impact-details">
              <span className="impact-metric">12 related studies</span>
              <span className="impact-metric">1 prototype</span>
            </div>
          </div>
          <div className="impact-card">
            <div className="impact-level high">High</div>
            <div className="impact-area">Mission Planning</div>
            <p>Data supports countermeasure development for long-duration missions</p>
            <div className="impact-details">
              <span className="impact-metric">21 related studies</span>
              <span className="impact-metric">4 implementations</span>
            </div>
          </div>
        </div>
      </div>

      <div className="summary-section citation-impact">
        <h4>Citation Impact</h4>
        <div className="citation-chart">
          {extendedData?.citations ? (
            <>
              <div className="citation-bars">
                {extendedData.citations.map(citation => (
                  <div key={citation.year} className="citation-bar-container">
                    <div 
                      className="citation-bar" 
                      style={{height: `${(citation.count / Math.max(...extendedData.citations.map(c => c.count))) * 100}%`}}
                    >
                      <span className="citation-count">{citation.count}</span>
                    </div>
                    <span className="citation-year">{citation.year}</span>
                  </div>
                ))}
              </div>
              <div className="citation-total">
                <span className="total-label">Total Citations</span>
                <span className="total-count">{extendedData.citations.reduce((sum, item) => sum + item.count, 0)}</span>
              </div>
            </>
          ) : (
            <div className="loading-placeholder">Loading citation data...</div>
          )}
        </div>
      </div>

      <div className="summary-section ai-generated">
        <h4>AI-Generated Insights</h4>
        <div className="insights-container">
          <p className="insight-text">
            This research bridges critical knowledge gaps in our understanding of {result.organism || 'biological'} responses to spaceflight. 
            The {result.method || 'experimental'} approach provides statistically significant evidence for adaptation mechanisms that could 
            inform future countermeasure development. When combined with previous studies on related organisms, a pattern emerges suggesting 
            conserved cellular responses to microgravity that may apply across species including humans.
          </p>
          <p className="insight-text">
            The methodological approach demonstrates a rigorous experimental design with appropriate controls and replication. 
            Results align with theoretical predictions from molecular biology, lending further credibility to the findings.
          </p>
          <div className="consensus-meter">
            <div className="consensus-label">Scientific Consensus</div>
            <div className="consensus-bar">
              <div className="consensus-fill" style={{width: '75%'}}></div>
            </div>
            <div className="consensus-percentage">75%</div>
          </div>
        </div>
      </div>

      <div className="summary-section related-studies">
        <h4>Related Studies</h4>
        <div className="related-studies-list">
          {relatedStudies.map(study => (
            <div key={study.id} className="related-study" onClick={() => handleViewRelatedStudy(study.id)}>
              <div className="relevance-indicator" style={{opacity: study.relevance / 100}}></div>
              <div className="study-details">
                <h5 className="study-title">{study.title}</h5>
                <div className="study-meta">
                  <span className="study-authors">{study.authors}</span>
                  <span className="study-journal">{study.journal}</span>
                  <span className="study-year">{study.year}</span>
                </div>
              </div>
              <div className="relevance-score">Relevance: {study.relevance}%</div>
            </div>
          ))}
        </div>
      </div>

      <div className="summary-actions">
        <button className="btn btn-primary" onClick={handleShareSummary} disabled={actionLoading.share}>
          {actionLoading.share ? 'Sharing...' : 'Share Summary'}
        </button>
        <button className="btn btn-secondary" onClick={handleExportToPDF} disabled={actionLoading.export}>
          {actionLoading.export ? 'Exporting...' : 'Export to PDF'}
        </button>
      </div>
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
          <div className="data-item">
            <label>Last Updated:</label>
            <span>{new Date().toLocaleDateString()}</span>
          </div>
          <div className="data-item">
            <label>Storage Location:</label>
            <span>NASA OSDR, GeneLab</span>
          </div>
        </div>
      </div>

      <div className="data-section">
        <h3>Experimental Methods</h3>
        {extendedData?.methods ? (
          <div className="methods-container">
            <div className="methods-grid">
              <div className="method-group">
                <h4>Techniques</h4>
                <ul className="technique-list">
                  {extendedData.methods.techniques.map((technique, index) => (
                    <li key={index} className="technique-item">{technique}</li>
                  ))}
                </ul>
              </div>
              <div className="method-group">
                <h4>Controls</h4>
                <ul className="controls-list">
                  {extendedData.methods.controls.map((control, index) => (
                    <li key={index} className="control-item">{control}</li>
                  ))}
                </ul>
              </div>
              <div className="method-group">
                <h4>Analysis Tools</h4>
                <ul className="analysis-list">
                  {extendedData.methods.analysis.map((tool, index) => (
                    <li key={index} className="analysis-item">{tool}</li>
                  ))}
                </ul>
              </div>
            </div>
            <div className="methods-info">
              <div className="method-detail">
                <span className="detail-label">Biological Replicates:</span>
                <span className="detail-value">{extendedData.methods.replicates}</span>
              </div>
              <div className="method-detail">
                <span className="detail-label">Technical Replicates:</span>
                <span className="detail-value">3 per biological sample</span>
              </div>
              <div className="method-detail">
                <span className="detail-label">Statistical Power:</span>
                <span className="detail-value">0.92 (α=0.05)</span>
              </div>
            </div>
          </div>
        ) : (
          <div className="loading-placeholder">Loading method details...</div>
        )}
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
          <div className="condition-item">
            <strong>Platform:</strong> International Space Station (ISS)
          </div>
          <div className="condition-item">
            <strong>Mission:</strong> SpaceX CRS-24
          </div>
          <div className="condition-item">
            <strong>Hardware:</strong> Vegetable Production System (Veggie)
          </div>
        </div>
      </div>

      <div className="data-section">
        <h3>Data Visualizations</h3>
        {extendedData?.visualizations ? (
          <div className="viz-grid">
            {extendedData.visualizations.map((viz, index) => (
              <div key={index} className="viz-card">
                <div className="viz-placeholder">
                  <div className="viz-icon">{viz.type === 'Volcano Plot' ? '🌋' : viz.type === 'Heatmap' ? '🔥' : '📊'}</div>
                </div>
                <div className="viz-info">
                  <h4 className="viz-type">{viz.type}</h4>
                  <p className="viz-description">{viz.description}</p>
                  <button className="viz-action">View Full Size</button>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="loading-placeholder">Loading visualizations...</div>
        )}
      </div>

      <div className="data-section">
        <h3>Download Options</h3>
        <div className="download-buttons">
          <button className="btn btn-primary" onClick={() => handleDownloadData('Raw Data')} disabled={actionLoading.download}>
            {actionLoading.download ? 'Preparing...' : 'Download Raw Data'}
          </button>
          <button className="btn btn-secondary" onClick={() => handleDownloadData('Processed Data')}>
            Download Processed Data
          </button>
          <button className="btn btn-secondary" onClick={() => handleDownloadData('Metadata')}>
            Download Metadata
          </button>
          <button className="btn btn-secondary" onClick={() => handleDownloadData('Analysis Scripts')}>
            Download Analysis Scripts
          </button>
        </div>
        <div className="download-info">
          <span className="info-icon">ℹ️</span>
          <span className="info-text">
            Raw data files are approximately 2.3GB. Processed data includes normalized counts and analysis results (120MB).
            For persistent storage access, please use the <a href="#">NASA GeneLab Repository</a>.
          </span>
        </div>
      </div>
    </div>
  );

  return (
    <div 
      className="modal-backdrop" 
      onClick={handleBackdropClick}
      role="dialog"
      aria-modal="true"
      aria-labelledby="modal-title"
    >
      <div 
        className="detail-modal"
        role="document"
      >
        <header className="modal-header">
          <h2 className="modal-title" id="modal-title">
            Research Details
            {result.type && <span className="modal-subtitle"> - {result.type}</span>}
          </h2>
          <button 
            className="close-btn" 
            onClick={onClose}
            aria-label="Close modal"
          >
            <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
              <path d="M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z"/>
            </svg>
          </button>
        </header>

        <nav className="modal-tabs" aria-label="Research details tabs">
          <button 
            className={`tab-btn ${activeTab === 'summary' ? 'active' : ''}`}
            onClick={() => setActiveTab('summary')}
            aria-selected={activeTab === 'summary'}
            aria-controls="tab-summary"
            role="tab"
          >
            Summary
          </button>
          <button 
            className={`tab-btn ${activeTab === 'overview' ? 'active' : ''}`}
            onClick={() => setActiveTab('overview')}
            aria-selected={activeTab === 'overview'}
            aria-controls="tab-overview"
            role="tab"
          >
            Overview
          </button>
          <button 
            className={`tab-btn ${activeTab === 'knowledge-graph' ? 'active' : ''}`}
            onClick={() => setActiveTab('knowledge-graph')}
            aria-selected={activeTab === 'knowledge-graph'}
            aria-controls="tab-knowledge-graph"
            role="tab"
          >
            Knowledge Graph
          </button>
          <button 
            className={`tab-btn ${activeTab === 'data' ? 'active' : ''}`}
            onClick={() => setActiveTab('data')}
            aria-selected={activeTab === 'data'}
            aria-controls="tab-data"
            role="tab"
          >
            Data & Methods
          </button>
        </nav>

        <div className="modal-content">
          <div 
            id="tab-summary" 
            role="tabpanel" 
            aria-labelledby="tab-btn-summary"
            className={activeTab === 'summary' ? 'active-panel' : 'hidden-panel'}
          >
            {activeTab === 'summary' && renderSummaryTab()}
          </div>
          
          <div 
            id="tab-overview" 
            role="tabpanel" 
            aria-labelledby="tab-btn-overview"
            className={activeTab === 'overview' ? 'active-panel' : 'hidden-panel'}
          >
            {activeTab === 'overview' && renderOverviewTab()}
          </div>
          
          <div 
            id="tab-knowledge-graph" 
            role="tabpanel" 
            aria-labelledby="tab-btn-knowledge-graph"
            className={activeTab === 'knowledge-graph' ? 'active-panel' : 'hidden-panel'}
          >
            {activeTab === 'knowledge-graph' && renderKnowledgeGraphTab()}
          </div>
          
          <div 
            id="tab-data" 
            role="tabpanel" 
            aria-labelledby="tab-btn-data"
            className={activeTab === 'data' ? 'active-panel' : 'hidden-panel'}
          >
            {activeTab === 'data' && renderDataTab()}
          </div>
        </div>

        <footer className="modal-footer">
          <div className="action-buttons">
            <button className="btn btn-primary" onClick={handleAccessOSDR}>
              <span className="btn-icon">🔗</span>
              Access Resource
            </button>
            <button 
              className="btn btn-secondary" 
              onClick={() => setActiveTab('summary')}
              aria-label="View related studies"
            >
              <span className="btn-icon">📚</span>
              View Related Studies
            </button>
            <button 
              className="btn btn-secondary" 
              onClick={handleExportCitation}
              disabled={actionLoading.citation}
              aria-label="Export citation"
            >
              <span className="btn-icon">📝</span>
              {actionLoading.citation ? 'Exporting...' : 'Export Citation'}
            </button>
          </div>
          <div className="modal-footer-info">
            <span className="footer-id">ID: {result.id || 'NASA-SB-2024-00192'}</span>
            <span className="footer-updated">Last Updated: {result.updatedAt || new Date().toLocaleDateString()}</span>
          </div>
        </footer>
      </div>
    </div>
  );
};

export default DetailModal;