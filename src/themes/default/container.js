import tokens from "../tokens";

export default {
  container: {
    boxSizing: "border-box"
  },
  "container.hasBreakpointWidth": {
    marginLeft: "15px", // This is half of our special 30px columns gutter.
    marginRight: "15px"
  },
  "container.hasBreakpointWidth.sm": {
    maxWidth: tokens.sizes[16],
    marginLeft: "auto",
    marginRight: "auto"
  },
  "container.hasBreakpointWidth.md": {
    maxWidth: tokens.sizes[17]
  },
  "container.hasBreakpointWidth.lg": {
    maxWidth: tokens.sizes[18]
  },
  "container.hasBreakpointWidth.xl": {
    maxWidth: tokens.sizes[19]
  }
};
