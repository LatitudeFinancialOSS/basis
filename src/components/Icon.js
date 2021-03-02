import React from "react";
import PropTypes from "prop-types";
import useTheme from "../hooks/useTheme";

const NAMES = [
  "assistance",
  "arrow-back",
  "arrow-forward",
  "birthday",
  "blocking",
  "calculator",
  "call",
  "chevron-down",
  "chevron-left",
  "chevron-right",
  "chevron-up",
  "comparison",
  "critical",
  "cross-small",
  "cross",
  "devices",
  "document",
  "download",
  "duplicate",
  "edit",
  "external-link",
  "eye-hidden",
  "eye-visible",
  "face-id",
  "facebook",
  "fingerprint",
  "github",
  "hamburger",
  "home",
  "info-or-minor",
  "instagram",
  "link",
  "linkedin",
  "lock-small",
  "lock",
  "logout",
  "mail",
  "message",
  "notification-new",
  "notification",
  "overflow-menu",
  "payment",
  "person",
  "question",
  "search",
  "select-object",
  "shield",
  "stop",
  "stopwatch-alt",
  "stopwatch",
  "success",
  "tick-small",
  "tick",
  "time",
  "trash",
  "triangle-down",
  "triangle-up",
  "twitter",
  "warning-or-significant",
  "youtube",
];
const SIZES = ["24px", "32px"];
const COLORS = [
  "black",
  "grey.t75",
  "primary.blue.t100",
  "highlight.blue.t100",
  "conditional.positive.graphics",
  "conditional.negative.graphics",
  "white",
];
const HOVER_COLORS = [
  "black",
  "highlight.blue.t100",
  "secondary.lightBlue.t60",
];
const SECONDARY_COLORS = ["highlight.blue.t100"];

const DEFAULT_PROPS = {
  size: "32px",
  color: "grey.t75",
  secondaryColor: "highlight.blue.t100",
};

Icon.NAMES = NAMES;
Icon.SIZES = SIZES;
Icon.COLORS = COLORS;
Icon.HOVER_COLORS = HOVER_COLORS;
Icon.SECONDARY_COLORS = SECONDARY_COLORS;
Icon.DEFAULT_PROPS = DEFAULT_PROPS;

function Icon(_props) {
  const props = { ...DEFAULT_PROPS, ..._props };
  const { name, size, color, hoverColor, secondaryColor, testId } = props;
  const theme = useTheme();

  if (!NAMES.includes(name)) {
    return null;
  }

  const IconComponent = require(`../icons/${name}`).default;

  return (
    <IconComponent
      size={size}
      primaryColor={theme.getColor(color)}
      secondaryColor={theme.getColor(secondaryColor)}
      hoverColor={theme.getColor(hoverColor)}
      testId={testId}
    />
  );
}

Icon.propTypes = {
  name: PropTypes.oneOf(NAMES).isRequired,
  size: PropTypes.oneOf(SIZES),
  color: PropTypes.oneOf(COLORS),
  hoverColor: PropTypes.oneOf(HOVER_COLORS),
  secondaryColor: PropTypes.oneOf(SECONDARY_COLORS),
  testId: PropTypes.string,
};

export default Icon;

/* 
  Tools used to simplify the icons:
  - https://svgomg.firebaseapp.com/
  - https://transform.tools/svg-to-jsx
*/
