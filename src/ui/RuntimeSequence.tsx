import { useFlow } from "r3f-interactive-flow";
import type { Phase } from "../flow/phases";

type StepKey = "input" | "request" | "transition" | "cooldown" | "ready";

const STEPS: ReadonlyArray<{ key: StepKey; label: string }> = [
  { key: "input", label: "Input" },
  { key: "request", label: "Navigation request" },
  { key: "transition", label: "Transition" },
  { key: "cooldown", label: "Provider cooldown" },
  { key: "ready", label: "Ready" },
];

const NEUTRAL_STEPS: ReadonlySet<StepKey> = new Set(["input", "request"]);

export default function RuntimeSequence() {
  const { isTransitioning, isCoolingDown, isLocked } = useFlow<Phase>();

  const activeStep: StepKey = isTransitioning ? "transition" : isCoolingDown ? "cooldown" : "ready";

  const lifecycleStatus = isLocked
    ? "Locked"
    : isTransitioning
      ? "Transition"
      : isCoolingDown
        ? "Cooldown"
        : "Ready";

  return (
    <section className="runtime-sequence" aria-label="Runtime sequence">
      <p className="sr-only" role="status" aria-live="polite" aria-atomic="true">
        Flow status: {lifecycleStatus}.
      </p>
      <ol className="runtime-sequence__list">
        {STEPS.map((step) => {
          const isNeutral = NEUTRAL_STEPS.has(step.key);
          const isActive = !isNeutral && step.key === activeStep;
          return (
            <li
              key={step.key}
              className="runtime-sequence__step"
              data-state={isNeutral ? "neutral" : isActive ? activeStep : "inactive"}
              aria-current={isActive ? "step" : undefined}
            >
              <span className="runtime-sequence__label">{step.label}</span>
              {isActive ? <span className="runtime-sequence__marker">active</span> : null}
            </li>
          );
        })}
      </ol>
      {isLocked ? (
        <p className="runtime-sequence__lock">
          Manual lock is active. Navigation is gated independently of the lifecycle above.
        </p>
      ) : null}
    </section>
  );
}
