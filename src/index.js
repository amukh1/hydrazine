import Builder from "./page/Builder.tsx";
import React, { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import reportWebVitals from "./reportWebVitals.ts";

document.addEventListener("DOMContentLoaded", function (event) {
  const root = createRoot(document.getElementById("root"));
  root.render(
    <StrictMode>
      <Builder />
    </StrictMode>
  );
});

reportWebVitals();
