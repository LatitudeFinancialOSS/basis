import tokens from "./tokens";

export default _theme => ({
  list: {
    margin: 0
  },
  "list.ordered": {
    listStyleType: "decimal"
  },
  "list.ordered.nested": {
    listStyleType: "lower-alpha"
  },
  "list.unordered": {
    padding: 0,
    listStyleType: "none"
  },
  "list.ordered.subtitle1": {
    padding: `0 0 0 ${tokens.space[6]}`
  },
  "list.ordered.subtitle2": {
    padding: `0 0 0 ${tokens.space[5]}`
  },
  "list.ordered.body1": {
    padding: `0 0 0 ${tokens.space[4]}`
  },
  "list.ordered.body2": {
    padding: `0 0 0 ${tokens.space[4]}`
  },
  "listItem.unordered": {
    display: "flex",
    alignItems: "flex-start"
  },
  listItemMarkerContainer: {
    display: "flex",
    alignItems: "center"
  },
  "listItemMarker.unordered": {
    backgroundColor: tokens.colors.secondary.lightBlue.t100,
    borderRadius: tokens.radii[3]
  },
  "listItemContent.ordered.subtitle1": {
    margin: `0 0 0 ${tokens.space[2]}`
  },
  "listItemContent.ordered.subtitle2": {
    margin: `0 0 0 ${tokens.space[1]}`
  },
  "listItemContent.ordered.body1": {
    margin: `0 0 0 ${tokens.space[1]}`
  },
  "listItemContent.ordered.body2": {
    margin: `0 0 0 ${tokens.space[1]}`
  }
});
