import { useFlow, useFlowProgress } from "r3f-interactive-flow";
import { PHASES, type Phase } from "../flow/phases";

export default function FlowInspector() {
  const { phase, phaseIndex, direction, isTransitioning, isCoolingDown, isLocked } = useFlow<Phase>();
  const progress = useFlowProgress();

  const progressPercent = Math.round(progress * 100);

  return (
    <section className="flow-inspector" aria-label="Flow inspector">
      <h2>Flow state</h2>
      <dl>
        <dt>Phase</dt>
        <dd>{phase}</dd>

        <dt>Phase position</dt>
        <dd>
          {phaseIndex + 1} of {PHASES.length}
        </dd>

        <dt>Direction</dt>
        <dd>{direction}</dd>

        <dt>Progress</dt>
        <dd>
          <progress max={1} value={progress} aria-label="Flow transition progress" />
          <span>{progressPercent}%</span>
        </dd>

        <dt>Transitioning</dt>
        <dd>{String(isTransitioning)}</dd>

        <dt>Cooling down</dt>
        <dd>{String(isCoolingDown)}</dd>

        <dt>Locked</dt>
        <dd>{String(isLocked)}</dd>
      </dl>
    </section>
  );
}
