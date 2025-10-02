import { useEffect } from 'react';

export default function HabitTrackerPage() {
  useEffect(() => {
    // Redirect to the standalone habit tracker app
    window.location.href = '/habit_tracker/index.html';
  }, []);

  return (
    <div style={{ 
      display: 'flex', 
      justifyContent: 'center', 
      alignItems: 'center', 
      height: '100vh',
      fontFamily: 'system-ui, -apple-system, sans-serif'
    }}>
      <p>Redirecting to Habit Tracker...</p>
    </div>
  );
}
