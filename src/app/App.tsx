import FlowControls from "../ui/FlowControls";
import FlowInspector from "../ui/FlowInspector";

export default function App() {
  return (
    <main className="shell">
      <h1>Phase Field</h1>
      <p>Predictable flow for interactive 3D.</p>
      <FlowControls />
      <FlowInspector />
    </main>
  );
}
