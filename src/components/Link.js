import React from "react";
import PropTypes from "prop-types";
import useTheme from "../hooks/useTheme";
import useContainer from "../hooks/useContainer";

export const COLORS = [
  "highlight.blue.t100",
  "secondary.turquoise.t60",
  "secondary.lightBlue.t100"
];

export const DEFAULT_PROPS = {
  color: "highlight.blue.t100"
};

function Link(_props) {
  const props = { ...DEFAULT_PROPS, ..._props };
  const { href, newTab, children } = props;
  const theme = useTheme();
  const { linkColor } = useContainer();
  const color =
    !COLORS.includes(_props.color) && linkColor ? linkColor : props.color;
  const css = {
    ...theme.link,
    ...theme[`link.${color}`],
    ":focus": theme["link:focus"],
    ":hover": theme[`link.${color}:hover`],
    ":active": theme[`link.${color}:active`]
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
  color: PropTypes.oneOf(COLORS),
  href: PropTypes.string.isRequired,
  newTab: PropTypes.bool.isRequired,
  children: PropTypes.node
};

export default Link;
