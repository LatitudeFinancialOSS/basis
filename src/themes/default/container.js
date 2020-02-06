export default theme => ({
  "container.header::after": {
    content: "''",
    display: "block",
    height: theme.borderWidths[1],
    boxShadow: theme.shadows.header
  }
});
