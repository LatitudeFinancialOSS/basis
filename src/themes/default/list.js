export default theme => ({
  list: {
    margin: 0
  },
  // Unordered
  "list.unordered": {
    listStyleType: "none",
    paddingLeft: "1.25em"
  },
  "list.unordered.nested": {
    margin: "0.5em 0 1em"
  },
  "listItem.unordered": {
    position: "relative"
  },
  "listItem.unordered:before": {
    content: '""',
    width: "0.5em",
    height: "0.5em",
    backgroundColor: theme.colors.secondary.lightBlue.t100,
    borderRadius: theme.radii[3],
    position: "absolute",
    top: "0.5em",
    left: "-1.25em"
  },
  // Ordered
  "list.ordered": {
    listStyleType: "decimal",
    paddingLeft: "1em"
  },
  "list.ordered.nested": {
    listStyleType: "lower-alpha",
    margin: "0.5em 0 1em"
  },
  "list.ordered.nested.nested": {
    listStyleType: "lower-roman"
  },
  // Steps
  "list.steps": {
    listStyleType: "none",
    counterReset: "steps",
    padding: "0.25em 0 0.25em 2.5em"
  },
  "list.steps.nested": {
    margin: "1em 0 1.25em"
  },
  "listItem.steps": {
    position: "relative",
    counterIncrement: "steps",
    marginBottom: "1.4em"
  },
  "listItem.steps.last": {
    marginBottom: 0
  },
  "listItem.steps:before": {
    content: "counter(steps, decimal)",
    width: "2em",
    height: "2em",
    lineHeight: "2em",
    color: theme.colors.white,
    backgroundColor: theme.colors.primary.blue.t100,
    fontWeight: theme.fontWeights.medium,
    textAlign: "center",
    borderRadius: theme.radii[3],
    position: "absolute",
    top: "-0.25em",
    left: "-2.5em"
  },
  "listItem.steps.nested:before": {
    content: "counter(steps, lower-alpha)",
    color: theme.colors.black,
    backgroundColor: theme.colors.secondary.lightBlue.t100
  }
});
