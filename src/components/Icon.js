import React from "react";
import PropTypes from "prop-types";
import useTheme from "../hooks/useTheme";

const NAMES = [
  "arrow-back",
  "arrow-forward",
  "birthday",
  "calculator",
  "chevron-down",
  "chevron-left",
  "chevron-right",
  "chevron-up",
  "comparison",
  "cross-small",
  "cross",
  "download",
  "edit",
  "external-link",
  "eye-hidden",
  "eye-visible",
  "face-id",
  "facebook",
  "fingerprint",
  "hamburger",
  "instagram",
  "linkedin",
  "lock-small",
  "lock",
  "mail",
  "message",
  "notification-new",
  "notification",
  "overflow-menu",
  "person",
  "question",
  "search",
  "shield",
  "stopwatch-alt",
  "stopwatch",
  "tick-small",
  "tick",
  "time",
  "triangle-down",
  "triangle-up",
  "twitter",
  "youtube"
];
const COLORS = [
  "grey.t75",
  "primary.blue.t100",
  "highlight.blue.t100",
  "conditional.positive.graphics",
  "conditional.negative.graphics",
  "white"
];
const HOVER_COLORS = ["secondary.lightBlue.t60"];
const SECONDARY_COLORS = ["highlight.blue.t100"];

const DEFAULT_PROPS = {
  color: "grey.t75",
  secondaryColor: "highlight.blue.t100"
};

Icon.NAMES = NAMES;
Icon.COLORS = COLORS;
Icon.HOVER_COLORS = HOVER_COLORS;
Icon.SECONDARY_COLORS = SECONDARY_COLORS;
Icon.DEFAULT_PROPS = DEFAULT_PROPS;

function Icon(_props) {
  const props = { ...DEFAULT_PROPS, ..._props };
  const { name, color, hoverColor, secondaryColor, testId } = props;
  const theme = useTheme();
  const IconComponent = require(`../icons/${name}`).default;

  return (
    <IconComponent
      primaryColor={theme.getColor(color)}
      secondaryColor={theme.getColor(secondaryColor)}
      hoverColor={theme.getColor(hoverColor)}
      testId={testId}
    />
  );
}

Icon.propTypes = {
  name: PropTypes.oneOf(NAMES).isRequired,
  color: PropTypes.oneOf(COLORS),
  hoverColor: PropTypes.oneOf(HOVER_COLORS),
  secondaryColor: PropTypes.oneOf(SECONDARY_COLORS),
  testId: PropTypes.string
};

export default Icon;

/* 
  Tools used to simplify the icons:
  - https://svgomg.firebaseapp.com/
  - https://transform.tools/svg-to-jsx
*/
