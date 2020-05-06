export default (theme) => ({
  dropdownContainer: {
    position: "relative",
  },
  dropdownButton: {
    display: "flex",
    alignItems: "center",
    boxSizing: "border-box",
    padding: theme.space[4],
    width: "100%",
    color: theme.colors.black,
    textAlign: "left",
    margin: 0,
    border: 0,
    borderRadius: theme.radii[0],
    ...theme.textStyles.body1,
    ...theme.focusStyles.focusVisible,
  },
  dropdownButtonPlaceholder: {
    padding: `${theme.space[2]} ${theme.space[4]}`,
  },
  "dropdownButton.default": {
    backgroundColor: theme.colors.grey.t05,
  },
  "dropdownButton.white": {
    backgroundColor: theme.colors.white,
  },
  dropdownButtonContent: {
    display: "flex",
    alignItems: "center",
    flexGrow: 1,
  },
  dropdownButtonChevron: {
    display: "flex",
    transformOrigin: "50% 50%",
    transition: "transform .25s ease",
  },
  dropdownOptions: {
    position: "absolute",
    width: "100%",
    margin: 0,
    padding: 0,
    backgroundColor: theme.colors.white,
    boxShadow: "0 2px 4px 0 rgba(0, 0, 0, 0.3)",
    overflowY: "auto",
    zIndex: theme.zIndices.dropdown,
  },
  "dropdownOptions:focus": {
    outline: 0,
  },
  dropdownOption: {
    listStyleType: "none",
    padding: theme.space[4],
    borderTop: `${theme.borderWidths[0]} solid ${theme.colors.grey.t10}`,
    cursor: "default",
  },
  dropdownOptionHighlighted: {
    backgroundColor: theme.colors.secondary.lightBlue.t25,
  },
});
