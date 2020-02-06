export default theme => ({
  stepper: {
    display: "flex"
  },
  "stepper.item": {
    paddingTop: theme.space[4],
    paddingBottom: theme.space[4]
  },
  "stepper.itemLabelContainer": {
    display: "flex",
    height: theme.sizes[5]
  },
  "stepper.itemLabel": {
    position: "relative",
    left: "50%",
    transform: "translateX(-50%)",
    whiteSpace: "nowrap"
  },
  "stepper.progress.left": {
    position: "absolute",
    left: 0,
    width: "50%",
    height: theme.sizes[2],
    top: `calc(50% - ${parseInt(theme.sizes[2], 10) / 2}px)`,
    backgroundColor: theme.colors.white
  },
  "stepper.progress.right": {
    position: "absolute",
    left: "50%",
    width: "50%",
    height: theme.sizes[2],
    top: `calc(50% - ${parseInt(theme.sizes[2], 10) / 2}px)`,
    backgroundColor: theme.colors.white
  },
  "stepper.progress.completed": {
    backgroundColor: theme.colors.primary.blue.t100
  },
  "stepper.itemContent": {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    width: "100%",
    height: theme.sizes[10],
    marginTop: theme.space[2],
    position: "relative"
  },
  "stepper.itemCircle": {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    width: theme.sizes[10],
    height: theme.sizes[10],
    borderRadius: theme.radii[3],
    backgroundColor: theme.colors.white,
    color: theme.colors.black,
    boxSizing: "border-box",
    flexShrink: 0,
    zIndex: 1
  },
  "stepper.itemCircle.minor": {
    width: theme.sizes[5],
    height: theme.sizes[5]
  },
  "stepper.itemCircle.current": {
    border: `${theme.borderWidths[1]} solid ${theme.colors.primary.blue.t100}`
  },
  "stepper.itemCircle.previous": {
    backgroundColor: theme.colors.primary.blue.t100
  }
});
