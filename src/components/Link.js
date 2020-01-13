import React from "react";
import PropTypes from "prop-types";
import useTheme from "../hooks/useTheme";
import useContainer from "../hooks/useContainer";
import { responsiveMarginType } from "../hooks/useResponsiveProp";
import useResponsivePropsCSS from "../hooks/useResponsivePropsCSS";
import { responsiveMargin } from "../utils/css";

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
  const { href, newTab, children } = props;
  const theme = useTheme();
  const { linkColor } = useContainer();
  const responsivePropsCSS = useResponsivePropsCSS(props, {
    margin: responsiveMargin
  });
  const color =
    !COLORS.includes(_props.color) && linkColor ? linkColor : props.color;
  const colorStr = color === DEFAULT_PROPS.color ? "default" : color;
  const css = {
    ...theme.link,
    ...theme[`link.${colorStr}`],
    ":focus": theme["link:focus"],
    ":focus-visible": theme["link:focus-visible"],
    ":hover": theme[`link.${colorStr}:hover`],
    ":active": theme[`link.${colorStr}:active`],
    ...responsivePropsCSS
  };
  const newTabProps = newTab
    ? {
        target: "_blank",
        rel: "noopener" // See: https://developers.google.com/web/tools/lighthouse/audits/noopener
      }
    : {};

  return (
    <a css={css} href={href} {...newTabProps}>
      {children}
    </a>
  );
}

Link.propTypes = {
  ...responsiveMarginType,
  color: PropTypes.oneOf(COLORS),
  href: PropTypes.string.isRequired,
  newTab: PropTypes.bool.isRequired,
  children: PropTypes.node
};

export default Link;
