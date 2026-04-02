import React from 'react';

function App() {
  return (
    <div style={{ 
      minHeight: '100vh', 
      background: 'black', 
      color: 'white', 
      display: 'flex', 
      alignItems: 'center', 
      justifyContent: 'center',
      flexDirection: 'column',
      gap: '20px'
    }}>
      <h1 style={{ color: '#C9A84C', fontSize: '48px', fontWeight: 'bold' }}>
        ELITEX AI
      </h1>
      <p style={{ color: '#C0C0C0', fontSize: '24px' }}>
        Website is Working!
      </p>
      <div style={{ 
        background: '#111111', 
        border: '1px solid #333', 
        padding: '20px', 
        borderRadius: '12px' 
      }}>
        <h2 style={{ color: 'white', marginBottom: '10px' }}>Test Component</h2>
        <p style={{ color: '#C0C0C0' }}>
          If you can see this, React is working correctly.
        </p>
      </div>
    </div>
  );
}

export default App;
