import Builder from "./page/Builder.js";
import React, { StrictMode } from "react";
import { createRoot } from "react-dom/client";

document.addEventListener("DOMContentLoaded", function (event) {
  const root = createRoot(document.getElementById("root"));
  root.render(
    <StrictMode>
      <Builder />
    </StrictMode>
  );
});
