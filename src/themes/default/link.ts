import { CSSObject } from "@emotion/react";
import { rgba } from "polished";
import { BasisTheme, LinkTheme } from "../types";

export default (
  theme: Pick<
    BasisTheme,
    | "radii"
    | "focusStyles"
    | "fonts"
    | "fontWeights"
    | "transitions"
    | "colors"
    | "borderWidths"
  >
): LinkTheme => {
  type StateOptions = {
    hover: CSSObject;
    active: CSSObject;
    __internal__hover: boolean;
    __internal__active: boolean;
  };

  function addStates(
    css: CSSObject,
    { hover, active, __internal__hover, __internal__active }: StateOptions
  ) {
    return {
      ...css,
      ":hover": hover,
      ...(__internal__hover && hover),
      ":active": active,
      ...(__internal__active && active),
    } as const;
  }

  function getButtonCSS(css: CSSObject) {
    return {
      ...css,
      display: "inline-flex",
      alignItems: "center",
      justifyContent: "center",
      textDecoration: "none",
      boxSizing: "border-box",
      width: "100%",
    } as const;
  }

  return {
    getCSS: (options) => {
      switch (options.targetElement) {
        case "anchor": {
          return {
            textDecoration: "none",
            borderRadius: theme.radii[1],
            outline: 0,
            display: ["primary-button", "secondary-button", "icon"].includes(
              options.appearance
            )
              ? "inline-flex"
              : null,
            verticalAlign: options.appearance === "icon" ? "top" : null,
            ...theme.focusStyles.focusVisible,
            ...(options.__internal__keyboardFocus &&
              theme.focusStyles.__keyboardFocus),
          } as const;
        }

        case "span": {
          const {
            variant,
            buttonTheme,
            appearance,
            __internal__active,
            __internal__hover,
          } = options;
          switch (variant) {
            case "light-bg": {
              return addStates(
                {
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
            }

            case "medium-bg": {
              return addStates(
                {
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
            }

            case "dark-bg": {
              return addStates(
                {
                  fontFamily: theme.fonts.body,
                  fontWeight: theme.fontWeights.light,
                  borderBottomWidth: theme.borderWidths[0],
                  borderBottomStyle: "solid",
                  transition: theme.transitions.link,
                  color: theme.colors.white,
                  borderBottomColor: rgba(theme.colors.white, 0.5),
                },
                {
                  hover: {
                    borderBottomColor: theme.colors.secondary.lightBlue.t25,
                    backgroundColor: rgba(theme.colors.black, 0.45),
                  },
                  active: {
                    borderBottomColor: theme.colors.secondary.lightBlue.t25,
                    backgroundColor: rgba(theme.colors.black, 0.45),
                  },
                  __internal__hover,
                  __internal__active,
                }
              );
            }

            case "blue-button": {
              return getButtonCSS(
                buttonTheme.getCSS({
                  targetElement: "button",
                  variant:
                    appearance === "primary-button" ? "primary" : "secondary",
                  color: "highlight.blue.t100",
                  __internal__hover,
                  __internal__active,
                })
              );
            }

            case "white-button": {
              return getButtonCSS(
                buttonTheme.getCSS({
                  targetElement: "button",
                  variant:
                    appearance === "primary-button" ? "primary" : "secondary",
                  color: "white",
                  __internal__hover,
                  __internal__active,
                })
              );
            }

            case "black-button": {
              return getButtonCSS(
                buttonTheme.getCSS({
                  targetElement: "button",
                  variant: "secondary",
                  color: "black",
                  __internal__hover,
                  __internal__active,
                })
              );
            }

            case "green-button": {
              return getButtonCSS(
                buttonTheme.getCSS({
                  targetElement: "button",
                  variant: "primary",
                  color: "green",
                  __internal__hover,
                  __internal__active,
                })
              );
            }

            default: {
              break;
            }
          }

          return {};
        }

        default: {
          return {};
        }
      }
    },
  };
};
