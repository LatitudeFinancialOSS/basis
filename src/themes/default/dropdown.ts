import { BasisTheme, DropdownTheme, ThemeHelpers } from "../types";

export default (
  theme: Pick<
    BasisTheme,
    "radii" | "space" | "focusStyles" | "zIndices" | "colors" | "borderWidths"
  >,
  { getColor }: ThemeHelpers
): DropdownTheme => {
  return {
    getCSS: (options) => {
      switch (options.targetElement) {
        case "container": {
          return {
            position: "relative",
          } as const;
        }

        case "button": {
          return {
            display: "flex",
            alignItems: "center",
            boxSizing: "border-box",
            padding: theme.space[4],
            width: "100%",
            color: theme.colors.black,
            backgroundColor: getColor(options.color),
            textAlign: "left",
            margin: 0,
            border: 0,
            borderRadius: theme.radii[0],
            outline: 0,
            ...theme.focusStyles.focusVisible,
            ...(options.isPlaceholder && {
              padding: `${theme.space[2]} ${theme.space[4]}`,
            }),
            ...(options.__internal__focus && theme.focusStyles.__keyboardFocus),
            // See: https://stackoverflow.com/a/199319/247243
            "::-moz-focus-inner": {
              border: 0,
            },
          } as const;
        }

        case "buttonContent": {
          return {
            display: "flex",
            alignItems: "center",
            flexGrow: 1,
          } as const;
        }

        case "buttonChevron": {
          return {
            display: "flex",
            transformOrigin: "50% 50%",
            transition: "transform .25s ease",
          } as const;
        }

        case "options": {
          return {
            position: "absolute",
            width: "100%",
            margin: 0,
            padding: 0,
            backgroundColor: theme.colors.white,
            boxShadow: "0 2px 4px 0 rgba(0, 0, 0, 0.3)",
            overflowY: "auto",
            zIndex: theme.zIndices.dropdown,
            ":focus": {
              outline: 0,
            },
          } as const;
        }

        case "option": {
          return {
            listStyleType: "none",
            padding: theme.space[4],
            borderTop: `${theme.borderWidths[0]} solid ${theme.colors.grey.t10}`,
            cursor: "default",
            ...(options.isHighlighted && {
              backgroundColor: theme.colors.secondary.lightBlue.t25,
            }),
          } as const;
        }

        default: {
          return {};
        }
      }
    },
  };
};
