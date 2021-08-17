import typescript from "rollup-plugin-typescript2";
import del from "rollup-plugin-delete";
import pkg from "./package.json";
import { babel } from "@rollup/plugin-babel";
import commonjs from "@rollup/plugin-commonjs";
import resolve from "@rollup/plugin-node-resolve";
import peerDepsExternal from "rollup-plugin-peer-deps-external";
// commented out because breaking js components.
// revert when js components have been converted to TS
// import dts from "rollup-plugin-dts";

export default [
  {
    input: "src/index.ts",
    output: [
      { file: pkg.main, format: "cjs" },
      { file: pkg.module, format: "esm" },
    ],
    plugins: [
      // https://rollupjs.org/guide/en/#warning-treating-module-as-external-dependency
      peerDepsExternal(),
      resolve(),
      del({
        targets: ["dist/*"],
      }),
      babel({ babelHelpers: "bundled", exclude: "node_modules/**" }),
      commonjs(),
      typescript({
        include: ["src/*.js", "src/**/*.js", "src/*.ts(x)?", "src/**/*.ts(x)?"],
        // useTsconfigDeclarationDir: true,
      }),
    ],
    external: Object.keys(pkg.peerDependencies || {}),
  },
  // {
  //   input: "./dist/dts/index.d.ts",
  //   output: [{ file: "dist/index.d.ts", format: "es" }],
  //   plugins: [dts()],
  // },
];
