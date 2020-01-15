import tokens from "../tokens";

export default {
  stepper: {
    display: "flex"
  },
  "stepper.item": {
    paddingTop: tokens.space[4],
    paddingBottom: tokens.space[4]
  },
  "stepper.itemLabelContainer": {
    display: "flex",
    height: tokens.sizes[5]
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
    height: tokens.sizes[2],
    top: `calc(50% - ${parseInt(tokens.sizes[2], 10) / 2}px)`,
    backgroundColor: tokens.colors.white
  },
  "stepper.progress.right": {
    position: "absolute",
    left: "50%",
    width: "50%",
    height: tokens.sizes[2],
    top: `calc(50% - ${parseInt(tokens.sizes[2], 10) / 2}px)`,
    backgroundColor: tokens.colors.white
  },
  "stepper.progress.completed": {
    backgroundColor: tokens.colors.primary.blue.t100
  },
  "stepper.itemContent": {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    width: "100%",
    height: tokens.sizes[9],
    marginTop: tokens.space[2],
    position: "relative"
  },
  "stepper.itemCircle": {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    width: tokens.sizes[9],
    height: tokens.sizes[9],
    borderRadius: tokens.radii[3],
    backgroundColor: tokens.colors.white,
    color: tokens.colors.black,
    boxSizing: "border-box",
    flexShrink: 0,
    zIndex: 1
  },
  "stepper.itemCircle.minor": {
    width: tokens.sizes[5],
    height: tokens.sizes[5]
  },
  "stepper.itemCircle.current": {
    border: `${tokens.borderWidths[1]} solid ${tokens.colors.primary.blue.t100}`
  },
  "stepper.itemCircle.previous": {
    backgroundColor: tokens.colors.primary.blue.t100
  }
};
