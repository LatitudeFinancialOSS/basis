import tokens from "./tokens";

export default theme => ({
  "loadingIcon.small": {
    circleRadius: tokens.sizes[1]
  },
  "loadingIcon.medium": {
    circleRadius: tokens.sizes[2]
  },
  "loadingIcon.large": {
    circleRadius: tokens.sizes[3]
  },
  "loadingIcon.highlight.blue.t100": {
    color: theme.colors.highlight.blue.t100
  },
  "loadingIcon.white": {
    color: theme.colors.white
  }
});
