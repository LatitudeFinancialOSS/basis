import { CSSObject } from "@emotion/react";
import { AccordionTheme, BasisTheme, Color, ThemeHelpers } from "../types";

export default (
  theme: Pick<BasisTheme, "space" | "radii" | "focusStyles">,
  { getColor, getTextStyle }: ThemeHelpers
): AccordionTheme => {
  function getContentColor(headerColor: Color) {
    return headerColor === "grey.t07"
      ? "grey.t03"
      : headerColor === "secondary.lightBlue.t25"
      ? "secondary.lightBlue.t15"
      : "white";
  }

  return {
    getContentColor,
    getCSS: (options): CSSObject => {
      switch (options.targetElement) {
        case "headerContainer": {
          return {
            margin: 0,
          };
        }

        case "headerButton": {
          return {
            display: "flex",
            alignItems: "center",
            width: "100%",
            border: 0,
            borderRadius: theme.radii[0],
            boxSizing: "border-box",
            padding: `${theme.space[3]} ${theme.space[4]} ${theme.space[3]} ${theme.space[6]}`,
            textAlign: "left",
            ...getTextStyle({ name: "subtitle2", mode: "self-bold" }),
            outline: 0,
            ...theme.focusStyles.focusVisible,
            ...(options.__internal__keyboardFocus &&
              theme.focusStyles.__keyboardFocus),
            backgroundColor: getColor(options.color),
            color: getColor(options.textColor),
          };
        }

        case "headerContent": {
          return {
            display: "flex",
            alignItems: "center",
            flexGrow: 1,
          };
        }

        case "headerIcon": {
          return {
            display: "flex",
            marginRight: theme.space[2],
          };
        }

        case "headerChevron": {
          return {
            display: "flex",
            transformOrigin: "50% 50%",
            transition: "transform .25s ease",
            ...(options.isOpen && {
              transform: "translateZ(0) rotate(180deg)",
            }),
          };
        }

        case "content": {
          return {
            textAlign: "left",
            backgroundColor: getColor(getContentColor(options.color)),
            padding: `${theme.space[4]} ${theme.space[11]} ${theme.space[4]} ${theme.space[6]}`,
          };
        }

        case "item": {
          return {
            ":not(:first-of-type)": {
              marginTop:
                options.itemGap === "small"
                  ? "1px" // This is an exception to our space scale
                  : theme.space[1],
            },
          };
        }

        default: {
          return {};
        }
      }
    },
  };
};
