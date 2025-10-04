import React from 'react';
import './AboutUs.css';

const AboutUs = ({ setCurrentPage }) => {
  return (
    <div className="about-us">
      <div className="container">
        {/* Hero Section */}
        <section className="about-hero">
          <div className="about-hero-content">
            <h1>About NASA Space Biology Research</h1>
            <p className="hero-subtitle">
              Advancing human space exploration through decades of scientific research and AI-powered insights
            </p>
          </div>
          <div className="about-hero-image">
            <img 
              src="https://images.unsplash.com/photo-1516849841032-87cbac4d88f7?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80" 
              alt="NASA space research laboratory"
            />
          </div>
        </section>

        {/* Mission Section */}
        <section className="mission-section">
          <div className="section-content">
            <h2>Our Mission</h2>
            <div className="mission-grid">
              <div className="mission-item">
        
                <h3>Space Exploration</h3>
                <p>
                  Enable safe and efficient human exploration of the Moon, Mars, and beyond through 
                  comprehensive biological research and scientific understanding.
                </p>
              </div>
              <div className="mission-item">
           
                <h3>Scientific Research</h3>
                <p>
                  Conduct cutting-edge space biology experiments to understand how living organisms 
                  adapt and respond to the unique environment of space.
                </p>
              </div>
              <div className="mission-item">
                
                <h3>AI Innovation</h3>
                <p>
                  Leverage artificial intelligence and knowledge graphs to organize, analyze, and 
                  extract actionable insights from decades of research data.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Research Overview */}
        <section className="research-overview">
          <div className="section-content">
            <h2>Research Overview</h2>
            <div className="overview-content">
              <div className="overview-text">
                <p>
                  For decades, NASA has been conducting groundbreaking biology experiments in space, 
                  generating tremendous knowledge that directly informs future human exploration missions 
                  to the Moon and Mars. Our research spans multiple domains including:
                </p>
                <ul className="research-list">
                  <li>Microgravity effects on cellular processes</li>
                  <li>Plant growth and development in space environments</li>
                  <li>Human physiological adaptations to spaceflight</li>
                  <li>Radiation biology and protective countermeasures</li>
                  <li>Biomedical research for long-duration missions</li>
                  <li>Environmental life support systems</li>
                </ul>
              </div>
              <div className="overview-stats">
                <div className="stat-item">
                  <div className="stat-number">608</div>
                  <div className="stat-label">Research Publications</div>
                </div>
                <div className="stat-item">
                  <div className="stat-number">50+</div>
                  <div className="stat-label">Years of Research</div>
                </div>
                <div className="stat-item">
                  <div className="stat-number">1000+</div>
                  <div className="stat-label">Experiments Conducted</div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Technology Section */}
        <section className="technology-section">
          <div className="section-content">
            <h2>Advanced Technology Platform</h2>
            <div className="tech-grid">
              <div className="tech-card">
                <h3>Knowledge Graphs</h3>
                <p>
                  Our AI-powered dashboard utilizes sophisticated knowledge graphs to map 
                  relationships between research findings, enabling comprehensive analysis 
                  and discovery of hidden patterns.
                </p>
              </div>
              <div className="tech-card">
                <h3>Machine Learning</h3>
                <p>
                  Advanced ML algorithms process and analyze vast amounts of scientific data, 
                  providing researchers with intelligent insights and predictive capabilities.
                </p>
              </div>
              <div className="tech-card">
                <h3>Data Integration</h3>
                <p>
                  Seamless integration of multiple data sources creates a unified platform 
                  for exploring experimental impacts, results, and research correlations.
                </p>
              </div>
            </div>
          </div>
        </section>

        

        {/* CTA Section */}
        <section className="cta-section">
          <div className="cta-content">
            <h2>Join Our Research Community</h2>
            <p>
              Explore our research dashboard and contribute to the future of human space exploration
            </p>
            <div className="cta-buttons">
              <button 
                className="btn btn-primary"
                onClick={() => setCurrentPage('search')}
              >
                Explore Research Dashboard
              </button>
              <button 
                className="btn btn-secondary"
                onClick={() => setCurrentPage('resources')}
              >
                Browse Resources
              </button>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
};

export default AboutUs;