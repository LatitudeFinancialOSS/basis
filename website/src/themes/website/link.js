export default (theme) => ({
  link: {
    display: "inline-block",
    textDecoration: "none",
    borderRadius: theme.radii[0],
    ...theme.focusStyles.focusVisible,
  },
  "link.light-bg": {
    fontFamily: "inherit",
    fontWeight: "inherit",
    color: "inherit",
    borderBottomColor: "inherit",
    ":hover, :active": {
      color: "inherit",
      borderBottomColor: "inherit",
    },
  },
});
