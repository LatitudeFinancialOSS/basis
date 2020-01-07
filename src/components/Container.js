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
          marginLeft: "15px", // This is half of our special 30px columns gutter.
          marginRight: "15px",
          // Note: the order of these media queries is important (because they are not exclusive).
          [theme.minMediaQueries.sm]: {
            maxWidth: theme.breakpointMaxWidths.sm,
            marginLeft: "auto",
            marginRight: "auto"
          },
          [theme.minMediaQueries.md]: {
            maxWidth: theme.breakpointMaxWidths.md
          },
          [theme.minMediaQueries.lg]: {
            maxWidth: theme.breakpointMaxWidths.lg
          },
          [theme.minMediaQueries.xl]: {
            maxWidth: theme.breakpointMaxWidths.xl
          }
        },
        responsivePropsCSS
      )
    : responsivePropsCSS;

  return (
    <ContainerProvider value={{ bg }}>
      <div
        css={{
          boxSizing: "border-box",
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
