import React from 'react';
import { useNavigate } from 'react-router-dom';

const NotFound = () => {
  const navigate = useNavigate();

  return (
    <div style={{ textAlign: 'center', padding: '50px' }}>
      <h1 style={{ fontSize: '3em', marginBottom: '10px' }}>404</h1>
      <p style={{ fontSize: '1.2em' }}>Oops! The page you are looking for does not exist.</p>
      <button
        onClick={() => navigate('/')}
        style={{
          padding: '10px 20px',
          fontSize: '1em',
          color: 'white',
          backgroundColor: '#007bff',
          border: 'none',
          borderRadius: '5px',
          cursor: 'pointer'
        }}
      >
        Go back to the homepage
      </button>
    </div>
  );
};

export default NotFound; 