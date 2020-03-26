import textStyles from "./textStyles";

export default (theme) => ({
  "accordionItem.small": {
    ":not(:first-of-type)": {
      marginTop: "1px", // This is an exception to our space scale
    },
  },
  "accordionItem.large": {
    ":not(:first-of-type)": {
      marginTop: theme.space[1],
    },
  },
  accordionHeader: {
    margin: 0,
  },
  accordionHeaderButton: {
    display: "flex",
    alignItems: "center",
    width: "100%",
    border: 0,
    borderRadius: theme.radii[0],
    boxSizing: "border-box",
    padding: `${theme.space[3]} ${theme.space[4]} ${theme.space[3]} ${theme.space[6]}`,
    textAlign: "left",
    ...textStyles(theme)["subtitle2"],
    ...textStyles(theme)["subtitle2.bold"],
    ...theme.focusStyles.focusVisible,
  },
  accordionHeaderContent: {
    display: "flex",
    alignItems: "center",
    flexGrow: 1,
  },
  accordionHeaderIcon: {
    display: "flex",
    marginRight: theme.space[2],
  },
  accordionHeaderChevron: {
    display: "flex",
    transformOrigin: "50% 50%",
    transition: "transform .25s ease",
  },
  "accordionHeaderChevron.open": {
    transform: "translateZ(0) rotate(180deg)",
  },
  accordionContent: {
    padding: `${theme.space[4]} ${theme.space[11]} ${theme.space[4]} ${theme.space[6]}`,
  },
});
