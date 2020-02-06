import tokens from "./tokens";

export default {
  "container.header::after": {
    content: "''",
    display: "block",
    height: tokens.borderWidths[1],
    boxShadow: tokens.shadows.header
  }
};
