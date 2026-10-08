const fs = require("fs");
const path = require("path");

const swPath = path.join(__dirname, "sw.js");
let content = fs.readFileSync(swPath, "utf8");

const version = "v" + Date.now(); // رقم فريد كل مرة، تلقائي

content = content.replace(
  /const VERSION\s*=\s*["'].*?["'];/,
  `const VERSION = "${version}";`,
);

fs.writeFileSync(swPath, content);
console.log("✅ SW version updated to", version);
