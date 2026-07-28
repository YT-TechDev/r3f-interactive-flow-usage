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
      <div className="flow-controls__row flow-controls__row--primary">
        <button type="button" onClick={() => prev()} disabled={previousDisabled}>
          Previous
        </button>
        <button type="button" onClick={() => next()} disabled={nextDisabled}>
          Next
        </button>
        <button
          type="button"
          className="lock-toggle"
          onClick={() => (isLocked ? unlock() : lock())}
          aria-pressed={isLocked}
        >
          {isLocked ? "Unlock" : "Lock"}
        </button>
      </div>

      <ol className="phase-rail" aria-label="Phase sequence">
        {PHASES.map((target, index) => {
          const targetDisabled = navigationBlocked || target === phase;
          const isCurrent = target === phase;
          return (
            <li key={target} className="phase-rail__item">
              <button
                type="button"
                className="phase-rail__button"
                onClick={() => goTo(target)}
                disabled={targetDisabled}
                aria-current={isCurrent ? "step" : undefined}
              >
                <span className="phase-rail__index">{String(index + 1).padStart(2, "0")}</span>
                <span className="phase-rail__name">{target}</span>
                {isCurrent ? <span className="phase-rail__status">current</span> : null}
              </button>
            </li>
          );
        })}
      </ol>
    </section>
  );
}
