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
        typeof options.prefix === "string" && options.prefix.length > 0;
      const hasSuffix =
        typeof options.suffix === "string" && options.suffix.length > 0;

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

          let paddingRight =
            hasSuffix && options.suffix
              ? `calc(${theme.space[4]} + ${options.suffix.length + 1}ch)`
              : theme.space[4];

          paddingRight =
            options.isLoading && options.hasSuffixButton
              ? "84px"
              : paddingRight; // Auto complete with loading
          paddingRight =
            !options.isLoading && options.hasSuffixButton
              ? theme.space[11]
              : paddingRight; // Auto complete without loading

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
            paddingRight,
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
