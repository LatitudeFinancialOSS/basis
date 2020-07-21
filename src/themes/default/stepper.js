export default (theme) => {
  return {
    getCSS: ({ targetElement, stepsCount, isMinor, isCurrent, isPrevious }) => {
      switch (targetElement) {
        case "container": {
          return {
            display: "flex",
          };
        }

        case "item": {
          return {
            paddingTop: theme.space[4],
            paddingBottom: theme.space[4],
            width: `${100 / stepsCount}%`,
          };
        }

        case "labelContainer": {
          return {
            display: "flex",
            height: "20px",
          };
        }

        case "label": {
          return {
            position: "relative",
            left: "50%",
            transform: "translateX(-50%)",
            whiteSpace: "nowrap",
          };
        }

        case "itemContent": {
          return {
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            width: "100%",
            height: "40px",
            marginTop: theme.space[2],
            position: "relative",
          };
        }

        case "progressLeft": {
          return {
            position: "absolute",
            left: 0,
            width: "50%",
            height: "8px",
            top: "calc(50% - 4px)",
            backgroundColor:
              isPrevious || isCurrent
                ? theme.colors.primary.blue.t100
                : theme.colors.white,
          };
        }

        case "progressRight": {
          return {
            position: "absolute",
            left: "50%",
            width: "50%",
            height: "8px",
            top: "calc(50% - 4px)",
            backgroundColor: isPrevious
              ? theme.colors.primary.blue.t100
              : theme.colors.white,
          };
        }

        case "circle": {
          return {
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
            zIndex: 1,
            ...(isMinor && {
              width: "20px",
              height: "20px",
            }),
            ...(isCurrent && {
              border: `${theme.borderWidths[1]} solid ${theme.colors.primary.blue.t100}`,
            }),
            ...(isPrevious && {
              backgroundColor: theme.colors.primary.blue.t100,
            }),
          };
        }

        default: {
          return null;
        }
      }
    },
  };
};
