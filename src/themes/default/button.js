export default (theme) => {
  function addStates(
    css,
    { hover, active, disabled, __internal__hover, __internal__active }
  ) {
    return {
      ...css,
      ":hover:not(:disabled)": hover,
      ...(__internal__hover && hover),
      ":active:not(:disabled)": active,
      ...(__internal__active && active),
      ...(disabled && {
        ":disabled": {
          ...css[":disabled"],
          ...disabled,
        },
      }),
    };
  }

  return {
    getCSS: ({
      variant,
      color,
      __internal__keyboardFocus,
      __internal__hover,
      __internal__active,
    }) => {
      let css = {
        fontSize: theme.fontSizes[2],
        lineHeight: theme.lineHeights[3],
        fontFamily: theme.fonts.body,
        fontWeight: theme.fontWeights.medium,
        margin: 0,
        border: 0,
        padding: `0 ${theme.space[6]}`,
        minHeight: "48px",
        overflow: "hidden",
        transition: theme.transitions.button,
        borderRadius: theme.radii[1],
        outline: 0,
        ...theme.focusStyles.focusVisible,
        ...(__internal__keyboardFocus && theme.focusStyles.__keyboardFocus),
        ":disabled": {
          backgroundColor: theme.colors.grey.t30,
          color: theme.colors.grey.t75,
          opacity: 0.7,
          cursor: "not-allowed",
        },
      };

      switch (true) {
        case variant === "primary" && color === "highlight.blue.t100": {
          css = addStates(
            {
              ...css,
              backgroundColor: theme.colors.highlight.blue.t100,
              color: theme.colors.white,
            },
            {
              hover: {
                backgroundColor: theme.colors.primary.blue.t100,
                color: theme.colors.white,
              },
              active: {
                backgroundColor: theme.colors.primary.blue.t100,
                color: theme.colors.white,
              },
              __internal__hover,
              __internal__active,
            }
          );
          break;
        }

        case variant === "primary" && color === "white": {
          css = addStates(
            {
              ...css,
              backgroundColor: theme.colors.white,
              color: theme.colors.highlight.blue.t100,
            },
            {
              hover: {
                backgroundColor: theme.colors.secondary.lightBlue.t25,
                color: theme.colors.primary.blue.t100,
              },
              active: {
                backgroundColor: theme.colors.secondary.lightBlue.t25,
                color: theme.colors.primary.blue.t100,
              },
              __internal__hover,
              __internal__active,
            }
          );
          break;
        }

        case variant === "primary" && color === "green": {
          css = addStates(
            {
              ...css,
              backgroundColor: "#21a637",
              color: theme.colors.white,
            },
            {
              hover: {
                backgroundColor: "#007414",
                color: theme.colors.white,
              },
              active: {
                backgroundColor: "#007414",
                color: theme.colors.white,
              },
              __internal__hover,
              __internal__active,
            }
          );
          break;
        }

        case variant === "secondary" && color === "highlight.blue.t100": {
          css = addStates(
            {
              ...css,
              backgroundColor: "transparent",
              color: theme.colors.highlight.blue.t100,
              borderWidth: theme.borderWidths[0],
              borderStyle: "solid",
              borderColor: theme.colors.highlight.blue.t100,
            },
            {
              hover: {
                backgroundColor: theme.colors.highlight.blue.t100,
                color: theme.colors.white,
              },
              active: {
                backgroundColor: theme.colors.highlight.blue.t100,
                color: theme.colors.white,
              },
              disabled: {
                borderColor: theme.colors.grey.t65,
              },
              __internal__hover,
              __internal__active,
            }
          );
          break;
        }

        case variant === "secondary" && color === "black": {
          css = addStates(
            {
              ...css,
              backgroundColor: "transparent",
              color: theme.colors.black,
              borderWidth: theme.borderWidths[0],
              borderStyle: "solid",
              borderColor: theme.colors.black,
            },
            {
              hover: {
                backgroundColor: theme.colors.highlight.blue.t100,
                color: theme.colors.white,
                borderColor: theme.colors.highlight.blue.t100,
              },
              active: {
                backgroundColor: theme.colors.highlight.blue.t100,
                color: theme.colors.white,
                borderColor: theme.colors.highlight.blue.t100,
              },
              disabled: {
                borderColor: theme.colors.grey.t65,
              },
              __internal__hover,
              __internal__active,
            }
          );
          break;
        }

        case variant === "secondary" && color === "white": {
          css = addStates(
            {
              ...css,
              backgroundColor: "transparent",
              color: theme.colors.white,
              borderWidth: theme.borderWidths[0],
              borderStyle: "solid",
              borderColor: theme.colors.white,
            },
            {
              hover: {
                backgroundColor: theme.colors.white,
                color: theme.colors.highlight.blue.t100,
              },
              active: {
                backgroundColor: theme.colors.white,
                color: theme.colors.highlight.blue.t100,
              },
              disabled: {
                backgroundColor: theme.colors.grey.t30,
              },
              __internal__hover,
              __internal__active,
            }
          );
          break;
        }

        case variant === "icon": {
          css = addStates(
            {
              ...css,
              display: "flex",
              alignItems: "center",
              padding: `0 ${theme.space[2]}`,
              backgroundColor: "transparent",
            },
            {
              hover: {
                backgroundColor: theme.colors.grey.t10,
              },
              active: {
                backgroundColor: theme.colors.grey.t10,
              },
              __internal__hover,
              __internal__active,
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
