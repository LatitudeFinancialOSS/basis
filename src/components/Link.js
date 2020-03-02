import React, { useContext } from "react";
import PropTypes from "prop-types";
import { LinkContext } from "../providers/LinkProvider";
import useTheme from "../hooks/useTheme";
import useBackground from "../hooks/useBackground";
import {
  responsiveMarginType,
  responsivePaddingType
} from "../hooks/useResponsiveProp";
import useResponsivePropsCSS from "../hooks/useResponsivePropsCSS";
import { responsiveMargin, responsivePadding } from "../utils/css";
import { mergeProps } from "../utils/component";

const VARIANTS = ["text", "icon"];
const COLORS = [
  "primary.blue.t100",
  "secondary.turquoise.t60",
  "secondary.lightBlue.t100"
];

const DEFAULT_PROPS = {
  variant: "text",
  color: "primary.blue.t100"
};

Link.VARIANTS = VARIANTS;
Link.COLORS = COLORS;
Link.DEFAULT_PROPS = DEFAULT_PROPS;

function Link(props) {
  const theme = useTheme();
  const { background } = useBackground();
  const inheritedColor =
    background === "primary.blue.t100"
      ? "secondary.turquoise.t60"
      : "primary.blue.t100";
  const inheritedProps = {
    color: inheritedColor
  };
  const mergedProps = mergeProps(props, DEFAULT_PROPS, inheritedProps, {
    variant: variant => VARIANTS.includes(variant),
    color: color => COLORS.includes(color),
    newTab: newTab => typeof newTab === "boolean"
  });
  const {
    variant,
    color,
    href,
    newTab,
    title,
    children,
    testId,
    __internal__keyboardFocus,
    __internal__hover,
    __internal__active
  } = mergedProps;
  const { InternalLink, isLinkInternal } = useContext(LinkContext);
  const responsivePropsCSS = useResponsivePropsCSS(mergedProps, DEFAULT_PROPS, {
    margin: responsiveMargin,
    padding: responsivePadding
  });
  const colorStr = color === DEFAULT_PROPS.color ? "default" : color;
  const css = {
    ...theme.link,
    ...theme[`link.${variant}`],
    ...theme[`link.${variant}.${colorStr}`],
    ":focus": theme["link:focus"],
    ":focus-visible": theme["link:focus-visible"],
    ...(__internal__keyboardFocus && {
      ...theme["link:focus"],
      ...theme["link:focus-visible"]
    }),
    ":hover": theme[`link.${variant}.${colorStr}:hover`],
    ...(__internal__hover && theme[`link.${variant}.${colorStr}:hover`]),
    ":active": theme[`link.${variant}.${colorStr}:active`],
    ...(__internal__active && theme[`link.${variant}.${colorStr}:active`]),
    ...responsivePropsCSS
  };
  const newTabProps = newTab
    ? {
        target: "_blank",
        rel: "noopener" // See: https://twitter.com/addyosmani/status/1234055782896979968?s=20, https://developers.google.com/web/tools/lighthouse/audits/noopener
      }
    : {};

  if (!newTab && InternalLink && isLinkInternal(href)) {
    /*
      Note: We assume here that InternalLink respects the following contract:

        - It gets a `className` prop, which gets applies to the rendered <a>.
        - It gets a `to` prop, which gets mapped to <a>'s `href` prop.
        - It gets a `title` prop which is set on the rendered <a>.
        - It gets a `data-testid` prop which is set on the rendered <a>.
        - It gets a `children` prop, which gets rendered as <a>'s `children`.

      Example: Gatsby `Link` component.
    */
    return (
      <InternalLink css={css} to={href} title={title} data-testid={testId}>
        {children}
      </InternalLink>
    );
  }

  return (
    <a
      css={css}
      href={href}
      title={title}
      data-testid={testId}
      {...newTabProps}
    >
      {children}
    </a>
  );
}

Link.propTypes = {
  ...responsiveMarginType,
  ...responsivePaddingType,
  variant: PropTypes.oneOf(VARIANTS),
  color: PropTypes.oneOf(COLORS),
  href: PropTypes.string.isRequired,
  newTab: PropTypes.bool.isRequired,
  title: PropTypes.string,
  children: PropTypes.node,
  testId: PropTypes.string,
  __internal__keyboardFocus: PropTypes.bool,
  __internal__hover: PropTypes.bool,
  __internal__active: PropTypes.bool
};

export default Link;
