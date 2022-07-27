import Builder from "./page/Builder.tsx";
import React, { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import reportWebVitals from "./reportWebVitals.ts";

import("./scss/tailwinds.scss");
import("./scss/index.scss");

document.addEventListener("DOMContentLoaded", function (event) {
  const root = createRoot(document.getElementById("root"));
  root.render(
    <StrictMode>
      <Builder />
    </StrictMode>
  );
});

reportWebVitals();
