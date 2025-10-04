import React from 'react';
import './Hero.css';

const Hero = ({ setCurrentPage }) => {
  const handleExploreClick = () => {
    setCurrentPage('search');
  };

  const handleLearnMoreClick = () => {
    setCurrentPage('resources');
  };

  return (
    <section className="hero">
      {/* Full width background image */}
      <div className="hero-background">
        <img 
          src="https://images.unsplash.com/photo-1446776653964-20c1d3a81b06?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1920&q=80" 
          alt="Space exploration and astronaut in space with Earth background"
        />
        <div className="hero-overlay"></div>
        
        {/* Image enhancement elements */}
        <div className="image-highlights">
          <div className="highlight-dot highlight-1"></div>
          <div className="highlight-dot highlight-2"></div>
          <div className="highlight-dot highlight-3"></div>
        </div>
        
        {/* Research badges */}
        <div className="research-badges">
          <div className="research-badge">
            <span className="badge-text">Space Biology</span>
          </div>
          <div className="research-badge">
            <span className="badge-text">Deep Space Research</span>
          </div>
        </div>
      </div>

      <div className="container">
        <div className="hero-content layout-row">
          {/* Left column: text */}
          <div className="hero-column hero-text-column">
            <div className="hero-text-inner">
              <h1 className="hero-title">Enable a New Era of Human Space Exploration</h1>
              <div className="hero-description">
                <p>
                  NASA has been performing biology experiments in space for decades, generating 
                  tremendous knowledge for Moon and Mars exploration. This AI-powered dashboard 
                  leverages knowledge graphs to summarize 608 NASA bioscience publications, 
                  enabling researchers to explore experimental impacts and results.
                </p>
              </div>

              <div className="hero-actions">
                <button 
                  className="btn btn-primary hero-cta"
                  onClick={handleExploreClick}
                >
                  Explore Research Dashboard
                </button>
              </div>
            </div>
          </div>

        </div>
        
        {/* Challenge Overview section */}
        <div className="hero-bottom">
          <div className="challenge-section">
            <h2>NASA Space </h2>
            <div className="challenge-grid">
              <div className="challenge-card">
                <h3>Scientific Research</h3>
                <p>Decades of space biology experiments informing future human exploration missions</p>
              </div>
              <div className="challenge-card">
                <h3>AI-Powered Analysis</h3>
                <p>Advanced informatics and AI approaches to organize and summarize research findings</p>
              </div>
              <div className="challenge-card">
                <h3>Mission Planning</h3>
                <p>Actionable insights for safe and efficient Moon and Mars exploration</p>
              </div>
            </div>
            <button 
              className="btn btn-secondary challenge-cta"
              onClick={handleLearnMoreClick}
            >
              explore more
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;