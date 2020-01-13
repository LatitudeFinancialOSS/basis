import React from "react";
import PropTypes from "prop-types";
import useContainer from "../hooks/useContainer";
import tokens from "../themes/tokens";
import useTheme from "../hooks/useTheme";

const COLORS = ["primary.blue.t100", "black", "white"];

const DEFAULT_PROPS = {
  color: "primary.blue.t100",
  height: "7"
};

function LatitudeLogo(_props) {
  const props = { ...DEFAULT_PROPS, ..._props };
  const { height } = props;
  const theme = useTheme();
  const { bg } = useContainer();
  const color =
    !COLORS.includes(_props.color) && bg
      ? bg === "primary.blue.t100"
        ? "white"
        : "primary.blue.t100"
      : props.color;
  const heightInt = parseInt(tokens.sizes[height], 10);

  return (
    <svg
      height={heightInt}
      viewBox="0 0 197 32"
      css={{ display: "flex" }}
      role="img"
      aria-label="Latitude logo"
    >
      <path
        d="M152.194 16.562c0 2.522-1.007 4.516-3.922 4.516-2.916 0-3.923-1.994-3.923-4.516V8.895h-2.001v7.965c0 2.695 1.076 6.205 5.924 6.205 4.847 0 5.923-3.51 5.923-6.205V8.895h-2.001v7.667zm22.705-.662c0-3.215-2.43-5.005-5.489-5.005h-3.623v10.01h3.623c3.06 0 5.489-1.791 5.49-5.005zm2.029 0c0 4.498-3.304 7.005-7.378 7.005h-5.764V8.895h5.764c4.074 0 7.378 2.506 7.378 7.005zm-97.028 1l-2.632-6.005-2.631 6.005H79.9zm-1.63-8.005l6.363 14.01h-2.1L80.776 18.9H73.76l-1.755 4.005h-2.06l6.343-14.01h1.981zm11.908 2h4.793v12.01h2.001v-12.01h4.794v-2H90.178v2zm31.628 0h4.793v12.01h2.002v-12.01h4.793v-2h-11.588v2zm-11.021 12.01h2.001V8.895h-2.001v14.01zm85.082-12.01v-2H185.7v14.01h10.167v-2h-8.165V16.9h7.025v-2h-7.025v-4.005h8.165zm-141.257-2h-2v14.01h10.167v-2H54.61V8.894zM6.061 0h-5.6v32h32v-5.6h-26.4V0zm14.8 5.6a2.8 2.8 0 100-5.6 2.8 2.8 0 000 5.6zm8.8 12a2.8 2.8 0 100 5.6 2.8 2.8 0 000-5.6zm-17.6-12a2.8 2.8 0 100-5.6 2.8 2.8 0 000 5.6zm17.6 3.2a2.8 2.8 0 100 5.6 2.8 2.8 0 000-5.6zm2.8-6a2.8 2.8 0 11-5.599 0 2.8 2.8 0 015.6 0z"
        fillRule="evenodd"
        fill={theme.getColor(color)}
      />
    </svg>
  );
}

LatitudeLogo.propTypes = {
  color: PropTypes.oneOf(COLORS),
  height: PropTypes.oneOfType([PropTypes.number, PropTypes.string])
};

export default LatitudeLogo;
