import { Canvas } from "@react-three/fiber";
import PhaseFieldScene from "./PhaseFieldScene";

export default function SceneStage() {
  return (
    <section className="scene-stage" aria-label="Flow Core scene">
      <h2 className="scene-stage__heading">Flow Core</h2>
      <p className="scene-stage__description">
        One persistent Flow Core morphs through five provider-owned phases—origin, expand, align,
        focus, and resolve—driven directly by the flow transition&apos;s public progress value.
      </p>
      <div className="scene-stage__canvas">
        <Canvas camera={{ position: [0, 0, 6], fov: 42, near: 0.1, far: 100 }}>
          <PhaseFieldScene />
        </Canvas>
      </div>
    </section>
  );
}
