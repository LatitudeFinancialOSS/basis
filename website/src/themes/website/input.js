export default (theme) => {
  return {
    getCSS: ({ targetElement }) => {
      switch (targetElement) {
        case "inputContainer": {
          return {
            position: "relative",
            fontSize: theme.fontSizes[0],
            fontWeight: theme.fontWeights.light,
            lineHeight: theme.lineHeights[1],
            fontFamily: theme.fonts.body,
            color: theme.colors.black,
          };
        }

        case "input": {
          return {
            boxSizing: "border-box",
            width: "100%",
            height: "32px",
            margin: 0,
            paddingTop: 0,
            paddingBottom: 0,
            fontSize: "inherit",
            fontWeight: "inherit",
            lineHeight: "inherit",
            fontFamily: "inherit",
            color: theme.colors.grey.t65,
            backgroundColor: "transparent",
            padding: `0 ${theme.space[2]}`,
            borderRadius: theme.radii[1],
            borderWidth: theme.borderWidths[0],
            borderStyle: "solid",
            borderColor: theme.colors.grey.t30,
            ":focus": {
              outline: 0,
              color: theme.colors.black,
              borderColor: theme.colors.black,
              borderRadius: theme.radii[0],
              boxShadow: theme.shadows.focus,
            },
            ":hover": {
              color: theme.colors.black,
              borderColor: theme.colors.black,
            },
          };
        }

        default: {
          return null;
        }
      }
    },
  };
};
