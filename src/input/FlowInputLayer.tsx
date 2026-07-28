import { useRef, type ReactNode } from "react";
import { useKeyboardInput, useTouchInput, useWheelInput } from "r3f-interactive-flow";
import type { Phase } from "../flow/phases";

const KEYBOARD_KEYS = {
  next: ["ArrowRight"],
  prev: ["ArrowLeft"],
} as const;

type FlowInputLayerProps = {
  children: ReactNode;
};

export default function FlowInputLayer({ children }: FlowInputLayerProps) {
  const surfaceRef = useRef<HTMLDivElement | null>(null);

  useWheelInput<Phase>({
    target: surfaceRef,
    axis: "y",
    threshold: 40,
    cooldown: 0,
    preventDefault: true,
  });

  useTouchInput<Phase>({
    target: surfaceRef,
    axis: "y",
    threshold: 50,
    cooldown: 0,
    preventDefault: true,
  });

  useKeyboardInput<Phase>({
    keys: KEYBOARD_KEYS,
    cooldown: 0,
    preventDefault: true,
    ignoreWhenTyping: true,
  });

  return (
    <div ref={surfaceRef} className="flow-input-surface">
      {children}
    </div>
  );
}
