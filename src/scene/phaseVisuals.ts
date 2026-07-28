import type { Phase } from "../flow/phases";

type Vector3Tuple = readonly [number, number, number];
type NodePositions = readonly [
  Vector3Tuple,
  Vector3Tuple,
  Vector3Tuple,
  Vector3Tuple,
  Vector3Tuple,
];

export type PhaseVisualState = {
  coreScale: number;
  coreRotation: Vector3Tuple;
  primaryRingScale: number;
  primaryRingRotation: Vector3Tuple;
  secondaryRingScale: number;
  secondaryRingRotation: Vector3Tuple;
  nodeScale: number;
  nodePositions: NodePositions;
};

const NODE_ANGLE_OFFSET = -Math.PI / 2;

// A flat, evenly spaced pentagon of node positions facing the camera, used by
// the phases whose nodes settle into one simple symmetric ring.
const ringNodePositions = (radius: number, z: number): NodePositions => {
  const point = (index: number): Vector3Tuple => {
    const angle = NODE_ANGLE_OFFSET + (index * (Math.PI * 2)) / 5;
    return [radius * Math.cos(angle), radius * Math.sin(angle), z];
  };
  return [point(0), point(1), point(2), point(3), point(4)];
};

export const PHASE_VISUALS = {
  origin: {
    coreScale: 0.72,
    coreRotation: [0.35, 0.55, 0],
    primaryRingScale: 0.55,
    primaryRingRotation: [Math.PI / 2.4, 0, 0],
    secondaryRingScale: 0.5,
    secondaryRingRotation: [Math.PI / 2.4 + 0.25, 0.2, 0],
    nodeScale: 0.12,
    nodePositions: ringNodePositions(1.2, 0.2),
  },
  expand: {
    coreScale: 1.0,
    coreRotation: [0.5, 0.75, 0.1],
    primaryRingScale: 1.05,
    primaryRingRotation: [Math.PI / 2.2, 0.25, 0.05],
    secondaryRingScale: 0.85,
    secondaryRingRotation: [Math.PI / 2.6, -0.2, 0.1],
    nodeScale: 0.15,
    nodePositions: [
      [0, -1.65, 0.3],
      [1.569, -0.51, -0.3],
      [0.97, 1.335, 0.3],
      [-0.97, 1.335, -0.3],
      [-1.569, -0.51, 0.3],
    ],
  },
  align: {
    coreScale: 1.05,
    coreRotation: [0.15, 0, 0],
    primaryRingScale: 1.0,
    primaryRingRotation: [Math.PI / 2 - 0.15, 0, 0],
    secondaryRingScale: 0.8,
    secondaryRingRotation: [Math.PI / 2 - 0.15, 0, 0],
    nodeScale: 0.15,
    nodePositions: [
      [-2.3, 1.75, 0],
      [-1.15, 1.75, 0],
      [0, 1.75, 0],
      [1.15, 1.75, 0],
      [2.3, 1.75, 0],
    ],
  },
  focus: {
    coreScale: 1.15,
    coreRotation: [0.6, 0.35, 0.15],
    primaryRingScale: 0.95,
    primaryRingRotation: [0.2, 0, 0],
    secondaryRingScale: 0.78,
    secondaryRingRotation: [0.35, 0.15, 0],
    nodeScale: 0.15,
    nodePositions: [
      [0, 1.85, 0],
      [-1.3, 1.5, 0],
      [1.3, 1.5, 0],
      [-2.25, 2.0, 0],
      [2.25, 2.0, 0],
    ],
  },
  resolve: {
    coreScale: 1.2,
    coreRotation: [0.4, 0.65, 0],
    primaryRingScale: 1.05,
    primaryRingRotation: [Math.PI / 2.4, 0, 0],
    secondaryRingScale: 0.85,
    secondaryRingRotation: [Math.PI / 2.4, Math.PI / 2, 0],
    nodeScale: 0.17,
    nodePositions: ringNodePositions(1.95, 0.2),
  },
} satisfies Record<Phase, PhaseVisualState>;
