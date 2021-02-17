export default (theme, { getTextStyle }) => {
  return {
    getCSS: ({ targetElement, type, variant, textStyle }) => {
      switch (targetElement) {
        case "list": {
          return {
            margin: 0,
            listStyleType: "none",
            ...(type === "unordered" && {
              paddingLeft: "1.25em",
            }),
            ...(type === "ordered" && {
              counterReset: "ordered",
              paddingLeft: "1.25em",
            }),
            ...(type === "steps" && {
              counterReset: "steps",
              padding: "0.25em 0 0.25em 2.5em",
            }),
            ...getTextStyle({ name: textStyle, mode: "container" }),
            color: theme.colors.black,
          };
        }

        case "item": {
          switch (type) {
            case "unordered": {
              return {
                position: "relative",
                ":not(:first-of-type)": {
                  marginTop:
                    textStyle === "subtitle1"
                      ? theme.space[4]
                      : textStyle === "subtitle2"
                      ? theme.space[3]
                      : theme.space[2],
                },
                "::before": {
                  content: '""',
                  width: "0.5em",
                  height: "0.5em",
                  borderRadius: theme.radii[3],
                  position: "absolute",
                  top: "0.5em",
                  left: "-1.25em",
                  backgroundColor:
                    variant === "danger"
                      ? theme.colors.conditional.negative.graphics
                      : theme.colors.secondary.lightBlue.t100,
                },
                "& ul, & ol": {
                  marginTop: "0.5em",
                },
                "&:not(:last-of-type) ul, &:not(:last-of-type) ol": {
                  marginBottom: "1em",
                },
              };
            }

            case "ordered": {
              return {
                position: "relative",
                counterIncrement: "ordered",
                ":not(:first-of-type)": {
                  marginTop:
                    textStyle === "subtitle1"
                      ? theme.space[4]
                      : textStyle === "subtitle2"
                      ? theme.space[3]
                      : theme.space[2],
                },
                "::before": {
                  content: 'counter(ordered, decimal) ". "',
                  position: "absolute",
                  top: 0,
                  left: "-1.25em",
                },
                "& ul, & ol": {
                  marginTop: "0.5em",
                },
                "&:not(:last-of-type) ul, &:not(:last-of-type) ol": {
                  marginBottom: "1em",
                },
                "& ol li::before": {
                  content: 'counter(ordered, lower-alpha) ". "',
                },
                "& ol ol li::before": {
                  content: 'counter(ordered, lower-roman) ". "',
                },
              };
            }

            case "steps": {
              return {
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
                "& ul, & ol": {
                  marginTop: "1em",
                },
                "&:not(:last-of-type) ul, &:not(:last-of-type) ol": {
                  marginBottom: "1.25em",
                },
                "& ol li::before": {
                  content: "counter(steps, lower-alpha)",
                  color: theme.colors.black,
                  backgroundColor: theme.colors.secondary.lightBlue.t100,
                },
              };
            }

            default: {
              return null;
            }
          }
        }

        default: {
          return null;
        }
      }
    },
  };
};
