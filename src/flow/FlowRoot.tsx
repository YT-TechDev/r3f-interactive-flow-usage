import type { ReactNode } from "react";
import { FlowProvider } from "r3f-interactive-flow";
import type { FlowTransitionOptions } from "r3f-interactive-flow";
import { PHASES, type Phase } from "./phases";

const easeInOutCubic = (t: number) =>
  t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2;

const FLOW_TRANSITION = {
  duration: 900,
  cooldown: 250,
  easing: easeInOutCubic,
} satisfies FlowTransitionOptions<Phase>;

type FlowRootProps = {
  children: ReactNode;
};

export default function FlowRoot({ children }: FlowRootProps) {
  return (
    <FlowProvider<Phase>
      phases={PHASES}
      initialPhase="origin"
      transition={FLOW_TRANSITION}
    >
      {children}
    </FlowProvider>
  );
}
