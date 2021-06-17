import { BasisTheme, CheckboxTheme, ThemeHelpers } from "../types";

export default (
  theme: Pick<
    BasisTheme,
    | "space"
    | "fontSizes"
    | "fontWeights"
    | "lineHeights"
    | "fonts"
    | "colors"
    | "radii"
    | "focusStyles"
  >,
  { getColor }: ThemeHelpers
): CheckboxTheme => {
  return {
    getCSS: (options) => {
      switch (options.targetElement) {
        case "container": {
          return {
            display: "flex",
            flexDirection: "column",
            flex: 1,
          };
        }

        case "input": {
          return {
            ...theme.focusStyles.focusVisibleAdjacentLabel,
            ":checked + label": {
              backgroundColor: theme.colors.secondary.lightBlue.t25,
              color: theme.colors.primary.blue.t100,
            },
          };
        }

        case "label": {
          return {
            display: "inline-flex",
            alignItems: "flex-start",
            padding: `${theme.space[3]} ${theme.space[4]}`,
            minHeight: "24px",
            fontSize: theme.fontSizes[1],
            fontWeight: theme.fontWeights.light,
            lineHeight: theme.lineHeights[2],
            fontFamily: theme.fonts.body,
            color: theme.colors.black,
            backgroundColor: getColor(options.color),
            borderRadius: theme.radii[0],
            ...(options.__internal__keyboardFocus &&
              theme.focusStyles.__keyboardFocusAdjacentLabel),
          };
        }

        case "svg": {
          return {
            flexShrink: 0,
            width: "24px",
            height: "24px",
            marginRight: theme.space[3],
          };
        }

        case "svgRect": {
          return {
            fill: getColor(
              options.color === "grey.t05" || options.isChecked
                ? "white"
                : "secondary.lightBlue.t25"
            ),
          };
        }

        case "svgPath": {
          return {
            stroke: theme.colors.primary.blue.t100,
          };
        }

        default: {
          return {};
        }
      }
    },
  };
};
