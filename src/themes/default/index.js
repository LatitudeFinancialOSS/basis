import accordion from "./accordion";
import button from "./button";
import checkbox from "./checkbox";
import container from "./container";
import field from "./field";
import grid from "./grid";
import input from "./input";
import link from "./link";
import list from "./list";
import radioGroup from "./radioGroup";
import select from "./select";
import stepper from "./stepper";
import text from "./text";
import textStyles from "./textStyles";

const theme = {
  // margin, padding
  space: [
    "0px", // 0
    "4px", // 1
    "8px", // 2
    "12px", // 3
    "16px", // 4
    "20px", // 5
    "24px", // 6
    "28px", // 7
    "32px", // 8
    "36px", // 9
    "40px", // 10
    "48px", // 11
    "56px", // 12
    "64px", // 13
    "72px", // 14
  ],
  fontSizes: [
    "14px", // 0
    "16px", // 1
    "18px", // 2
    "20px", // 3
    "24px", // 4
    "32px", // 5
    "40px", // 6
    "48px", // 7
    "104px", // 8
  ],
  lineHeights: [
    "20px", // 0
    "22px", // 1
    "24px", // 2
    "28px", // 3
    "36px", // 4
    "48px", // 5
    "56px", // 6
    "120px", // 7
  ],
  letterSpacings: {
    hero: "-2.28px",
    heading1: "-1.05px",
    heading2: "-0.88px",
    heading3: "-0.7px",
    heading4: "-0.52px",
    heading5: "-0.44px",
    heading6: "-0.35px",
    body: "0px",
    overline: "2.6px",
  },
  fonts: {
    heading: "'Montserrat', sans-serif",
    body: "'Roboto', sans-serif",
  },
  fontWeights: {
    light: 300,
    medium: 500,
    semiBold: 600,
    bold: 700,
  },
  colors: {
    black: "#000000",
    grey: {
      t75: "#414141",
      t65: "#595959",
      t30: "#b2b2b2",
      t16: "#d6d6d6",
      t10: "#e5e5e5",
      t07: "#ececec",
      t05: "#f2f2f2",
      t03: "#f8f8f8",
    },
    white: "#ffffff",
    primary: {
      blue: {
        b40: "#002a66",
        t100: "#0046aa",
        t80: "#336bbb",
        t60: "#7fa2d4",
        t30: "#b2c7e5",
        t10: "#e5ecf6",
      },
    },
    secondary: {
      lightBlue: {
        t100: "#63b8ff",
        t80: "#82c6ff",
        t60: "#b1dbff",
        t25: "#d8edff",
        t15: "#eff7ff",
      },
      pink: {
        t100: "#ff94ca",
        t80: "#ffa9d5",
        t60: "#ffc9e4",
        t30: "#ffdeef",
        t15: "#fff4f9",
      },
      purple: {
        t100: "#aba7f6",
        t80: "#bcb9f8",
        t60: "#d5d3fa",
        t30: "#e5e4fc",
        t15: "#f6f6fe",
      },
      turquoise: {
        t100: "#0fdbf3",
        t80: "#3fe2f5",
        t60: "#87edf9",
        t30: "#b7f4fb",
        t10: "#e7fbfd",
      },
    },
    highlight: {
      blue: {
        t100: "#006aff",
        t80: "#337ef8",
        t50: "#4693fa",
        t30: "#52a0fb",
        t15: "#54acff",
      },
      pink: {
        t100: "#c31b6c",
        t80: "#cf337f",
        t50: "#e1589b",
        t30: "#ed6fae",
        t15: "#f682bc",
      },
      purple: {
        t100: "#7a65d4",
        t80: "#8472db",
        t50: "#9386e5",
        t30: "#9c93ec",
        t15: "#a49df1",
      },
    },
    conditional: {
      positive: {
        graphics: "#1a8450",
        text: "#1b633c",
      },
      attention: {
        graphics: "#f9b845",
        text: "#414141",
      },
      negative: {
        graphics: "#cf000f",
        text: "#b3000c",
      },
    },
  },
  borderWidths: ["1px", "2px", "4px"],
  radii: ["1px", "4px", "12px", "50%"],
  breakpoints: {
    xs: "375px",
    sm: "576px",
    md: "768px",
    lg: "992px",
    xl: "1200px",
  },
  breakpointMaxWidths: {
    sm: "540px",
    md: "720px",
    lg: "960px",
    xl: "1140px",
  },
  transitions: {
    button: "background-color 150ms ease, color 150ms ease",
    link: "background-color 200ms ease-out, border-bottom-color 200ms ease-out",
    icon: "fill 200ms ease-out",
  },
  zIndices: {
    aboveNormalFlow: 1,
    stickyItem: 100,
  },
};

theme.textStyles = textStyles(theme);

theme.shadows = {
  header: `inset 0 ${theme.borderWidths[1]} 0 0 rgba(0, 0, 0, .05)`,
  focus: `0 0 0px ${theme.radii[1]} ${theme.colors.secondary.lightBlue.t80}`,
};

theme.focusStyles = {
  // https://github.com/WICG/focus-visible#backwards-compatibility
  focusVisible: {
    // Provide basic, default focus styles.
    ":focus": {
      outline: 0,
      boxShadow: theme.shadows.focus,
      // Make sure that the focus style sits above the surrounding elements with normal page flow
      position: "relative",
      zIndex: theme.zIndices.aboveNormalFlow,
    },
    // Remove default focus styles for mouse users ONLY if :focus-visible is supported on this platform.
    ":focus:not(:focus-visible)": {
      boxShadow: "none",
      position: "initial",
      zIndex: "initial",
    },
    // If :focus-visible is supported on this platform, provide enhanced focus styles for keyboard focus.
    ":focus-visible": {
      boxShadow: theme.shadows.focus,
      // Make sure that the focus style sits above the surrounding elements with normal page flow
      position: "relative",
      zIndex: theme.zIndices.aboveNormalFlow,
    },
  },
  focusVisibleAdjacentLabel: {
    ":focus + label": {
      boxShadow: theme.shadows.focus,
      // Make sure that the focus style sits above the surrounding elements with normal page flow
      position: "relative",
      zIndex: theme.zIndices.aboveNormalFlow,
    },
    ":focus:not(:focus-visible) + label": {
      boxShadow: "none",
      position: "initial",
      zIndex: "initial",
    },
    ":focus-visible + label": {
      boxShadow: theme.shadows.focus,
      // Make sure that the focus style sits above the surrounding elements with normal page flow
      position: "relative",
      zIndex: theme.zIndices.aboveNormalFlow,
    },
  },
};

theme.focusStyles.__keyboardFocus = {
  ...theme.focusStyles.focusVisible[":focus"],
  ...theme.focusStyles.focusVisible[":focus-visible"],
};

theme.focusStyles.__keyboardFocusAdjacentLabel = {
  ...theme.focusStyles.focusVisibleAdjacentLabel[":focus + label"],
  ...theme.focusStyles.focusVisibleAdjacentLabel[":focus-visible + label"],
};

export default {
  ...theme,
  ...accordion(theme),
  ...button(theme),
  ...checkbox(theme),
  ...container(theme),
  ...field(theme),
  ...grid(theme),
  ...input(theme),
  ...link(theme),
  ...list(theme),
  ...radioGroup(theme),
  ...select(theme),
  ...stepper(theme),
  ...text(theme),
};
