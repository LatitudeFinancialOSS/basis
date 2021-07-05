import { CSSObject } from "@emotion/react";
import { BasisTheme, FieldTheme } from "../types";

export default (
  theme: Pick<
    BasisTheme,
    | "fonts"
    | "fontSizes"
    | "fontWeights"
    | "lineHeights"
    | "colors"
    | "space"
    | "borderWidths"
    | "radii"
  >
): FieldTheme => {
  return {
    getCSS: (options): CSSObject => {
      switch (options.targetElement) {
        case "fieldContainer": {
          return {
            display: "inline-flex",
            flexDirection: "column",
            position: "relative",
            ...(options.fullWidth && {
              display: "flex",
              width: "100%",
              minWidth: 0, // See: https://stackoverflow.com/a/36247448/247243
            }),
            ...(options.disabled && { opacity: 0.5 }),
          };
        }

        case "label": {
          return {
            display: "flex",
            fontFamily: theme.fonts.body,
            fontSize: theme.fontSizes[1],
            fontWeight: theme.fontWeights.medium,
            lineHeight: theme.lineHeights[2],
            color: theme.colors.grey.t75,
            marginBottom: theme.space[2],
          };
        }

        case "optionalTag": {
          return {
            alignSelf: "flex-end",
            fontSize: theme.fontSizes[0],
            lineHeight: theme.lineHeights[0],
            paddingLeft: theme.space[2],
            paddingRight: theme.space[2],
            border: `${theme.borderWidths[1]} solid ${theme.colors.grey.t75}`,
            borderRadius: theme.radii[2],
            opacity: 0.66,
            marginLeft: "auto",
          };
        }

        case "helpText": {
          return {
            paddingTop: theme.space[2],
          };
        }

        case "errorsContainer": {
          return {
            paddingTop: theme.space[1],
            borderTop: `${theme.borderWidths[2]} solid ${theme.colors.conditional.negative.graphics}`,
            zIndex: 1,
          };
        }

        default: {
          return {};
        }
      }
    },
  };
};
