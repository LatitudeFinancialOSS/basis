import tokens from "./tokens";

export default theme => ({
  "container.header::after": {
    content: "''",
    display: "block",
    height: tokens.borderWidths[1],
    boxShadow: theme.shadows.header
  }
});
