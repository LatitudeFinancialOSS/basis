module.exports = {
  testMatch: [
    "<rootDir>/src/**/*.test.js",
    "<rootDir>/website/src/**/*.test.js",
  ],
  moduleNameMapper: {
    "^react($|/.+)": "<rootDir>/node_modules/react$1",
    basis: "<rootDir>/src",
    "typeface-montserrat": "identity-obj-proxy",
    "typeface-roboto": "identity-obj-proxy",
  },
  bail: true,
};
