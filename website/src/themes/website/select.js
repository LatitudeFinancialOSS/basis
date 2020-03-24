export default (theme) => ({
  selectInput: {
    display: "inline-block",
    fontSize: theme.fontSizes[0],
    lineHeight: theme.lineHeights[0],
    fontFamily: theme.fonts.body,
    fontWeight: theme.fontWeights.light,
    height: "32px",
    paddingLeft: theme.space[3],
    paddingRight: theme.space[9],
    margin: 0,
    borderRadius: theme.radii[1],
    borderWidth: theme.borderWidths[0],
    borderStyle: "solid",
    appearance: "none",
    backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='32' height='32' viewBox='0 0 32 32' role='img' aria-label='Triangle down'%3E%3Cpath d='M20.747 14.509l-4.181 4.25a.786.786 0 01-1.132 0l-4.179-4.247a.885.885 0 01-.231-.827c.07-.3.287-.536.569-.62.282-.084 8.607-.101 8.912.035a.86.86 0 01.495.802.874.874 0 01-.253.607z' fill='%23414141'%3E%3C/path%3E%3C/svg%3E")`,
    backgroundRepeat: "no-repeat",
    backgroundPosition: `right 0 top 50%`,
    alignSelf: "flex-start",
    transition: "color 100ms ease, border-color 100ms ease",
  },
  "selectInput.fullWidth": {
    alignSelf: "auto",
  },
  "selectInput:focus": {
    outline: 0,
  },
  "selectInput.default": {
    color: theme.colors.grey.t65,
    backgroundColor: "transparent",
    borderColor: theme.colors.grey.t30,
  },
  "selectInput.default:focus": {
    color: theme.colors.black,
    borderColor: theme.colors.black,
  },
  "selectInput.default:hover": {
    color: theme.colors.black,
    borderColor: theme.colors.black,
  },
  "selectInput.default:active": {
    color: theme.colors.black,
    borderColor: theme.colors.black,
  },
});
