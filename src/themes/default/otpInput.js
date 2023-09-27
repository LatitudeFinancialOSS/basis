export default (theme, { getColor }) => {
  return {
    getCSS: ({ targetElement, color }) => {
      switch (targetElement) {
        case "inputContainer": {
          return {
            position: "relative",
            fontSize: theme.fontSizes[1],
            fontWeight: theme.fontWeights.light,
            lineHeight: theme.lineHeights[2],
            fontFamily: theme.fonts.body,
            color: theme.colors.black,
          };
        }

        case "input": {
          const focusStyle = {
            outline: 0,
            borderRadius: theme.radii[0],
            boxShadow: theme.shadows.focus,
          };

          return {
            textAlign: "center",
            boxSizing: "border-box",
            width: "100%",
            height: "48px",
            border: 0,
            margin: 0,
            paddingTop: 0,
            paddingBottom: 0,
            fontSize: "inherit",
            fontWeight: "inherit",
            lineHeight: "inherit",
            fontFamily: "inherit",
            color: "inherit",
            backgroundColor: getColor(color),
            ":focus": focusStyle,
          };
        }

        default: {
          return null;
        }
      }
    },
  };
};
