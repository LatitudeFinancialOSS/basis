module.exports = {
  testMatch: [
    "<rootDir>/src/**/*.test.js",
    "<rootDir>/website/src/**/*.test.js",
  ],
  moduleNameMapper: {
    react: "<rootDir>/website/node_modules/react",
    "typeface-montserrat": "identity-obj-proxy",
    "typeface-roboto": "identity-obj-proxy",
  },
  bail: true,
};
