export default function DemoPage() {
  return (
    <div style={{ 
      width: '100%', 
      height: '100vh',
      margin: 0,
      padding: 0,
      overflow: 'hidden'
    }}>
      <iframe 
        src="/demo/index.html"
        style={{
          width: '100%',
          height: '100%',
          border: 'none',
          margin: 0,
          padding: 0
        }}
        title="Demo App"
      />
    </div>
  );
}
