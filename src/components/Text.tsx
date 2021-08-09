import React from "react";
import useBackground from "../hooks/useBackground";
import { useMergedProps } from "../hooks/useMergedProps";
import useResponsivePropsCSS from "../hooks/useResponsivePropsCSS";
import useTextStyle from "../hooks/useTextStyle";
import { Color } from "../themes/types";
import { OneOf, ResponsiveProp } from "../types";
import { TEXT_ALIGNS, TEXT_STYLES } from "../utils/constants";
import { hasOwnProperty } from "../utils/core";
import { responsiveMargin, responsiveTextStyle } from "../utils/css";

const AS = ["h1", "h2", "h3", "h4", "h5", "h6", "p"] as const;
const COLORS = [
  "black",
  "white",
  "grey.t75",
  "primary.blue.t100",
  "highlight.blue.t100",
  "conditional.positive.text",
  "conditional.negative.text",
] as const;
const ALIGNS = TEXT_ALIGNS;

const allowedColors = [
  {
    textStyles: [
      "hero",
      "heading1",
      "heading2",
      "heading3",
      "heading4",
      "heading5",
      "heading6",
    ],
    allowedColors: ["black", "white", "primary.blue.t100"],
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
      "conditional.negative.text",
    ],
  },
  {
    textStyles: ["overline"],
    allowedColors: [
      "black",
      "white",
      "grey.t75",
      "primary.blue.t100",
      "highlight.blue.t100",
    ],
  },
] as const;

function getInheritedColor(backgroundColor: Color | undefined) {
  return backgroundColor === "primary.blue.t100" ? "white" : "black";
}

const DEFAULT_PROPS = {
  as: "p",
  textStyle: "body1",
  color: "black",
  align: "inherit",
  wrap: true,
} as const;

Text.AS = AS;
Text.TEXT_STYLES = TEXT_STYLES;
Text.COLORS = COLORS;
Text.ALIGNS = ALIGNS;
Text.allowedColors = allowedColors;
Text.DEFAULT_PROPS = DEFAULT_PROPS;

type BaseTextProps = {
  id?: string;
  as?: OneOf<typeof AS>;
  align?: OneOf<typeof ALIGNS>;
  wrap?: boolean;
  role?: string;
  children: React.ReactNode;
  testId?: string;
} & ResponsiveProp<"margin", string>;

type ConstraintTextProp<
  T extends readonly any[],
  U extends readonly any[]
> = BaseTextProps & {
  color?: OneOf<T>;
} & ResponsiveProp<"textStyle", OneOf<U>>;

type TextProps =
  | ConstraintTextProp<
      typeof allowedColors[0]["allowedColors"],
      typeof allowedColors[0]["textStyles"]
    >
  | ConstraintTextProp<
      typeof allowedColors[1]["allowedColors"],
      typeof allowedColors[1]["textStyles"]
    >
  | ConstraintTextProp<
      typeof allowedColors[2]["allowedColors"],
      typeof allowedColors[2]["textStyles"]
    >;

function Text(props: TextProps) {
  const { textStyle: inheritedTextStyle } = useTextStyle();
  const { bgMap } = useBackground();
  const inheritedProps = inheritedTextStyle && {
    textStyle: inheritedTextStyle,
  };
  const mergedProps = useMergedProps(props, {
    ...DEFAULT_PROPS,
    ...inheritedProps,
  });

  const { id, as, align, wrap, role, children, testId } = mergedProps;
  const css = useResponsivePropsCSS(mergedProps, DEFAULT_PROPS, {
    color: (_, theme, bp) => {
      const color =
        hasOwnProperty(props, "color") && hasOwnProperty(mergedProps, "color")
          ? mergedProps.color
          : getInheritedColor(bgMap?.[bp]);

      return theme.text.getCSS({
        color,
        wrap,
        align,
      });
    },
    margin: responsiveMargin,
    textStyle: responsiveTextStyle,
  });
  const Component = as;

  return (
    <Component id={id} css={css} role={role} data-testid={testId}>
      {children}
    </Component>
  );
}

export default Text;
