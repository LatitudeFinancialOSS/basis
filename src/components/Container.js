import React from "react";
import PropTypes from "prop-types";
import useTheme from "../hooks/useTheme";
import { ContainerProvider } from "../hooks/useContainer";
import { responsivePropType } from "../hooks/useResponsiveProp";
import useResponsivePropsCSS from "../hooks/useResponsivePropsCSS";
import { getSpaceValue, mergeResponsiveCSS } from "../utils/css";

export const BACKGROUNDS = [
  "white",
  "grey.t03",
  "grey.t05",
  "secondary.lightBlue.t30",
  "primary.blue.t100"
];

export const DEFAULT_PROPS = {
  hasBreakpointWidth: false
};

function Container(_props) {
  const props = { ...DEFAULT_PROPS, ..._props };
  const { bg, hasBreakpointWidth, children } = props;
  const theme = useTheme();
  const responsivePropsCSS = useResponsivePropsCSS(props, {
    margin: {
      getCSS: value => {
        return {
          margin: getSpaceValue(value)
        };
      }
    },
    padding: {
      getCSS: value => {
        return {
          padding: getSpaceValue(value)
        };
      }
    }
  });
  const responsiveCSS = hasBreakpointWidth
    ? mergeResponsiveCSS(
        {
          ...theme["container.hasBreakpointWidth"],
          // Note: the order of these media queries is important (because they are not exclusive).
          [theme.minMediaQueries.sm]: theme["container.hasBreakpointWidth.sm"],
          [theme.minMediaQueries.md]: theme["container.hasBreakpointWidth.md"],
          [theme.minMediaQueries.lg]: theme["container.hasBreakpointWidth.lg"],
          [theme.minMediaQueries.xl]: theme["container.hasBreakpointWidth.xl"]
        },
        responsivePropsCSS
      )
    : responsivePropsCSS;

  return (
    <ContainerProvider value={{ bg }}>
      <div
        css={{
          ...theme.container,
          backgroundColor: theme.getColor(bg),
          ...responsiveCSS
        }}
      >
        {children}
      </div>
    </ContainerProvider>
  );
}

Container.propTypes = {
  bg: PropTypes.oneOf(BACKGROUNDS),
  ...responsivePropType(
    "margin",
    PropTypes.oneOfType([PropTypes.number, PropTypes.string])
  ),
  ...responsivePropType(
    "padding",
    PropTypes.oneOfType([PropTypes.number, PropTypes.string])
  ),
  hasBreakpointWidth: PropTypes.bool,
  children: PropTypes.node
};

export default Container;
