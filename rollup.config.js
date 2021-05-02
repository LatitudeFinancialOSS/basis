import typescript from "rollup-plugin-typescript2";
import del from "rollup-plugin-delete";
import pkg from "./package.json";
import { babel } from "@rollup/plugin-babel";
import commonjs from "@rollup/plugin-commonjs";
import resolve from "@rollup/plugin-node-resolve";
import peerDepsExternal from 'rollup-plugin-peer-deps-external';

export default [
  {
    input: "src/index.ts",
    output: [
      { file: pkg.module, format: "esm" },
    ],
    plugins: [
      peerDepsExternal(),
      resolve(),
      del({
        targets: ["dist/*"],
      }),
      babel({ babelHelpers: "bundled", exclude: 'node_modules/**' }),
      commonjs({
        include: /node_modules/,
      }),
      typescript({
        include: ["src/*.js", "src/**/*.js", "src/*.ts(x)?", "src/**/*.ts(x)?"],
        typescript: require("typescript"),
      }),
    ],
    external: Object.keys(pkg.peerDependencies || {}),
  },
];
