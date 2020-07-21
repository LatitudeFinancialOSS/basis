import { rgba } from "polished";

export default (theme) => {
  function addStates(
    css,
    { hover, active, __internal__hover, __internal__active }
  ) {
    return {
      ...css,
      ":hover": hover,
      ...(__internal__hover && hover),
      ":active": active,
      ...(__internal__active && active),
    };
  }

  return {
    getCSS: ({
      variant,
      buttonTheme,
      __internal__keyboardFocus,
      __internal__hover,
      __internal__active,
    }) => {
      let css = {
        textDecoration: "none",
        lineHeight: "normal", // Without it, if link is placed inside an element with `display: inline-flex`, for example, the bottom-border will be further away from the text.
        borderRadius: theme.radii[0],
        outline: 0,
        ...theme.focusStyles.focusVisible,
        ...(__internal__keyboardFocus && theme.focusStyles.__keyboardFocus),
      };

      switch (variant) {
        case "light-bg": {
          css = addStates(
            {
              ...css,
              fontFamily: theme.fonts.body,
              fontWeight: theme.fontWeights.light,
              borderBottomWidth: theme.borderWidths[0],
              borderBottomStyle: "solid",
              transition: theme.transitions.link,
              color: theme.colors.primary.blue.t100,
              borderBottomColor: rgba(theme.colors.primary.blue.t100, 0.5),
            },
            {
              hover: {
                borderBottomColor: theme.colors.primary.blue.t100,
                backgroundColor: theme.colors.secondary.lightBlue.t25,
              },
              active: {
                borderBottomColor: theme.colors.primary.blue.t100,
                backgroundColor: theme.colors.secondary.lightBlue.t25,
              },
              __internal__hover,
              __internal__active,
            }
          );
          break;
        }

        case "medium-bg": {
          css = addStates(
            {
              ...css,
              fontFamily: theme.fonts.body,
              fontWeight: theme.fontWeights.light,
              borderBottomWidth: theme.borderWidths[0],
              borderBottomStyle: "solid",
              transition: theme.transitions.link,
              color: theme.colors.primary.blue.t100,
              borderBottomColor: rgba(theme.colors.primary.blue.t100, 0.5),
            },
            {
              hover: {
                borderBottomColor: theme.colors.primary.blue.t100,
                backgroundColor: theme.colors.white,
              },
              active: {
                borderBottomColor: theme.colors.primary.blue.t100,
                backgroundColor: theme.colors.white,
              },
              __internal__hover,
              __internal__active,
            }
          );
          break;
        }

        case "dark-bg": {
          css = addStates(
            {
              ...css,
              fontFamily: theme.fonts.body,
              fontWeight: theme.fontWeights.light,
              borderBottomWidth: theme.borderWidths[0],
              borderBottomStyle: "solid",
              transition: theme.transitions.link,
              color: theme.colors.secondary.lightBlue.t25,
              borderBottomColor: rgba(
                theme.colors.secondary.lightBlue.t25,
                0.5
              ),
            },
            {
              hover: {
                borderBottomColor: theme.colors.secondary.lightBlue.t25,
                backgroundColor: theme.colors.primary.blue.b40,
              },
              active: {
                borderBottomColor: theme.colors.secondary.lightBlue.t25,
                backgroundColor: theme.colors.primary.blue.b40,
              },
              __internal__hover,
              __internal__active,
            }
          );
          break;
        }

        case "icon": {
          css = {
            ...css,
            display: "inline-flex",
          };
          break;
        }

        case "primary-blue-button": {
          css = {
            ...buttonTheme.getCSS({
              variant: "primary",
              color: "highlight.blue.t100",
              __internal__keyboardFocus,
              __internal__hover,
              __internal__active,
            }),
            display: "inline-flex",
            alignItems: "center",
            textDecoration: "none",
            boxSizing: "border-box",
          };
          break;
        }

        case "primary-green-button": {
          css = {
            ...buttonTheme.getCSS({
              variant: "primary",
              color: "green",
              __internal__keyboardFocus,
              __internal__hover,
              __internal__active,
            }),
            display: "inline-flex",
            alignItems: "center",
            textDecoration: "none",
            boxSizing: "border-box",
          };
          break;
        }

        case "secondary-blue-button": {
          css = {
            ...buttonTheme.getCSS({
              variant: "secondary",
              color: "highlight.blue.t100",
              __internal__keyboardFocus,
              __internal__hover,
              __internal__active,
            }),
            display: "inline-flex",
            alignItems: "center",
            textDecoration: "none",
            boxSizing: "border-box",
          };
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
