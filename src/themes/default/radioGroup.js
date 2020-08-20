export default (theme, { getColor, getTextStyle }) => {
  return {
    getCSS: ({ targetElement, color, isChecked }) => {
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
            alignItems: "flex-start",
            padding: `${theme.space[3]} ${theme.space[4]}`,
            minHeight: "24px",
            ...getTextStyle({ name: "body1", mode: "container" }),
            color: theme.colors.black,
            backgroundColor: getColor(color),
            borderRadius: theme.radii[0],
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

        case "description": {
          return {
            marginTop: theme.space[1],
          };
        }

        default: {
          return null;
        }
      }
    },
  };
};
