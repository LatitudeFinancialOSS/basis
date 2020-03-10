import { rgba } from "polished";

export default theme => ({
  link: {
    textDecoration: "none",
    borderRadius: theme.radii[0],
    ...theme.focusStyles.focusVisible
  },
  "link.light-bg": {
    fontFamily: theme.fonts.body,
    fontWeight: theme.fontWeights.light,
    borderBottomWidth: theme.borderWidths[0],
    borderBottomStyle: "solid",
    transition: theme.transitions.link,
    color: theme.colors.primary.blue.t100,
    borderBottomColor: rgba(theme.colors.primary.blue.t100, 0.5),
    ":hover": {
      borderBottomColor: theme.colors.primary.blue.t100,
      backgroundColor: theme.colors.secondary.lightBlue.t25
    },
    ":active": {
      borderBottomColor: theme.colors.primary.blue.t100,
      backgroundColor: theme.colors.secondary.lightBlue.t25
    }
  },
  "link.medium-bg": {
    fontFamily: theme.fonts.body,
    fontWeight: theme.fontWeights.light,
    borderBottomWidth: theme.borderWidths[0],
    borderBottomStyle: "solid",
    transition: theme.transitions.link,
    color: theme.colors.primary.blue.t100,
    borderBottomColor: rgba(theme.colors.primary.blue.t100, 0.5),
    ":hover": {
      borderBottomColor: theme.colors.primary.blue.t100,
      backgroundColor: theme.colors.white
    },
    ":active": {
      borderBottomColor: theme.colors.primary.blue.t100,
      backgroundColor: theme.colors.white
    }
  },
  "link.dark-bg": {
    fontFamily: theme.fonts.body,
    fontWeight: theme.fontWeights.light,
    borderBottomWidth: theme.borderWidths[0],
    borderBottomStyle: "solid",
    transition: theme.transitions.link,
    color: theme.colors.secondary.lightBlue.t25,
    borderBottomColor: rgba(theme.colors.secondary.lightBlue.t25, 0.5),
    ":hover": {
      borderBottomColor: theme.colors.secondary.lightBlue.t25,
      backgroundColor: theme.colors.primary.blue.b40
    },
    ":active": {
      borderBottomColor: theme.colors.secondary.lightBlue.t25,
      backgroundColor: theme.colors.primary.blue.b40
    }
  },
  "link.icon": {
    display: "flex"
  }
});
