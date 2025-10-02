export default function HabitTrackerPage() {
  return (
    <div style={{ 
      width: '100%', 
      height: '100vh',
      margin: 0,
      padding: 0,
      overflow: 'hidden'
    }}>
      <iframe 
        src="/habit_tracker/index.html"
        style={{
          width: '100%',
          height: '100%',
          border: 'none',
          margin: 0,
          padding: 0
        }}
        title="Habit Tracker App"
      />
    </div>
  );
}
