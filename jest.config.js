module.exports = {
  preset: "ts-jest/presets/js-with-babel",
  testMatch: [
    "<rootDir>/src/**/*.test.js",
    "<rootDir>/src/**/*.test.tsx?",
    "<rootDir>/website/src/**/*.test.js",
    "<rootDir>/website/src/**/*.test.tsx?",
  ],
  moduleNameMapper: {
    "^react($|/.+)": "<rootDir>/node_modules/react$1",
    basis: "<rootDir>/src",
    "typeface-montserrat": "identity-obj-proxy",
    "typeface-roboto": "identity-obj-proxy",
  },
  bail: true,
};
