module.exports = {
  preset: "ts-jest/presets/js-with-ts-esm",
  testMatch: [
    "<rootDir>/src/**/*.test.js",
    "<rootDir>/src/**/*.test.ts(x)?",
    "<rootDir>/website/src/**/*.test.js",
    "<rootDir>/website/src/**/*.test.ts(x)?",
  ],
  moduleNameMapper: {
    "^react($|/.+)": "<rootDir>/node_modules/react$1",
    basis: "<rootDir>/src",
    "typeface-montserrat": "identity-obj-proxy",
    "typeface-roboto": "identity-obj-proxy",
  },
  bail: true,
  testEnvironment: "jsdom",
};
