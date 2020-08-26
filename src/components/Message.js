import React from "react";
import PropTypes from "prop-types";
import Button from "./Button";
import Icon from "./Icon";
import Link from "./Link";
import Text from "./Text";
import useTheme from "../hooks/useTheme";
import { TextStyleProvider } from "../hooks/useTextStyle";
import { BackgroundProvider } from "../hooks/useBackground";
import { mergeProps } from "../utils/component";

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
];
const TEXT_STYLES = ["body1", "body2"];

const DEFAULT_PROPS = {
  bg: "grey.t10",
  textStyle: "body1",
};

Message.SEVERITIES = SEVERITIES;
Message.BACKGROUNDS = BACKGROUNDS;
Message.TEXT_STYLES = TEXT_STYLES;
Message.DEFAULT_PROPS = DEFAULT_PROPS;

function Message(props) {
  const mergedProps = mergeProps(
    props,
    DEFAULT_PROPS,
    {},
    {
      severity: (severity) => SEVERITIES.includes(severity),
      bg: (bg) => BACKGROUNDS.includes(bg),
      textStyle: (textStyle) => TEXT_STYLES.includes(textStyle),
      title: (title) => typeof title === "string" && title.length > 0,
      callToAction: (callToAction) =>
        callToAction.type === Button || callToAction.type === Link,
    }
  );
  const {
    severity,
    bg,
    textStyle,
    title,
    callToAction,
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
  const paddingTop =
    (iconSize - parseInt(theme.getTextStyleCSS(textStyle).lineHeight, 10)) / 2;

  return (
    <BackgroundProvider value={bg}>
      <TextStyleProvider value={textStyle}>
        <div
          css={{
            boxSizing: "border-box",
            backgroundColor: theme.getColor(bg),
            padding: `${theme.space[3]} ${theme.space[4]}`,
            display: "flex",
            flexDirection: "column",
            [theme.minMediaQueries[switchLayoutAt]]: {
              flexDirection: "row",
            },
          }}
          data-testid={testId}
        >
          <div css={{ flexGrow: 1, display: "flex", alignItems: "center" }}>
            <div css={{ display: "flex", alignItems: "flex-start" }}>
              <div css={{ flexShrink: 0, display: "flex" }}>
                <Icon
                  name={severity}
                  color={textAndIconColor}
                  size={`${iconSize}px`}
                />
              </div>
              <div css={{ paddingTop }}>
                <Text margin="0 6 0 2" color={textAndIconColor}>
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
                marginLeft: theme.space[10],
                marginTop: theme.space[2],
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
      </TextStyleProvider>
    </BackgroundProvider>
  );
}

Message.propTypes = {
  severity: PropTypes.oneOf(SEVERITIES).isRequired,
  bg: PropTypes.oneOf(BACKGROUNDS),
  textStyle: PropTypes.oneOf(TEXT_STYLES),
  title: PropTypes.string,
  callToAction: PropTypes.node,
  children: PropTypes.node.isRequired,
  testId: PropTypes.string,
};

export default Message;
