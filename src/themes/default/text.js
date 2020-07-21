export default (theme, { getColor }) => {
  return {
    getCSS: ({ color, align, wrap }) => {
      return {
        margin: 0,
        color: getColor(color),
        textAlign: align,
        ...(!wrap && {
          whiteSpace: "nowrap",
          overflow: "hidden",
          textOverflow: "ellipsis",
        }),
      };
    },
  };
};
