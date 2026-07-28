import { useFlow } from "r3f-interactive-flow";
import { PHASES, type Phase } from "../flow/phases";

export default function FlowControls() {
  const { phase, phaseIndex, isTransitioning, isCoolingDown, isLocked, next, prev, goTo, lock, unlock } =
    useFlow<Phase>();

  const navigationBlocked = isTransitioning || isCoolingDown || isLocked;

  const previousDisabled = navigationBlocked || phaseIndex === 0;
  const nextDisabled = navigationBlocked || phaseIndex === PHASES.length - 1;

  return (
    <section className="flow-controls" aria-label="Flow controls">
      <div className="flow-controls__row">
        <button type="button" onClick={() => prev()} disabled={previousDisabled}>
          Previous
        </button>
        <button type="button" onClick={() => next()} disabled={nextDisabled}>
          Next
        </button>
        <button
          type="button"
          onClick={() => (isLocked ? unlock() : lock())}
          aria-pressed={isLocked}
        >
          {isLocked ? "Unlock" : "Lock"}
        </button>
      </div>
      <div className="flow-controls__row flow-controls__row--targets">
        {PHASES.map((target) => {
          const targetDisabled = navigationBlocked || target === phase;
          return (
            <button
              key={target}
              type="button"
              onClick={() => goTo(target)}
              disabled={targetDisabled}
              aria-current={target === phase ? "step" : undefined}
            >
              {target}
            </button>
          );
        })}
      </div>
    </section>
  );
}
