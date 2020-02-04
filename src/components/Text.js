import React from "react";
import PropTypes from "prop-types";
import useTheme from "../hooks/useTheme";
import {
  responsivePropType,
  responsiveMarginType
} from "../hooks/useResponsiveProp";
import useResponsivePropsCSS from "../hooks/useResponsivePropsCSS";
import useTextStyle from "../hooks/useTextStyle";
import useBackground from "../hooks/useBackground";
import { responsiveMargin, responsiveTextStyle } from "../utils/css";
import { mergeProps } from "../utils/component";

const AS = ["h1", "h2", "h3", "h4", "h5", "h6", "p"];
const TEXT_STYLES = [
  "hero",
  "heading1",
  "heading2",
  "heading3",
  "heading4",
  "heading5",
  "heading6",
  "subtitle1",
  "subtitle2",
  "body1",
  "body2",
  "legal",
  "overline"
];
const COLORS = [
  "black",
  "white",
  "grey.t75",
  "primary.blue.t100",
  "highlight.blue.t100",
  "conditional.positive.text",
  "conditional.negative.text"
];
const ALIGNS = ["inherit", "left", "center", "right"];

const allowedColors = [
  {
    textStyles: [
      "hero",
      "heading1",
      "heading2",
      "heading3",
      "heading4",
      "heading5",
      "heading6"
    ],
    allowedColors: ["black", "white", "primary.blue.t100"]
  },
  {
    textStyles: ["subtitle1", "subtitle2", "body1", "body2", "legal"],
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
    textStyles: ["overline"],
    allowedColors: [
      "black",
      "white",
      "grey.t75",
      "primary.blue.t100",
      "highlight.blue.t100"
    ]
  }
];

const DEFAULT_PROPS = {
  as: "p",
  textStyle: "body1",
  color: "black",
  align: "inherit",
  wrap: true
};

Text.AS = AS;
Text.TEXT_STYLES = TEXT_STYLES;
Text.COLORS = COLORS;
Text.ALIGNS = ALIGNS;
Text.allowedColors = allowedColors;
Text.DEFAULT_PROPS = DEFAULT_PROPS;

function Text(props) {
  const theme = useTheme();
  const { textStyle: inheritedTextStyle } = useTextStyle();
  const { background } = useBackground();
  const inheritedColor = background === "primary.blue.t100" ? "white" : "black";
  const inheritedProps = {
    textStyle: inheritedTextStyle,
    color: inheritedColor
  };
  const mergedProps = mergeProps(props, DEFAULT_PROPS, inheritedProps, {
    as: as => AS.includes(as),
    textStyle: textStyle => TEXT_STYLES.includes(textStyle),
    color: color => COLORS.includes(color),
    align: align => ALIGNS.includes(align),
    wrap: wrap => typeof wrap === "boolean"
  });
  const { as, color, align, wrap, children, testId } = mergedProps;
  const responsivePropsCSS = useResponsivePropsCSS(mergedProps, DEFAULT_PROPS, {
    margin: responsiveMargin,
    textStyle: responsiveTextStyle
  });
  const Component = as;
  const css = {
    ...theme.text,
    ...(!wrap && theme["text.noWrap"]),
    ...responsivePropsCSS,
    textAlign: align,
    color: theme.getColor(color)
  };

  return (
    <Component css={css} data-testid={testId}>
      {children}
    </Component>
  );
}

Text.propTypes = {
  ...responsiveMarginType,
  as: PropTypes.oneOf(AS),
  ...responsivePropType("textStyle", PropTypes.oneOf(TEXT_STYLES)),
  color: props => {
    allowedColors.forEach(({ textStyles, allowedColors }) => {
      if (
        textStyles.includes(props.textStyle) &&
        !allowedColors.includes(props.color)
      ) {
        return new Error(
          `Text: color="${props.color}" is not allowed for textStyle="${
            props.textStyle
          }". Must be one of: ${allowedColors.map(c => `"${c}"`).join(", ")}`
        );
      }
    });
  },
  align: PropTypes.oneOf(ALIGNS),
  wrap: PropTypes.bool,
  children: PropTypes.node,
  testId: PropTypes.string
};

export default Text;
