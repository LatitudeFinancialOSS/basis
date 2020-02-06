import tokens from "./tokens";

export default theme => ({
  selectInput: {
    display: "inline-block",
    fontSize: tokens.fontSizes[1],
    fontWeight: tokens.fontWeights.light,
    lineHeight: tokens.lineHeights[2],
    fontFamily: tokens.fonts.body,
    color: theme.colors.black,
    height: tokens.sizes[11],
    paddingLeft: tokens.space[4],
    paddingRight: tokens.space[10],
    margin: 0,
    border: 0,
    borderRadius: 0,
    appearance: "none",
    backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='32' height='32' viewBox='0 0 32 32' role='img' aria-label='Triangle down'%3E%3Cpath d='M20.747 14.509l-4.181 4.25a.786.786 0 01-1.132 0l-4.179-4.247a.885.885 0 01-.231-.827c.07-.3.287-.536.569-.62.282-.084 8.607-.101 8.912.035a.86.86 0 01.495.802.874.874 0 01-.253.607z' fill='%23414141'%3E%3C/path%3E%3C/svg%3E")`,
    backgroundRepeat: "no-repeat",
    backgroundPosition: `right ${tokens.space[2]} top 50%`,
    alignSelf: "flex-start"
  },
  "selectInput.fullWidth": {
    alignSelf: "auto"
  },
  "selectInput:focus": {
    outline: 0,
    borderRadius: tokens.radii[0],
    boxShadow: theme.shadows.focus
  },
  "selectInput.default": {
    backgroundColor: theme.colors.grey.t05
  },
  "selectInput.default:focus": {
    backgroundColor: theme.colors.grey.t05
  },
  "selectInput.white": {
    backgroundColor: theme.colors.white
  }
});
