const button = (theme) => {
  function addStates(css, { hover, active }) {
    return {
      ...css,
      ":hover:not(:disabled)": hover,
      ":active:not(:disabled)": active,
    };
  }

  return {
    getCSS: ({ targetElement, variant }) => {
      if (targetElement !== "button") {
        return {};
      }

      let css = {
        fontSize: theme.fontSizes[0],
        lineHeight: theme.lineHeights[0],
        fontFamily: theme.fonts.body,
        fontWeight: theme.fontWeights.medium,
        borderRadius: theme.radii[1],
        margin: 0,
        padding: `0 ${theme.space[4]}`,
        minHeight: "32px",
        overflow: "hidden",
        transition:
          "transform 100ms ease, color 100ms ease, border-color 100ms ease",
        ":disabled": {
          opacity: 0.4,
          cursor: "not-allowed",
        },
      };

      switch (variant) {
        case "secondary": {
          css = addStates(
            {
              ...css,
              color: theme.colors.grey.t65,
              backgroundColor: "transparent",
              borderWidth: theme.borderWidths[0],
              borderStyle: "solid",
              borderColor: theme.colors.grey.t30,
            },
            {
              hover: {
                color: theme.colors.black,
                borderColor: theme.colors.black,
              },
              active: {
                color: theme.colors.black,
                borderColor: theme.colors.black,
                transform: "scale(0.95)",
              },
            }
          );
          break;
        }

        case "icon": {
          css = addStates(
            {
              ...css,
              display: "flex",
              alignItems: "center",
              padding: `0 ${theme.space[1]}`,
              color: theme.colors.grey.t65,
              backgroundColor: "transparent",
              border: 0,
            },
            {
              hover: {
                color: theme.colors.black,
              },
            }
          );
          break;
        }

        default: {
          break;
        }
      }

      return css;
    },
  };
};

export default button;
