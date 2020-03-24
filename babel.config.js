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
const plugins = [];

module.exports = {
  presets,
  plugins,
};
