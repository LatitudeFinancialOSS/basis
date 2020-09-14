export default (theme) => {
  return {
    getCSS: ({ appearance }) => {
      let css = {
        display: "inline-block",
        textDecoration: "none",
        borderRadius: theme.radii[0],
        outline: 0,
        ...theme.focusStyles.focusVisible,
        fontFamily: "inherit",
        fontWeight: "inherit",
        color: "inherit",
        borderBottomColor: "inherit",
        ":hover, :active": {
          color: "inherit",
          borderBottomColor: "inherit",
        },
      };

      switch (appearance) {
        case "icon": {
          css = {
            ...css,
            display: "inline-block",
            verticalAlign: "top",
          };
          break;
        }

        default: {
          break;
        }
      }

      return css;
    },
  };
};
