import React from "react";
import PropTypes from "prop-types";
import Icon from "./Icon";
import Text from "./Text";
import useTheme from "../hooks/useTheme";
import { BackgroundProvider } from "../hooks/useBackground";
import {
  responsivePaddingType,
  responsivePropType,
} from "../hooks/useResponsiveProp";
import useResponsivePropsCSS from "../hooks/useResponsivePropsCSS";
import { mergeProps } from "../utils/component";
import { responsiveHasBreakpointWidth, mergeResponsiveCSS } from "../utils/css";

const SEVERITIES = [
  "assistance",
  "info-or-minor",
  "warning-or-significant",
  "blocking",
  "stop",
  "critical",
  "success",
];
const BACKGROUNDS = [
  "highlight.pink.t100",
  "secondary.pink.t30",
  "primary.blue.t100",
  "secondary.lightBlue.t25",
  "grey.t10",
  "grey.t05",
  "white",
  "transparent",
];

const DEFAULT_PROPS = {
  bg: "grey.t10",
  hasBreakpointWidth: false,
};

Message.SEVERITIES = SEVERITIES;
Message.BACKGROUNDS = BACKGROUNDS;
Message.DEFAULT_PROPS = DEFAULT_PROPS;

function Message(props) {
  const mergedProps = mergeProps(
    props,
    DEFAULT_PROPS,
    {},
    {
      severity: (severity) => SEVERITIES.includes(severity),
      bg: (bg) => BACKGROUNDS.includes(bg),
      title: (title) => typeof title === "string" && title.length > 0,
    }
  );
  const {
    severity,
    bg,
    title,
    callToAction,
    role,
    children,
    testId,
  } = mergedProps;
  const theme = useTheme();
  const textAndIconColor = [
    "highlight.pink.t100",
    "primary.blue.t100",
  ].includes(bg)
    ? "white"
    : "black";
  const switchLayoutAt = "md";
  const iconSize = 32;
  const distanceFromIcon = 8;
  const iconMarginLeft = -4;
  const textYpadding = (iconSize - 24) / 2; // 24px is the line-height of the body1 text style
  const responsiveCSS = useResponsivePropsCSS(props, DEFAULT_PROPS, {
    hasBreakpointWidth: responsiveHasBreakpointWidth,
    padding: ({ hasBreakpointWidth, padding }, theme) => {
      return {
        padding: hasBreakpointWidth
          ? `${theme.space[4]} 0`
          : theme.getSpaceValue(padding ?? 4),
      };
    },
  });

  return (
    <BackgroundProvider value={bg}>
      <div
        css={{
          backgroundColor: theme.getColor(bg),
        }}
        data-testid={testId}
      >
        <div
          css={{
            boxSizing: "border-box",
            display: "flex",
            flexDirection: "column",
            ...mergeResponsiveCSS(
              {
                [theme.minMediaQueries[switchLayoutAt]]: {
                  flexDirection: "row",
                },
              },
              responsiveCSS
            ),
          }}
        >
          <div css={{ flexGrow: 1, display: "flex", alignItems: "center" }}>
            <div
              css={{
                display: "flex",
                alignItems: "flex-start",
                marginTop: -textYpadding,
                marginBottom: -textYpadding,
              }}
            >
              <div
                css={{
                  flexShrink: 0,
                  display: "flex",
                  marginLeft: iconMarginLeft,
                }}
              >
                <Icon
                  name={severity}
                  color={textAndIconColor}
                  size={`${iconSize}px`}
                />
              </div>
              <div
                css={{
                  paddingTop: textYpadding,
                  paddingBottom: textYpadding,
                  paddingLeft: distanceFromIcon,
                  paddingRight: 0,
                  ...(callToAction && {
                    [theme.minMediaQueries[switchLayoutAt]]: {
                      paddingRight: theme.space[6],
                    },
                  }),
                }}
              >
                <Text color={textAndIconColor} role={role}>
                  {title && (
                    <strong
                      css={{ display: "block", marginBottom: theme.space[1] }}
                    >
                      {title}
                    </strong>
                  )}
                  {children}
                </Text>
              </div>
            </div>
          </div>
          {callToAction && (
            <div
              css={{
                marginLeft: iconMarginLeft + iconSize + distanceFromIcon,
                marginTop: theme.space[3],
                [theme.minMediaQueries[switchLayoutAt]]: {
                  marginLeft: "auto",
                  marginTop: 0,
                },
              }}
            >
              {callToAction}
            </div>
          )}
        </div>
      </div>
    </BackgroundProvider>
  );
}

Message.propTypes = {
  severity: PropTypes.oneOf(SEVERITIES).isRequired,
  bg: PropTypes.oneOf(BACKGROUNDS),
  title: PropTypes.string,
  ...responsivePropType("hasBreakpointWidth", PropTypes.bool),
  ...responsivePaddingType,
  role: PropTypes.string,
  children: PropTypes.node.isRequired,
  testId: PropTypes.string,
};

export default Message;
