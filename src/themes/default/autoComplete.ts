import { CSSObject } from "@emotion/react";
import { AutoCompleteTheme, BasisTheme } from "../types";

export default (
  theme: Pick<
    BasisTheme,
    | "radii"
    | "space"
    | "focusStyles"
    | "zIndices"
    | "colors"
    | "borderWidths"
    | "textStyles"
  >
): AutoCompleteTheme => {
  return {
    getCSS: (options: CSSObject) => {
      switch (options.targetElement) {
        case "container": {
          return {
            position: "relative",
          };
        }

        case "searchIcon": {
          return {
            width: theme.space[11],
            height: theme.space[11],
            border: 0,
            background: "none",
            appearance: "none",
            cursor: "pointer",
          };
        }
        case "clearIcon": {
          return options.showClearIcon
            ? {
                width: theme.space[11],
                height: theme.space[11],
                border: 0,
                background: "none",
                appearance: "none",
                cursor: "pointer",
              }
            : { display: "none" };
        }

        case "ul": {
          return {
            padding: 0,
            position: "absolute",
            overflowX: "hidden",
            overflowY: "auto",
            margin: 0,
            borderTop: 0,
            zIndex: 1000,
            listStyle: "none",
            transition: "opacity .1s ease",
            borderRadius: theme.radii[0],
            minWidth: "200px",
            backgroundColor: "white",
            width: "100%",
          };
        }

        case "li": {
          return {
            display: "flex",
            justifyContent: "flex-start",
            alignItems: "center",
            border: `1px solid ${theme.colors.grey.t10}`,
            borderTop: "none",
            padding: `${theme.space[4]} ${theme.space[6]}`,
            cursor: "pointer",
            ...(options.isHighlighted && {
              backgroundColor: theme.colors.secondary.lightBlue.t25,
            }),
            borderRadius: theme.radii[0],
          };
        }

        case "listItemContent": {
          return theme.textStyles["body1"];
        }

        case "right": {
          return {
            display: "flex",
            position: "absolute",
            right: 0,
            marginTop: `-${theme.space[11]}`,
            alignItems: "center",
          };
        }

        default: {
          return {};
        }
      }
    },
  };
};
