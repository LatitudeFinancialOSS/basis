import React from "react";
import PropTypes from "prop-types";
import useTheme from "../hooks/useTheme";
import {
  responsivePropType,
  responsiveMarginType
} from "../hooks/useResponsiveProp";
import useResponsivePropsCSS from "../hooks/useResponsivePropsCSS";
import useContainer from "../hooks/useContainer";
import { responsiveMargin } from "../utils/css";

export const INTENTS = [
  "hero",
  "h1",
  "h2",
  "h3",
  "h4",
  "h5",
  "h6",
  "subtitle1",
  "subtitle2",
  "body1",
  "body2",
  "legal",
  "overline"
];
export const COLORS = [
  "black",
  "white",
  "grey.t75",
  "primary.blue.t100",
  "highlight.blue.t100",
  "conditional.positive.text",
  "conditional.negative.text"
];
export const ALIGNS = ["left", "center", "right"];
export const WEIGHTS = ["regular", "bold"];

export const allowedColors = [
  {
    intent: ["hero", "h1", "h2", "h3", "h4", "h5", "h6"],
    allowedColors: ["black", "white", "primary.blue.t100"]
  },
  {
    intent: ["subtitle1", "subtitle2", "body1", "body2", "legal"],
    allowedColors: [
      "black",
      "white",
      "grey.t75",
      "primary.blue.t100",
      "highlight.blue.t100",
      "conditional.positive.text",
      "conditional.negative.text"
    ]
  },
  {
    intent: ["overline"],
    allowedColors: [
      "black",
      "white",
      "grey.t75",
      "primary.blue.t100",
      "highlight.blue.t100"
    ]
  }
];

export const allowedWeights = [
  {
    intent: ["hero", "h1", "h2", "h3", "h4", "h5", "h6", "overline"],
    allowedWeights: ["regular"]
  },
  {
    intent: ["subtitle1", "subtitle2", "body1", "body2", "legal"],
    allowedWeights: ["regular", "bold"]
  }
];

export const DEFAULT_PROPS = {
  intent: "body1",
  weight: "regular",
  color: "black",
  align: "left",
  wrap: true
};

function Text(_props) {
  const props = { ...DEFAULT_PROPS, ..._props };
  const { intent, weight, align, wrap, children } = props;
  const theme = useTheme();
  const isHeader = ["h1", "h2", "h3", "h4", "h5", "h6"].includes(intent);
  const defaultSize = isHeader
    ? intent[1] // h1 => 1, h2 => 2, etc.
    : null;
  const responsivePropsCSS = useResponsivePropsCSS(props, {
    margin: responsiveMargin,
    size: {
      getCSS: value => {
        return isHeader ? theme[`text.size${value}`] : {};
      },
      defaultValue: defaultSize
    }
  });
  const Component = intent === "hero" ? "h1" : isHeader ? intent : "p";
  const { textColor } = useContainer();
  const color =
    !COLORS.includes(_props.color) && textColor ? textColor : props.color;
  const css = {
    ...theme.text,
    ...theme[`text.${intent}`],
    ...theme[`text.${intent}.${weight}`],
    ...theme[`text.${color}`],
    ...(!wrap && theme["text.noWrap"]),
    textAlign: align,
    "& strong": theme[`text.${intent}.bold`],
    "& b": theme[`text.${intent}.bold`],
    ...responsivePropsCSS
  };

  return <Component css={css}>{children}</Component>;
}

Text.propTypes = {
  intent: PropTypes.oneOf(INTENTS),
  ...responsiveMarginType,
  ...responsivePropType("size", (props, propName) => {
    if (typeof props[propName] === "undefined") {
      return;
    }

    if (
      typeof props[propName] !== "string" &&
      typeof props[propName] !== "number"
    ) {
      return new Error(
        `Text: ${propName} must be a string or a number. Found: ${typeof props[
          propName
        ]}.`
      );
    }

    if (!["h1", "h2", "h3", "h4", "h5", "h6"].includes(props.intent)) {
      return new Error(
        `Text: ${propName} is not allowed for intent="${props.intent}".`
      );
    }

    const intValue = Number(props[propName]);

    if (isNaN(intValue) || intValue < 1 || intValue > 6) {
      return new Error(
        `Text: ${propName} must be between 1 and 6. Found: ${props[propName]}.`
      );
    }
  }),
  weight: props => {
    allowedWeights.forEach(({ intent, allowedWeights }) => {
      if (
        intent.includes(props.intent) &&
        !allowedWeights.includes(props.weight)
      ) {
        return new Error(
          `Text: weight="${props.weight}" is not allowed for intent="${
            props.intent
          }". Must be one of: ${allowedWeights.map(w => `"${w}"`).join(", ")}`
        );
      }
    });
  },
  color: props => {
    allowedColors.forEach(({ intent, allowedColors }) => {
      if (
        intent.includes(props.intent) &&
        !allowedColors.includes(props.color)
      ) {
        return new Error(
          `Text: color="${props.color}" is not allowed for intent="${
            props.intent
          }". Must be one of: ${allowedColors.map(c => `"${c}"`).join(", ")}`
        );
      }
    });
  },
  align: PropTypes.oneOf(ALIGNS),
  wrap: PropTypes.bool,
  children: PropTypes.node
};

export default Text;
