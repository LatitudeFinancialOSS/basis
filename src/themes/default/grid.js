import tokens from "../tokens";

export default {
  grid: {
    display: "grid",
    position: "relative"
  },
  gridItem: {
    /* 
      Don't add overflow: hidden here because it will hide the focus style 
      of the components that use Grid (e.g. TimeSpan, Frequency).
    */
    minWidth: 0 // This helps the RadioGroup items to shrink on narrow screens
  },
  gridOverlay: {
    position: "absolute",
    display: "grid",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    gridGap: "inherit",
    pointerEvents: "none"
  },
  gridOverlayItem: {
    border: `${tokens.borderWidths[0]} dotted`
  }
};
