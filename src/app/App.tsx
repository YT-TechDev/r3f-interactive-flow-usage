import SiteHeader from "../ui/SiteHeader";
import RuntimeSequence from "../ui/RuntimeSequence";
import FlowControls from "../ui/FlowControls";
import FlowInspector from "../ui/FlowInspector";

export default function App() {
  return (
    <>
      <SiteHeader />
      <main className="shell">
        <section className="hero" aria-label="Introduction">
          <p className="hero__eyebrow">r3f-interactive-flow consumer</p>
          <h1 className="hero__heading">Predictable flow for interactive 3D.</h1>
          <p className="hero__lead">
            Phase Field demonstrates one provider-owned flow: a navigation request advances
            through transition and provider cooldown before the runtime reports ready.
          </p>
        </section>

        <RuntimeSequence />

        <section className="workspace" aria-label="Runtime workspace">
          <div className="workspace__controls">
            <FlowControls />
          </div>
          <div className="workspace__inspector">
            <FlowInspector />
          </div>
        </section>
      </main>
      <footer className="site-footer">
        <div className="site-footer__inner">
          <p>
            Phase Field is an independent, real-world consumer of the published{" "}
            <code>r3f-interactive-flow</code> package.
          </p>
        </div>
      </footer>
    </>
  );
}
