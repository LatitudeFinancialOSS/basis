const tokens = {
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
      t03: "#f8f8f8"
    },
    white: "#ffffff",
    primary: {
      blue: {
        t100: "#0046aa",
        t80: "#336bbb",
        t60: "#7fa2d4",
        t30: "#b2c7e5",
        t10: "#e5ecf6"
      }
    },
    secondary: {
      lightBlue: {
        t100: "#63b8ff",
        t80: "#82c6ff",
        t60: "#b1dbff",
        t30: "#d0e9ff",
        t15: "#eff7ff"
      },
      pink: {
        t100: "#ff94ca",
        t80: "#ffa9d5",
        t60: "#ffc9e4",
        t30: "#ffdeef",
        t15: "#fff4f9"
      },
      purple: {
        t100: "#aba7f6",
        t80: "#bcb9f8",
        t60: "#d5d3fa",
        t30: "#e5e4fc",
        t15: "#f6f6fe"
      },
      turquoise: {
        t100: "#0fdbf3",
        t80: "#3fe2f5",
        t60: "#87edf9",
        t30: "#b7f4fb",
        t10: "#e7fbfd"
      }
    },
    highlight: {
      blue: {
        t100: "#006aff",
        t80: "#337ef8",
        t50: "#4693fa",
        t30: "#52a0fb",
        t15: "#54acff"
      },
      pink: {
        t100: "#c31b6c",
        t80: "#cf337f",
        t50: "#e1589b",
        t30: "#ed6fae",
        t15: "#f682bc"
      },
      purple: {
        t100: "#7a65d4",
        t80: "#8472db",
        t50: "#9386e5",
        t30: "#9c93ec",
        t15: "#a49df1"
      }
    },
    conditional: {
      positive: {
        graphics: "#1a8450",
        text: "#1b633c"
      },
      attention: {
        graphics: "#f9b845",
        text: "#414141"
      },
      negative: {
        graphics: "#cf000f",
        text: "#b3000c"
      }
    }
  },
  fonts: {
    heading: "'Montserrat', sans-serif",
    body: "'Roboto', sans-serif"
  },
  fontWeights: {
    light: 300,
    medium: 500,
    semiBold: 600,
    bold: 700
  },
  fontSizes: [
    "14px", // 0
    "16px", // 1
    "18px", // 2
    "20px", // 3
    "24px", // 4
    "32px", // 5
    "40px", // 6
    "48px", // 7
    "104px" // 8
  ],
  lineHeights: [
    "20px", // 0
    "22px", // 1
    "24px", // 2
    "28px", // 3
    "36px", // 4
    "48px", // 5
    "56px", // 6
    "120px" // 7
  ],
  letterSpacings: {
    hero: "-2.28px",
    h1: "-1.05px",
    h2: "-0.88px",
    h3: "-0.7px",
    h4: "-0.52px",
    h5: "-0.44px",
    h6: "-0.35px",
    body: "0px",
    overline: "2.6px"
  },
  // width, height
  sizes: [
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
    "80px", // 15
    "96px", // 16
    "112px", // 17
    "160px", // 18
    "224px", // 19
    "320px" // 20
  ],
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
    "72px" // 14
  ],
  radii: ["1px", "4px", "12px", "50%"],
  borderWidths: ["1px", "2px", "4px"],
  transitions: {
    button: "background-color 150ms ease, color 150ms ease",
    link: "background-color 0.2s ease-out, border-bottom-color 0.2s ease-out",
    icon: "fill 0.2s ease-out"
  }
};

export default {
  ...tokens,
  shadows: {
    header: `inset 0 ${tokens.borderWidths[1]} 0 0 rgba(0, 0, 0, .05)`,
    focus: `0 0 0px ${tokens.radii[1]} ${tokens.colors.secondary.lightBlue.t80}`
  }
};
