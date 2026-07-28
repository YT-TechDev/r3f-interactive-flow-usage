import { useFlow } from "r3f-interactive-flow";
import { PHASES, type Phase } from "../flow/phases";

type GateStatus = "Locked" | "Transition" | "Cooldown" | "Ready";

export default function InputPanel() {
  const { phaseIndex, isTransitioning, isCoolingDown, isLocked } = useFlow<Phase>();

  const blocked = isTransitioning || isCoolingDown || isLocked;

  const status: GateStatus = isLocked
    ? "Locked"
    : isTransitioning
      ? "Transition"
      : isCoolingDown
        ? "Cooldown"
        : "Ready";

  const previousAvailable = !blocked && phaseIndex > 0;
  const nextAvailable = !blocked && phaseIndex < PHASES.length - 1;

  return (
    <section className="input-panel" aria-label="Flow input bindings">
      <h2 className="input-panel__title">Flow input</h2>
      <dl className="input-panel__bindings">
        <dt>Wheel</dt>
        <dd>Over Flow Core &middot; down next &middot; up previous</dd>

        <dt>Touch</dt>
        <dd>Over Flow Core &middot; swipe up next &middot; swipe down previous</dd>

        <dt>Keyboard</dt>
        <dd>ArrowRight next &middot; ArrowLeft previous</dd>
      </dl>
      <dl className="input-panel__status">
        <dt>Gate</dt>
        <dd className="mono input-panel__gate" data-status={status}>
          {status}
        </dd>

        <dt>Previous</dt>
        <dd className="mono" data-available={previousAvailable}>
          {previousAvailable ? "available" : "unavailable"}
        </dd>

        <dt>Next</dt>
        <dd className="mono" data-available={nextAvailable}>
          {nextAvailable ? "available" : "unavailable"}
        </dd>
      </dl>
      <p className="input-panel__note">
        Ready means the shared navigation gate is open, not that every wheel, touch, or keyboard
        event will navigate. Threshold, key, and phase-boundary requirements still apply.
      </p>
    </section>
  );
}
