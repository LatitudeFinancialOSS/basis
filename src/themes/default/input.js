export default (theme, { getColor }) => {
  return {
    getCSS: ({
      targetElement,
      variant,
      prefix,
      suffix,
      color,
      __internal__focus,
    }) => {
      const hasPrefix = ["numeric", "decimal"].includes(variant) && prefix;
      const hasSuffix = ["numeric", "decimal"].includes(variant) && suffix;

      switch (targetElement) {
        case "inputContainer": {
          return {
            position: "relative",
            fontSize: theme.fontSizes[1],
            fontWeight: theme.fontWeights.light,
            lineHeight: theme.lineHeights[2],
            fontFamily: theme.fonts.body,
            color: theme.colors.black,
            ...(hasPrefix && {
              "::before": {
                content: `"${prefix}"`,
                position: "absolute",
                top: "13px",
                left: theme.space[4],
              },
            }),
            ...(hasSuffix && {
              "::after": {
                content: `"${suffix}"`,
                position: "absolute",
                top: "13px",
                right: theme.space[4],
              },
            }),
          };
        }

        case "input": {
          const focusStyle = {
            outline: 0,
            borderRadius: theme.radii[0],
            boxShadow: theme.shadows.focus,
          };

          return {
            boxSizing: "border-box",
            width: "100%",
            height: "48px",
            border: 0,
            margin: 0,
            paddingTop: 0,
            paddingBottom: 0,
            fontSize: "inherit",
            fontWeight: "inherit",
            lineHeight: "inherit",
            fontFamily: "inherit",
            color: "inherit",
            backgroundColor: getColor(color),
            paddingLeft: hasPrefix
              ? `calc(${theme.space[4]} + ${prefix.length + 1}ch)`
              : theme.space[4],
            paddingRight: hasSuffix
              ? `calc(${theme.space[4]} + ${suffix.length + 1}ch)`
              : theme.space[4],
            ":focus": focusStyle,
            ...(__internal__focus && focusStyle),
          };
        }

        default: {
          return null;
        }
      }
    },
  };
};
