export default (theme) => {
  return {
    getCSS: ({ variant }) => {
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

      switch (variant) {
        case "icon": {
          css = {
            ...css,
            display: "inline-flex",
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
