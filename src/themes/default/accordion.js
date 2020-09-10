export default (theme, { getColor, getTextStyle }) => {
  function getContentColor(headerColor) {
    return headerColor === "grey.t07"
      ? "grey.t03"
      : headerColor === "secondary.lightBlue.t25"
      ? "secondary.lightBlue.t15"
      : "white";
  }

  return {
    getContentColor,
    getCSS: ({
      targetElement,
      color,
      textColor,
      itemGap,
      isOpen,
      __internal__keyboardFocus,
    }) => {
      switch (targetElement) {
        case "headerContainer": {
          return {
            margin: 0,
          };
        }

        case "headerButton": {
          return {
            display: "flex",
            alignItems: "center",
            width: "100%",
            border: 0,
            borderRadius: theme.radii[0],
            boxSizing: "border-box",
            padding: `${theme.space[3]} ${theme.space[4]} ${theme.space[3]} ${theme.space[6]}`,
            textAlign: "left",
            ...getTextStyle({ name: "subtitle2", mode: "self-bold" }),
            outline: 0,
            ...theme.focusStyles.focusVisible,
            ...(__internal__keyboardFocus && theme.focusStyles.__keyboardFocus),
            backgroundColor: getColor(color),
            color: getColor(textColor),
          };
        }

        case "headerContent": {
          return {
            display: "flex",
            alignItems: "center",
            flexGrow: 1,
          };
        }

        case "headerIcon": {
          return {
            display: "flex",
            marginRight: theme.space[2],
          };
        }

        case "headerChevron": {
          return {
            display: "flex",
            transformOrigin: "50% 50%",
            transition: "transform .25s ease",
            ...(isOpen && {
              transform: "translateZ(0) rotate(180deg)",
            }),
          };
        }

        case "content": {
          return {
            textAlign: "left",
            backgroundColor: getColor(getContentColor(color)),
            padding: `${theme.space[4]} ${theme.space[11]} ${theme.space[4]} ${theme.space[6]}`,
          };
        }

        case "item": {
          return {
            ":not(:first-of-type)": {
              marginTop:
                itemGap === "small"
                  ? "1px" // This is an exception to our space scale
                  : theme.space[1],
            },
          };
        }

        default: {
          return null;
        }
      }
    },
  };
};
