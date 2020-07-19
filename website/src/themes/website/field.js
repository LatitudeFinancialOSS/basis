export default (theme) => {
  return {
    getCSS: ({ targetElement, fullWidth, disabled }) => {
      switch (targetElement) {
        case "fieldContainer": {
          return {
            display: "inline-flex",
            flexDirection: "column",
            position: "relative",
            ...(fullWidth && {
              display: "flex",
              width: "100%",
              minWidth: 0, // See: https://stackoverflow.com/a/36247448/247243
            }),
            ...(disabled && { opacity: 0.5 }),
          };
        }

        case "label": {
          return {
            display: "flex",
            fontFamily: theme.fonts.body,
            fontSize: theme.fontSizes[0],
            fontWeight: theme.fontWeights.medium,
            lineHeight: theme.lineHeights[1],
            color: theme.colors.grey.t65,
            marginBottom: theme.space[1],
          };
        }

        case "helpText": {
          return {
            padding: `${theme.space[1]} ${theme.space[1]} 0`,
          };
        }

        default: {
          return null;
        }
      }
    },
  };
};
