export default (theme, { getColor }) => {
  return {
    getCSS: ({ color, __internal__focus }) => {
      const focusStyle = {
        outline: 0,
        borderRadius: theme.radii[0],
        boxShadow: theme.shadows.focus,
      };

      return {
        boxSizing: "border-box",
        width: "100%",
        minHeight: "60px",
        resize: "vertical",
        border: 0,
        margin: 0,
        fontSize: theme.fontSizes[1],
        fontWeight: theme.fontWeights.light,
        lineHeight: theme.lineHeights[2],
        fontFamily: theme.fonts.body,
        color: theme.colors.black,
        backgroundColor: getColor(color),
        padding: `${theme.space[2]} ${theme.space[4]}`,
        ":focus": focusStyle,
        ...(__internal__focus && focusStyle),
      };
    },
  };
};
