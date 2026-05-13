export default function TestPage() {
  return (
    <div style={{ padding: "40px", fontSize: "24px", color: "red", background: "white", position: "relative", zIndex: 9999 }}>
      <h1>TEST PAGE - Si ves esto, React funciona</h1>
      <p>Timestamp: {Date.now()}</p>
    </div>
  );
}
