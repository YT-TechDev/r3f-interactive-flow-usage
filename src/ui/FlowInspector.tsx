import { useFlow, useFlowProgress } from "r3f-interactive-flow";
import { PHASES, type Phase } from "../flow/phases";

export default function FlowInspector() {
  const { phase, phaseIndex, direction, isTransitioning, isCoolingDown, isLocked } = useFlow<Phase>();
  const progress = useFlowProgress();

  const progressPercent = Math.round(progress * 100);

  return (
    <section className="flow-inspector" aria-label="Flow inspector">
      <h2 className="flow-inspector__title">Flow state</h2>
      <dl className="flow-inspector__grid">
        <dt>Phase</dt>
        <dd className="mono">{phase}</dd>

        <dt>Phase position</dt>
        <dd className="mono">
          {phaseIndex + 1} / {PHASES.length}
        </dd>

        <dt>Direction</dt>
        <dd className="mono">{direction}</dd>

        <dt>Progress</dt>
        <dd className="flow-inspector__progress">
          <progress max={1} value={progress} aria-label="Flow transition progress" />
          <span className="mono">{progressPercent}%</span>
        </dd>

        <dt>Transitioning</dt>
        <dd
          className="mono flow-inspector__flag flow-inspector__flag--transition"
          data-active={isTransitioning}
        >
          {String(isTransitioning)}
        </dd>

        <dt>Cooling down</dt>
        <dd
          className="mono flow-inspector__flag flow-inspector__flag--cooldown"
          data-active={isCoolingDown}
        >
          {String(isCoolingDown)}
        </dd>

        <dt>Locked</dt>
        <dd className="mono flow-inspector__flag flow-inspector__flag--lock" data-active={isLocked}>
          {String(isLocked)}
        </dd>
      </dl>
    </section>
  );
}
