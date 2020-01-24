import React, { useContext } from "react";
import PropTypes from "prop-types";
import { LinkContext } from "../providers/LinkProvider";
import useTheme from "../hooks/useTheme";
import useContainer from "../hooks/useContainer";
import {
  responsiveMarginType,
  responsivePaddingType
} from "../hooks/useResponsiveProp";
import useResponsivePropsCSS from "../hooks/useResponsivePropsCSS";
import { responsiveMargin, responsivePadding } from "../utils/css";

export const COLORS = [
  "primary.blue.t100",
  "secondary.turquoise.t60",
  "secondary.lightBlue.t100"
];

export const DEFAULT_PROPS = {
  color: "primary.blue.t100"
};

function Link(_props) {
  const props = { ...DEFAULT_PROPS, ..._props };
  const {
    href,
    newTab,
    children,
    __internal__keyboardFocus,
    __internal__hover,
    __internal__active
  } = props;
  const { InternalLink, isLinkInternal } = useContext(LinkContext);
  const theme = useTheme();
  const { linkColor } = useContainer();
  const responsivePropsCSS = useResponsivePropsCSS(props, DEFAULT_PROPS, {
    margin: responsiveMargin,
    padding: responsivePadding
  });
  const color =
    !COLORS.includes(_props.color) && linkColor ? linkColor : props.color;
  const colorStr = color === DEFAULT_PROPS.color ? "default" : color;
  const css = {
    ...theme.link,
    ...theme[`link.${colorStr}`],
    ":focus": theme["link:focus"],
    ":focus-visible": theme["link:focus-visible"],
    ...(__internal__keyboardFocus && {
      ...theme["link:focus"],
      ...theme["link:focus-visible"]
    }),
    ":hover": theme[`link.${colorStr}:hover`],
    ...(__internal__hover && theme[`link.${colorStr}:hover`]),
    ":active": theme[`link.${colorStr}:active`],
    ...(__internal__active && theme[`link.${colorStr}:active`]),
    ...responsivePropsCSS
  };
  const newTabProps = newTab
    ? {
        target: "_blank",
        rel: "noopener" // See: https://developers.google.com/web/tools/lighthouse/audits/noopener
      }
    : {};

  if (!newTab && InternalLink && isLinkInternal(href)) {
    /*
      Note: We assume here that InternalLink respects the following contract:

        - It gets a `className` prop, which gets applies to the rendered <a>.
        - It gets a `to` prop, which gets mapped to <a>'s `href` prop.
        - It gets a `children` prop, which gets rendered as <a>'s `children`.

      Example: Gatsby `Link` component.
    */
    return (
      <InternalLink css={css} to={href}>
        {children}
      </InternalLink>
    );
  }

  return (
    <a css={css} href={href} {...newTabProps}>
      {children}
    </a>
  );
}

Link.propTypes = {
  ...responsiveMarginType,
  ...responsivePaddingType,
  color: PropTypes.oneOf(COLORS),
  href: PropTypes.string.isRequired,
  newTab: PropTypes.bool.isRequired,
  children: PropTypes.node,
  __internal__keyboardFocus: PropTypes.bool,
  __internal__hover: PropTypes.bool,
  __internal__active: PropTypes.bool
};

export default Link;
