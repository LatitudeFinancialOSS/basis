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
    height: "20px"
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
    height: "8px",
    top: "calc(50% - 4px)",
    backgroundColor: theme.colors.white
  },
  "stepper.progress.right": {
    position: "absolute",
    left: "50%",
    width: "50%",
    height: "8px",
    top: "calc(50% - 4px)",
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
    height: "40px",
    marginTop: theme.space[2],
    position: "relative"
  },
  "stepper.itemCircle": {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    width: "40px",
    height: "40px",
    borderRadius: theme.radii[3],
    backgroundColor: theme.colors.white,
    color: theme.colors.black,
    boxSizing: "border-box",
    flexShrink: 0,
    zIndex: 1
  },
  "stepper.itemCircle.minor": {
    width: "20px",
    height: "20px"
  },
  "stepper.itemCircle.current": {
    border: `${theme.borderWidths[1]} solid ${theme.colors.primary.blue.t100}`
  },
  "stepper.itemCircle.previous": {
    backgroundColor: theme.colors.primary.blue.t100
  }
});
