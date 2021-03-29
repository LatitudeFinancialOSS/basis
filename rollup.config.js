import typescript from "rollup-plugin-typescript2";
import del from "rollup-plugin-delete";
import pkg from "./package.json";
import { babel } from "@rollup/plugin-babel";
import commonjs from "@rollup/plugin-commonjs";

export default [
  {
    input: "src/index.ts",
    output: [
      { file: pkg.main, format: "cjs" },
      { file: pkg.module, format: "esm" },
    ],
    plugins: [
      del({
        targets: ["dist/*"],
      }),
      babel({ babelHelpers: "bundled" }),
      commonjs(),
      typescript({
        include: ["src/*.js", "src/**/*.js", "src/*.ts(x)?", "src/**/*.ts(x)?"],
      }),
    ],
    external: Object.keys(pkg.peerDependencies || {}),
  },
];
