import fs from "fs";
import path from "path";

const here = process.cwd();
const dist = path.join(here, "dist");

// adjust this relative path as per your repo layout
const backendStaticDir = path.resolve(here, "../media-center-backend/static");

fs.rmSync(backendStaticDir, { recursive: true, force: true });
fs.mkdirSync(backendStaticDir, { recursive: true });

fs.cpSync(dist, backendStaticDir, { recursive: true });

console.log("✅ Copied frontend dist ->", backendStaticDir);
