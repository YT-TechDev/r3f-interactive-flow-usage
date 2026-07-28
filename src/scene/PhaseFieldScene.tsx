import FlowCore from "./FlowCore";

export default function PhaseFieldScene() {
  return (
    <>
      <ambientLight intensity={0.45} />
      <directionalLight position={[4, 5, 6]} intensity={1.1} />
      <pointLight position={[-4, -2, 3]} intensity={0.3} color="#5eead4" />
      <FlowCore />
    </>
  );
}
