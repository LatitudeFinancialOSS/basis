export default (theme, { getColor }) => {
  return {
    getCSS: ({ targetElement, color, isOneLine, showCircle, isChecked }) => {
      switch (targetElement) {
        case "radio": {
          return {
            display: "flex",
            flexDirection: "column",
          };
        }

        case "radioInput": {
          return {
            ...theme.focusStyles.focusVisibleAdjacentLabel,
            ":checked + label": {
              backgroundColor: theme.colors.secondary.lightBlue.t25,
              color: theme.colors.primary.blue.t100,
            },
          };
        }

        case "radioLabel": {
          return {
            display: "inline-flex",
            alignItems: "center",
            paddingLeft: theme.space[4],
            paddingRight: theme.space[4],
            height: "48px",
            fontSize: theme.fontSizes[1],
            fontWeight: theme.fontWeights.light,
            lineHeight: theme.lineHeights[2],
            fontFamily: theme.fonts.body,
            color: theme.colors.black,
            backgroundColor: getColor(color),
            overflow: "hidden",
            borderRadius: theme.radii[0],
            ...(isOneLine &&
              !showCircle && {
                justifyContent: "center",
              }),
          };
        }

        case "circleSvg": {
          return {
            flexShrink: 0,
            width: "24px",
            height: "24px",
            marginRight: theme.space[3],
          };
        }

        case "outerCircle": {
          return {
            fill: getColor(
              color === "grey.t05" || isChecked
                ? "white"
                : "secondary.lightBlue.t25"
            ),
          };
        }

        case "innerCircle": {
          return {
            fill: theme.colors.primary.blue.t100,
          };
        }

        default: {
          return null;
        }
      }
    },
  };
};
