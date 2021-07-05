import { BasisTheme, RadioGroupTheme, ThemeHelpers } from "../types";

export default (
  theme: Pick<BasisTheme, "focusStyles" | "colors" | "space" | "radii">,
  { getColor, getTextStyle }: ThemeHelpers
): RadioGroupTheme => {
  return {
    getCSS: (options) => {
      switch (options.targetElement) {
        case "radio": {
          return {
            display: "flex",
            flexDirection: "column",
            height: "100%",
          } as const;
        }

        case "radioInput": {
          return {
            ...theme.focusStyles.focusVisibleAdjacentLabel,
            ":checked + label": {
              backgroundColor: theme.colors.secondary.lightBlue.t25,
              color: theme.colors.primary.blue.t100,
            },
          } as const;
        }

        case "radioLabel": {
          return {
            display: "inline-flex",
            alignItems: "flex-start",
            padding: `${theme.space[3]} ${theme.space[4]}`,
            minHeight: "24px",
            height: "100%",
            ...getTextStyle({ name: "body1", mode: "container" }),
            color: theme.colors.black,
            backgroundColor: getColor(options.color),
            borderRadius: theme.radii[0],
          } as const;
        }

        case "circleSvg": {
          return {
            flexShrink: 0,
            width: "24px",
            height: "24px",
            marginRight: theme.space[3],
          } as const;
        }

        case "outerCircle": {
          return {
            fill: getColor(
              options.color === "grey.t05" || options.isChecked
                ? "white"
                : "secondary.lightBlue.t25"
            ),
          } as const;
        }

        case "innerCircle": {
          return {
            fill: theme.colors.primary.blue.t100,
          } as const;
        }

        case "description": {
          return {
            marginTop: theme.space[1],
          } as const;
        }

        default: {
          return {};
        }
      }
    },
  };
};
