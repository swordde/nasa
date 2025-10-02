import React from 'react';
import './Footer.css';

const Footer = () => {
  return (
    <footer className="footer">
      <div className="container">
        <div className="footer-content">
          <div className="footer-section">
            <h4>NASA Space Biology</h4>
            <p>Advancing our understanding of life in space through cutting-edge research and technology.</p>
          </div>
          
          <div className="footer-section">
            <h4>Quick Links</h4>
            <ul>
              <li><a href="#research">Research</a></li>
              <li><a href="#publications">Publications</a></li>
              <li><a href="#datasets">Datasets</a></li>
              <li><a href="#tools">Tools</a></li>
            </ul>
          </div>
          
          <div className="footer-section">
            <h4>Connect</h4>
            <ul>
              <li><a href="#twitter">Twitter</a></li>
              <li><a href="#linkedin">LinkedIn</a></li>
              <li><a href="#youtube">YouTube</a></li>
              <li><a href="#contact">Contact</a></li>
            </ul>
          </div>
        </div>
        
        <div className="footer-bottom">
          <p>&copy; 2024 NASA Space Biology Knowledge Graph. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;