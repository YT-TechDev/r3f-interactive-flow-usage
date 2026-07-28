import { Canvas } from "@react-three/fiber";
import PhaseFieldScene from "./PhaseFieldScene";

export default function SceneStage() {
  return (
    <section className="scene-stage" aria-label="Flow Core scene">
      <h2 className="scene-stage__heading">Flow Core</h2>
      <p className="scene-stage__description">
        A static scene foundation: one real Canvas rendered under the existing flow provider. The
        Flow Core does not yet react to phase state.
      </p>
      <div className="scene-stage__canvas">
        <Canvas camera={{ position: [0, 0, 5], fov: 42, near: 0.1, far: 100 }}>
          <PhaseFieldScene />
        </Canvas>
      </div>
    </section>
  );
}
