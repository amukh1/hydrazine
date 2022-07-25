let code = "";

const fs = require("fs");
const classes = ["from-{color}-500", "to-{color}-300", "border-{color}"];
const colors = ["shamrock", "cinna", "royal", "picton", "emerald", "amethyst"];
const extras = [
  "bg-gradient-to-r bg-shark-600 border border-dashed text-gray-200 font-bold text-xs",
];
classes.forEach((element) => {
  colors.forEach((color) => {
    code += ` ${element.replace("{color}", color)} `;
  });
});

extras.forEach((c) => {
  code += ` ${c} `;
});

fs.writeFileSync(
  "../public/classes.html",
  `<div class="${code}"></div>`,
  "utf-8"
);
