import { BasisTheme, InputTheme, ThemeHelpers } from "../types";

export default (
  theme: Pick<
    BasisTheme,
    | "fontSizes"
    | "fontWeights"
    | "lineHeights"
    | "fonts"
    | "colors"
    | "space"
    | "shadows"
    | "radii"
  >,
  { getColor }: ThemeHelpers
): InputTheme => {
  return {
    getCSS: (options) => {
      const hasPrefix =
        ["numeric", "decimal"].includes(options.variant) && options.prefix;
      const hasSuffix =
        ["numeric", "decimal"].includes(options.variant) && options.suffix;

      switch (options.targetElement) {
        case "inputContainer": {
          return {
            position: "relative",
            fontSize: theme.fontSizes[1],
            fontWeight: theme.fontWeights.light,
            lineHeight: theme.lineHeights[2],
            fontFamily: theme.fonts.body,
            color: theme.colors.black,
            ...(hasPrefix && {
              "::before": {
                content: `"${options.prefix}"`,
                position: "absolute",
                top: "13px",
                left: theme.space[4],
              },
            }),
            ...(hasSuffix && {
              "::after": {
                content: `"${options.suffix}"`,
                position: "absolute",
                top: "13px",
                right: theme.space[4],
              },
            }),
          } as const;
        }

        case "input": {
          const focusStyle = {
            outline: 0,
            borderRadius: theme.radii[0],
            boxShadow: theme.shadows.focus,
          } as const;

          return {
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
            backgroundColor: getColor(options.color),
            paddingLeft:
              hasPrefix && options.prefix
                ? `calc(${theme.space[4]} + ${options.prefix.length + 1}ch)`
                : theme.space[4],
            paddingRight:
              hasSuffix && options.suffix
                ? `calc(${theme.space[4]} + ${options.suffix.length + 1}ch)`
                : theme.space[4],
            ":focus": focusStyle,
            ...(options.__internal__focus && focusStyle),
          } as const;
        }

        default: {
          return {};
        }
      }
    },
  };
};
