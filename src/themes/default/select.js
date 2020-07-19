export default (theme, { getColor }) => {
  return {
    getCSS: ({ color, fullWidth, __internal__focus }) => {
      const focusStyle = {
        outline: 0,
        borderRadius: theme.radii[0],
        boxShadow: theme.shadows.focus,
      };

      return {
        display: "inline-block",
        fontSize: theme.fontSizes[1],
        fontWeight: theme.fontWeights.light,
        lineHeight: theme.lineHeights[2],
        fontFamily: theme.fonts.body,
        color: theme.colors.black,
        width: fullWidth ? "100%" : null,
        height: "48px",
        paddingLeft: theme.space[4],
        paddingRight: theme.space[10],
        margin: 0,
        border: 0,
        borderRadius: 0,
        appearance: "none",
        backgroundColor: getColor(color),
        backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='32' height='32' viewBox='0 0 32 32' role='img' aria-label='Triangle down'%3E%3Cpath d='M20.747 14.509l-4.181 4.25a.786.786 0 01-1.132 0l-4.179-4.247a.885.885 0 01-.231-.827c.07-.3.287-.536.569-.62.282-.084 8.607-.101 8.912.035a.86.86 0 01.495.802.874.874 0 01-.253.607z' fill='%23000'%3E%3C/path%3E%3C/svg%3E")`,
        backgroundRepeat: "no-repeat",
        backgroundPosition: `right ${theme.space[4]} top 50%`,
        alignSelf: "flex-start",
        // See: https://stackoverflow.com/a/19451423/247243
        ":-moz-focusring": {
          color: "transparent",
          textShadow: "0 0 0 #000",
        },
        ":focus": focusStyle,
        ...(__internal__focus && focusStyle),
      };
    },
  };
};
