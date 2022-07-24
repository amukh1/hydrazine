import { createRoot } from "react-dom/client";
import React, { StrictMode } from "react";
import Builder from "./page/Builder.js";

import "./scss/tailwinds.scss";
import "./scss/index.scss";
import "./scss/flow.scss";

const root = createRoot(document.getElementById("root"));
root.render(
  <StrictMode>
    <Builder />
  </StrictMode>
);
