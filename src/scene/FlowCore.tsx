const CORE_COLOR = "#5eead4";
const RING_COLOR = "#3a3a45";

export default function FlowCore() {
  return (
    <group position={[0, 0, 0]}>
      <mesh rotation={[0.4, 0.6, 0]}>
        <icosahedronGeometry args={[1.3, 0]} />
        <meshStandardMaterial color={CORE_COLOR} roughness={0.35} metalness={0.1} />
      </mesh>
      <mesh rotation={[Math.PI / 2.4, 0, 0]}>
        <torusGeometry args={[2.1, 0.025, 16, 64]} />
        <meshStandardMaterial color={RING_COLOR} roughness={0.5} metalness={0.15} />
      </mesh>
    </group>
  );
}
