/**
 * For react-error-overlay disabling see: https://github.com/gatsbyjs/gatsby/issues/20420
 * This is used by webpack alias in gatsby-node.js
 */

module.exports = {
  setEditorHandler: () => {},
  reportBuildError: () => {},
  reportRuntimeError: () => {},
  dismissBuildError: () => {},
  startReportingRuntimeErrors: () => {},
  dismissRuntimeErrors: () => {},
  stopReportingRuntimeErrors: () => {},
};
