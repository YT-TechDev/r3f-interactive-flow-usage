export type FlowLifecycleVisualState = "ready" | "transition" | "cooldown" | "locked";

export type FlowLifecycleMaterialState = {
  coreColor: string;
  ringColor: string;
  nodeColor: string;
};

export const FLOW_LIFECYCLE_VISUALS = {
  ready: {
    coreColor: "#5eead4",
    ringColor: "#3a3a45",
    nodeColor: "#9a9aa6",
  },
  transition: {
    coreColor: "#67e8f9",
    ringColor: "#4fd1c5",
    nodeColor: "#a8e6ec",
  },
  cooldown: {
    coreColor: "#e0b34d",
    ringColor: "#7a5a2a",
    nodeColor: "#a67c3d",
  },
  locked: {
    coreColor: "#e0645e",
    ringColor: "#7a3330",
    nodeColor: "#a65550",
  },
} satisfies Record<FlowLifecycleVisualState, FlowLifecycleMaterialState>;
