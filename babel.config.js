const presets = [
  [
    "@babel/env",
    {
      modules: process.env.BABEL_ENV === "cjs" ? "cjs" : false,
    },
  ],
  "@babel/react",
  "@emotion/babel-preset-css-prop",
];
const plugins = ["@babel/plugin-proposal-class-properties"];

module.exports = {
  presets,
  plugins,
};
