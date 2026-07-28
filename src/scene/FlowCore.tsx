import { useRef } from "react";
import type { Mesh } from "three";
import { useFlowFrame } from "r3f-interactive-flow";
import type { Phase } from "../flow/phases";
import { PHASE_VISUALS, type PhaseVisualState } from "./phaseVisuals";

const CORE_COLOR = "#5eead4";
const RING_COLOR = "#3a3a45";
const NODE_COLOR = "#9a9aa6";

type MutableVector3 = [number, number, number];
type MutableNodePositions = [
  MutableVector3,
  MutableVector3,
  MutableVector3,
  MutableVector3,
  MutableVector3,
];

type MutableVisualState = {
  coreScale: number;
  coreRotation: MutableVector3;
  primaryRingScale: number;
  primaryRingRotation: MutableVector3;
  secondaryRingScale: number;
  secondaryRingRotation: MutableVector3;
  nodeScale: number;
  nodePositions: MutableNodePositions;
};

const cloneVisualState = (state: PhaseVisualState): MutableVisualState => ({
  coreScale: state.coreScale,
  coreRotation: [...state.coreRotation],
  primaryRingScale: state.primaryRingScale,
  primaryRingRotation: [...state.primaryRingRotation],
  secondaryRingScale: state.secondaryRingScale,
  secondaryRingRotation: [...state.secondaryRingRotation],
  nodeScale: state.nodeScale,
  nodePositions: state.nodePositions.map((position) => [...position]) as MutableNodePositions,
});

// Snapshots the currently rendered visual values into `target` so a new
// transition can morph away from what is actually on screen.
const copyVisualState = (target: MutableVisualState, source: MutableVisualState) => {
  target.coreScale = source.coreScale;
  target.coreRotation[0] = source.coreRotation[0];
  target.coreRotation[1] = source.coreRotation[1];
  target.coreRotation[2] = source.coreRotation[2];
  target.primaryRingScale = source.primaryRingScale;
  target.primaryRingRotation[0] = source.primaryRingRotation[0];
  target.primaryRingRotation[1] = source.primaryRingRotation[1];
  target.primaryRingRotation[2] = source.primaryRingRotation[2];
  target.secondaryRingScale = source.secondaryRingScale;
  target.secondaryRingRotation[0] = source.secondaryRingRotation[0];
  target.secondaryRingRotation[1] = source.secondaryRingRotation[1];
  target.secondaryRingRotation[2] = source.secondaryRingRotation[2];
  target.nodeScale = source.nodeScale;
  for (let i = 0; i < 5; i += 1) {
    target.nodePositions[i][0] = source.nodePositions[i][0];
    target.nodePositions[i][1] = source.nodePositions[i][1];
    target.nodePositions[i][2] = source.nodePositions[i][2];
  }
};

const lerp = (a: number, b: number, t: number) => a + (b - a) * t;

// Writes lerp(source, target, t) into `current`, field by field, with no
// per-call allocation. At t = 1 this reproduces the target exactly, which is
// what keeps the settled geometry free of accumulated drift.
const applyLerp = (
  current: MutableVisualState,
  source: MutableVisualState,
  target: PhaseVisualState,
  t: number,
) => {
  current.coreScale = lerp(source.coreScale, target.coreScale, t);
  for (let i = 0; i < 3; i += 1) {
    current.coreRotation[i] = lerp(source.coreRotation[i], target.coreRotation[i], t);
  }
  current.primaryRingScale = lerp(source.primaryRingScale, target.primaryRingScale, t);
  for (let i = 0; i < 3; i += 1) {
    current.primaryRingRotation[i] = lerp(
      source.primaryRingRotation[i],
      target.primaryRingRotation[i],
      t,
    );
  }
  current.secondaryRingScale = lerp(source.secondaryRingScale, target.secondaryRingScale, t);
  for (let i = 0; i < 3; i += 1) {
    current.secondaryRingRotation[i] = lerp(
      source.secondaryRingRotation[i],
      target.secondaryRingRotation[i],
      t,
    );
  }
  current.nodeScale = lerp(source.nodeScale, target.nodeScale, t);
  for (let i = 0; i < 5; i += 1) {
    for (let axis = 0; axis < 3; axis += 1) {
      current.nodePositions[i][axis] = lerp(
        source.nodePositions[i][axis],
        target.nodePositions[i][axis],
        t,
      );
    }
  }
};

export default function FlowCore() {
  const coreRef = useRef<Mesh>(null);
  const primaryRingRef = useRef<Mesh>(null);
  const secondaryRingRef = useRef<Mesh>(null);
  const nodeRefs = useRef<Array<Mesh | null>>([null, null, null, null, null]);

  const currentRef = useRef<MutableVisualState>(cloneVisualState(PHASE_VISUALS.origin));
  const sourceRef = useRef<MutableVisualState>(cloneVisualState(PHASE_VISUALS.origin));
  const targetPhaseRef = useRef<Phase>("origin");

  useFlowFrame<Phase>((state) => {
    if (state.phase !== targetPhaseRef.current) {
      copyVisualState(sourceRef.current, currentRef.current);
      targetPhaseRef.current = state.phase;
    }

    const target = PHASE_VISUALS[targetPhaseRef.current];
    const t = state.isTransitioning ? state.progress : 1;
    applyLerp(currentRef.current, sourceRef.current, target, t);
    const current = currentRef.current;

    const core = coreRef.current;
    const primaryRing = primaryRingRef.current;
    const secondaryRing = secondaryRingRef.current;
    if (!core || !primaryRing || !secondaryRing) {
      return;
    }

    core.scale.setScalar(current.coreScale);
    core.rotation.set(current.coreRotation[0], current.coreRotation[1], current.coreRotation[2]);

    primaryRing.scale.setScalar(current.primaryRingScale);
    primaryRing.rotation.set(
      current.primaryRingRotation[0],
      current.primaryRingRotation[1],
      current.primaryRingRotation[2],
    );

    secondaryRing.scale.setScalar(current.secondaryRingScale);
    secondaryRing.rotation.set(
      current.secondaryRingRotation[0],
      current.secondaryRingRotation[1],
      current.secondaryRingRotation[2],
    );

    for (let i = 0; i < 5; i += 1) {
      const node = nodeRefs.current[i];
      if (!node) {
        continue;
      }
      const position = current.nodePositions[i];
      node.position.set(position[0], position[1], position[2]);
      node.scale.setScalar(current.nodeScale);
    }
  });

  const origin = PHASE_VISUALS.origin;

  return (
    <group position={[0, 0, 0]}>
      <mesh
        ref={coreRef}
        scale={origin.coreScale}
        rotation={[origin.coreRotation[0], origin.coreRotation[1], origin.coreRotation[2]]}
      >
        <icosahedronGeometry args={[1.3, 0]} />
        <meshStandardMaterial color={CORE_COLOR} roughness={0.35} metalness={0.1} />
      </mesh>
      <mesh
        ref={primaryRingRef}
        scale={origin.primaryRingScale}
        rotation={[
          origin.primaryRingRotation[0],
          origin.primaryRingRotation[1],
          origin.primaryRingRotation[2],
        ]}
      >
        <torusGeometry args={[2.1, 0.025, 16, 64]} />
        <meshStandardMaterial color={RING_COLOR} roughness={0.5} metalness={0.15} />
      </mesh>
      <mesh
        ref={secondaryRingRef}
        scale={origin.secondaryRingScale}
        rotation={[
          origin.secondaryRingRotation[0],
          origin.secondaryRingRotation[1],
          origin.secondaryRingRotation[2],
        ]}
      >
        <torusGeometry args={[2.1, 0.02, 16, 64]} />
        <meshStandardMaterial color={RING_COLOR} roughness={0.5} metalness={0.15} />
      </mesh>
      {origin.nodePositions.map((position, index) => (
        <mesh
          key={index}
          ref={(mesh) => {
            nodeRefs.current[index] = mesh;
          }}
          position={[position[0], position[1], position[2]]}
          scale={origin.nodeScale}
        >
          <icosahedronGeometry args={[1, 0]} />
          <meshStandardMaterial color={NODE_COLOR} roughness={0.45} metalness={0.1} />
        </mesh>
      ))}
    </group>
  );
}
