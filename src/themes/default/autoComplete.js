export default (
  theme
  // , { getColor }
) => {
  return {
    getCSS: ({
      targetElement,
      // color,
      // isPlaceholder,
      isHighlighted,
      isOpen,
      __internal__focus,
    }) => {
      switch (targetElement) {
        case "container": {
          return {
            position: "relative",
          };
        }

        case "searchIcon": {
          return {
            width: theme.space[11],
            height: theme.space[11],
            border: 0,
            background: "none",
            appearance: "none",
            cursor: "pointer",
          };
        }

        case "ul": {
          return {
            padding: 0,
            position: "absolute",
            overflowX: "hidden",
            overflowY: "auto",
            // margin: ${hasError ? "-25px 0 0" : "0"},
            margin: 0,
            borderTop: 0,
            zIndex: 1000,
            listStyle: "none",
            transition: "opacity .1s ease",
            borderRadius: "0 0 0.28571429rem 0.28571429rem",
            boxShadow: "0 2px 3px 0 rgba(34,36,38,.15)",
            ...(isOpen ? { border: "1px solid #e5e5e5" } : { border: 0 }),
            minWidth: "200px",
            backgroundColor: "white",
            width: "100%",
          };
        }

        case "li": {
          return {
            display: "flex",
            justifyContent: "flex-start",
            alignItems: "center",
            border: "1px solid #e5e5e5",
            borderTop: "none",
            height: "56px",
            padding: "16px 24px",
            cursor: "pointer",
            ...(isHighlighted && {
              backgroundColor: theme.colors.secondary.lightBlue.t25,
            }),
            borderRadius: "0 0 0.28571429re3 0.28571429rem",
          };
        }

        case "right": {
          return {
            display: "flex",
            position: "absolute",
            right: 0,
            marginTop: `-${theme.space[11]}`,
            alignItems: "center",
          };
        }

        default: {
          return null;
        }
      }
    },
  };
};
