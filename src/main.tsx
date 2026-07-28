import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./app/App";
import FlowRoot from "./flow/FlowRoot";
import "./styles/global.css";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <FlowRoot>
      <App />
    </FlowRoot>
  </StrictMode>,
);
