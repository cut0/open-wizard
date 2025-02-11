import { build } from "esbuild";

Promise.all([
  build({
    entryPoints: ["./src/cli/main.ts"],
    bundle: true,
    minify: true,
    sourcemap: false,
    platform: "node",
    target: "esnext",
    banner: {
      js: "#!/usr/bin/env node",
    },
    format: "cjs",
    outfile: "./dist/cli/index.js",
  }),
]).catch(() => process.exit(1));
