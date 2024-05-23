import { defineConfig } from "tsup";
// import path from "path";
// import fs from "fs";
import pkg from "./package.json";
let bannerText = `/**\n * name: ${pkg.name}\n * version: v${pkg.version}\n */`;
export default defineConfig({
  entry: ["src/extension.ts"],
  outDir: "out",
  legacyOutput: false,
  banner: {
    js: bannerText,
  },
  sourcemap: false,
  clean: true,
  dts: true,
  minify: true,
  splitting: false,
  format: ["esm", "cjs"],
  async onSuccess() {
    // await fs.renameSync(
    //   path.resolve(__dirname, "out/extension.js"),
    //   path.resolve(__dirname, "out/extension.cjs")
    // );
    console.log("Build Success");
  },
});
