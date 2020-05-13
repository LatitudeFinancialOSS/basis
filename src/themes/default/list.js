export default (theme) => ({
  list: {
    margin: 0,
  },
  // Unordered
  "list.unordered": {
    listStyleType: "none",
    paddingLeft: "1.25em",
  },
  "list.unordered.nested": {
    margin: "0.5em 0 1em",
  },
  "listItem.unordered": {
    position: "relative",
    "::before": {
      content: '""',
      width: "0.5em",
      height: "0.5em",
      backgroundColor: theme.colors.secondary.lightBlue.t100,
      borderRadius: theme.radii[3],
      position: "absolute",
      top: "0.5em",
      left: "-1.25em",
    },
  },
  "listItem.unordered.subtitle1": {
    ":not(:first-of-type)": {
      marginTop: theme.space[4],
    },
  },
  "listItem.unordered.subtitle2": {
    ":not(:first-of-type)": {
      marginTop: theme.space[3],
    },
  },
  "listItem.unordered.body1": {
    ":not(:first-of-type)": {
      marginTop: theme.space[2],
    },
  },
  "listItem.unordered.body2": {
    ":not(:first-of-type)": {
      marginTop: theme.space[2],
    },
  },
  // Ordered
  "list.ordered": {
    listStyleType: "none",
    counterReset: "ordered",
    paddingLeft: "1.25em",
  },
  "listItem.ordered.subtitle1": {
    ":not(:first-of-type)": {
      marginTop: theme.space[4],
    },
  },
  "listItem.ordered.subtitle2": {
    ":not(:first-of-type)": {
      marginTop: theme.space[3],
    },
  },
  "listItem.ordered.body1": {
    ":not(:first-of-type)": {
      marginTop: theme.space[2],
    },
  },
  "listItem.ordered.body2": {
    ":not(:first-of-type)": {
      marginTop: theme.space[2],
    },
  },
  "list.ordered.nested": {
    margin: "0.5em 0 1em",
  },
  "list.ordered.nested.nested": {},
  "listItem.ordered": {
    position: "relative",
    counterIncrement: "ordered",
    "::before": {
      content: 'counter(ordered, decimal) ". "',
      position: "absolute",
      top: 0,
      left: "-1.25em",
    },
  },
  "listItem.ordered.nested::before": {
    content: 'counter(ordered, lower-alpha) ". "',
  },
  "listItem.ordered.nested.nested::before": {
    content: 'counter(ordered, lower-roman) ". "',
  },
  // Steps
  "list.steps": {
    listStyleType: "none",
    counterReset: "steps",
    padding: "0.25em 0 0.25em 2.5em",
  },
  "list.steps.nested": {
    margin: "1em 0 1.25em",
  },
  "listItem.steps": {
    position: "relative",
    counterIncrement: "steps",
    marginBottom: "1.4em",
    ":last-of-type": {
      marginBottom: 0,
    },
    "::before": {
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
      left: "-2.5em",
    },
  },
  "listItem.steps.nested::before": {
    content: "counter(steps, lower-alpha)",
    color: theme.colors.black,
    backgroundColor: theme.colors.secondary.lightBlue.t100,
  },
});
