export default (theme) => ({
  grid: {
    display: "grid",
    position: "relative",
  },
  gridItem: {
    /* 
      Don't add overflow: hidden here because it will hide the focus style 
      of the components that use Grid (e.g. TimeSpan, Frequency).
    */
    minWidth: 0, // This helps the RadioGroup items to shrink on narrow screens
    /* 
      This helps in situations where Grid.Item has a vertical scrollbar. 
      Without setting `minHeight: 0`, if Grid.Item's height is 1fr, for example,
      the actual height would be greater than what you'd expect (lots of content 
      makes it go beyond the desired 1fr). 
    */
    minHeight: 0,
  },
  gridOverlay: {
    position: "absolute",
    display: "grid",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    gridGap: "inherit",
    pointerEvents: "none",
  },
  gridOverlayItem: {
    border: `${theme.borderWidths[0]} dotted`,
  },
});
