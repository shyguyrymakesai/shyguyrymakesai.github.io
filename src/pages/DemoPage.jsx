import { useEffect } from 'react';

export default function DemoPage() {
  useEffect(() => {
    // Redirect to the standalone demo app
    window.location.href = '/demo/index.html';
  }, []);

  return (
    <div style={{ 
      display: 'flex', 
      justifyContent: 'center', 
      alignItems: 'center', 
      height: '100vh',
      fontFamily: 'system-ui, -apple-system, sans-serif'
    }}>
      <p>Redirecting to Demo...</p>
    </div>
  );
}
