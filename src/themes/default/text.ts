import { TextTheme, ThemeHelpers } from "../types";

export default (_theme: {}, { getColor }: ThemeHelpers): TextTheme => {
  return {
    getCSS: ({ color, align, wrap }) => {
      return {
        margin: 0,
        color: getColor(color),
        textAlign: align,
        ...(!wrap &&
          ({
            whiteSpace: "nowrap",
            overflow: "hidden",
            textOverflow: "ellipsis",
          } as const)),
      } as const;
    },
  };
};
