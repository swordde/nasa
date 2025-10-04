import React, { useState, useEffect } from 'react';
import { useAuth } from '../hooks/useAuth';
import './SignUp.css';

const SignUp = ({ setCurrentPage }) => {
  console.log('SignUp component is rendering!');

  return (
    <div className="signup-page">
      <div className="container">
        <h1 style={{ color: 'white', fontSize: '3rem', textAlign: 'center' }}>
          SIGN UP PAGE TEST
        </h1>
        <div style={{ background: 'green', padding: '20px', margin: '20px', color: 'white' }}>
          This is the Sign Up page test. If you see this, the routing is working!
        </div>
        <div style={{ display: 'flex', gap: '10px', justifyContent: 'center', margin: '20px' }}>
          <button 
            onClick={() => setCurrentPage('signin')}
            style={{ padding: '10px 20px', fontSize: '16px', background: 'blue', color: 'white', border: 'none' }}
          >
            Go to Sign In
          </button>
          <button 
            onClick={() => setCurrentPage('home')}
            style={{ padding: '10px 20px', fontSize: '16px', background: 'gray', color: 'white', border: 'none' }}
          >
            Go to Home
          </button>
        </div>
      </div>
    </div>
  );
};

export default SignUp;