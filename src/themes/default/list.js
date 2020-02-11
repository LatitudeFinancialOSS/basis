export default theme => ({
  list: {
    margin: 0
  },
  listItemMarkerContainer: {
    display: "flex",
    alignItems: "center"
  },
  // Unordered
  "list.unordered": {
    padding: 0,
    listStyleType: "none"
  },
  "listItem.unordered": {
    display: "flex",
    alignItems: "flex-start"
  },
  "listItemMarker.unordered": {
    backgroundColor: theme.colors.secondary.lightBlue.t100,
    borderRadius: theme.radii[3]
  },
  "listItemContent.unordered": {
    flexGrow: 1
  },
  // Ordered
  "list.ordered": {
    listStyleType: "decimal"
  },
  "list.ordered.nested": {
    listStyleType: "lower-alpha"
  },
  "list.ordered.nested.nested": {
    listStyleType: "lower-roman"
  },
  "list.ordered.subtitle1": {
    padding: `0 0 0 ${theme.space[6]}`
  },
  "list.ordered.subtitle2": {
    padding: `0 0 0 ${theme.space[5]}`
  },
  "list.ordered.body1": {
    padding: `0 0 0 ${theme.space[4]}`
  },
  "list.ordered.body2": {
    padding: `0 0 0 ${theme.space[4]}`
  },
  "listItemContent.ordered.subtitle1": {
    margin: `0 0 0 ${theme.space[2]}`
  },
  "listItemContent.ordered.subtitle2": {
    margin: `0 0 0 ${theme.space[1]}`
  },
  "listItemContent.ordered.body1": {
    margin: `0 0 0 ${theme.space[1]}`
  },
  "listItemContent.ordered.body2": {
    margin: `0 0 0 ${theme.space[1]}`
  },
  // Steps
  "list.steps": {
    padding: 0,
    listStyleType: "none"
  },
  "listItem.steps": {
    display: "flex",
    alignItems: "flex-start"
  },
  "listItemMarker.steps": {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    width: "32px",
    height: "32px",
    borderRadius: theme.radii[3],
    color: theme.colors.white,
    backgroundColor: theme.colors.primary.blue.t100,
    ...theme.textStyles.body2,
    ...theme.textStyles["body2.bold"]
  },
  "listItemMarker.steps.nested": {
    color: theme.colors.black,
    backgroundColor: theme.colors.secondary.lightBlue.t100
  },
  "listItemContent.steps": {
    flexGrow: 1
  }
});
