import React, { useMemo } from "react";
import PropTypes from "prop-types";
import { rgba } from "polished";
import {
  useTheme,
  Container,
  Grid,
  Form,
  Flex,
  Text,
  Select,
  Input,
} from "basis";

import { colorContrast, accessibleContrast } from "../../utils/color";

const { BACKGROUNDS } = Container;
const { TEXT_STYLES, COLORS } = Text;

const showOptions = [
  {
    label: "All",
    value: "All",
  },
  {
    label: "Pass AA",
    value: "Pass AA", // We parse the value to extract AA or AAA.
  },
  {
    label: "Pass AAA",
    value: "Pass AAA",
  },
  {
    label: "Fail AA",
    value: "Fail AA",
  },
  {
    label: "Fail AAA",
    value: "Fail AAA",
  },
];
const textStyleOptions = TEXT_STYLES.map((textStyle) => ({
  label: textStyle,
  value: textStyle,
}));
const weightOptions = ["regular", "bold"].map((weight) => ({
  label: weight,
  value: weight,
}));
const notApplicableOptions = [
  {
    label: "Not applicable",
    value: "",
  },
];

function isBoldAllowedForTextStyle(textStyle) {
  return ["subtitle1", "subtitle2", "body1", "body2", "legal"].includes(
    textStyle
  );
}

function MatrixCell({
  width,
  height,
  color,
  backgroundColor,
  textStyle,
  isBold,
  text,
  minContrast,
  shouldPass,
}) {
  const theme = useTheme();
  const contrast = useMemo(
    () => colorContrast(theme.getColor(color), theme.getColor(backgroundColor)),
    [theme, color, backgroundColor]
  );
  const isVisible =
    minContrast === null ||
    (shouldPass && contrast >= minContrast) ||
    (!shouldPass && contrast < minContrast);

  return (
    <div
      css={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        flexShrink: 0,
        width,
        height,
        marginLeft: theme.space[1],
        border:
          backgroundColor === "white"
            ? `1px solid ${theme.colors.grey.t05}`
            : null,
        boxSizing: "border-box",
        backgroundColor: theme.getColor(backgroundColor),
        overflow: "hidden",
        position: "relative",
        opacity: isVisible ? 1 : 0,
        transition: "opacity .2s",
      }}
      aria-hidden={isVisible ? null : "true"}
    >
      <Text textStyle={textStyle} color={color}>
        {isBold ? <strong>{text}</strong> : text}
      </Text>
      <div
        css={{
          position: "absolute",
          right: 0,
          borderTopLeftRadius: "4px",
          bottom: 0,
          width: "36px",
          padding: `0 ${theme.space[1]}`,
          backgroundColor: rgba(theme.colors.black, 0.6),
        }}
      >
        <Text textStyle="body2" color="white" align="center">
          {contrast.toFixed(2)}
        </Text>
      </div>
    </div>
  );
}

MatrixCell.propTypes = {
  width: PropTypes.string.isRequired,
  height: PropTypes.string.isRequired,
  color: PropTypes.oneOf(COLORS).isRequired,
  backgroundColor: PropTypes.oneOf(BACKGROUNDS).isRequired,
  textStyle: PropTypes.oneOf(TEXT_STYLES).isRequired,
  isBold: PropTypes.bool.isRequired,
  text: PropTypes.string.isRequired,
  minContrast: PropTypes.number,
  shouldPass: PropTypes.bool,
};

const TEXT_COLOR_COLUMN_WIDTH = "160px";
const CELL_WIDTH = "160px";
const CELL_HEIGHT = "72px";

const initialValues = {
  show: "Pass AA",
  textStyle: "body1",
  weight: "regular",
  text: "Text",
};
const backgrounds = BACKGROUNDS.filter((bg) => bg !== "transparent");

function AccessibilityPage() {
  const theme = useTheme();

  return (
    <Flex height="100%" direction="column">
      <Form width="100%" initialValues={initialValues}>
        {({ state }) => {
          const { show, textStyle, weight, text } = state.values;
          const isBoldAllowed = isBoldAllowedForTextStyle(textStyle);
          const { fontSize, fontWeight } = {
            ...theme.textStyles[textStyle],
            ...(weight === "bold" && theme.textStyles[`${textStyle}.bold`]),
          };
          const showParts = show.split(" ");
          const shouldPass =
            showParts[0] === "All" ? null : showParts[0] === "Pass";
          const accessibilityLevel = showParts[1] || null;
          const minContrast = accessibilityLevel
            ? accessibleContrast(
                accessibilityLevel,
                parseInt(fontSize, 10),
                fontWeight > 400
              )
            : null;

          return (
            <Flex height="100%">
              <div css={{ flexGrow: 1, overflow: "auto" }}>
                <Text as="h3" textStyle="heading5" color="grey.t75" margin="6">
                  Color contrast matrix
                </Text>
                <div
                  css={{
                    marginBottom: theme.space[6],
                    padding: `0 ${theme.space[6]}`,
                    width: "min-content", // Otherwise, right padding is not visible when there is an overflow.
                  }}
                >
                  <div
                    css={{
                      display: "flex",
                      paddingLeft: TEXT_COLOR_COLUMN_WIDTH,
                    }}
                  >
                    {backgrounds.map((backgroundColor) => (
                      <div
                        css={{
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center",
                          flexShrink: 0,
                          width: CELL_WIDTH,
                          height: "32px",
                          marginLeft: theme.space[1],
                        }}
                        key={backgroundColor}
                      >
                        <Text textStyle="body2">
                          <strong>{backgroundColor}</strong>
                        </Text>
                      </div>
                    ))}
                  </div>
                  {COLORS.map((color) => (
                    <div
                      css={{
                        display: "flex",
                        marginTop: theme.space[1],
                      }}
                      key={color}
                    >
                      <div
                        css={{
                          display: "flex",
                          alignItems: "center",
                          flexShrink: 0,
                          width: TEXT_COLOR_COLUMN_WIDTH,
                          paddingRight: theme.space[3],
                          boxSizing: "border-box",
                        }}
                      >
                        <Text textStyle="body2">
                          <strong>{color}</strong>
                        </Text>
                      </div>
                      {backgrounds.map((backgroundColor) => (
                        <MatrixCell
                          width={CELL_WIDTH}
                          height={CELL_HEIGHT}
                          color={color}
                          backgroundColor={backgroundColor}
                          textStyle={textStyle}
                          isBold={weight === "bold"}
                          text={text}
                          minContrast={minContrast}
                          shouldPass={shouldPass}
                          key={backgroundColor}
                        />
                      ))}
                    </div>
                  ))}
                </div>
              </div>
              <div
                css={{
                  flexShrink: 0,
                  width: "224px",
                  height: "100%",
                  backgroundColor: theme.colors.grey.t05,
                  padding: theme.space[6],
                  boxSizing: "border-box",
                  overflow: "auto",
                }}
              >
                <Grid rowsGap="7">
                  <Select
                    name="show"
                    label="Show"
                    options={showOptions}
                    helpText={
                      minContrast
                        ? `${
                            shouldPass ? "Min" : "Max"
                          } contrast: ${minContrast}`
                        : "Filter for AA or AAA here"
                    }
                  />
                  <Select
                    name="textStyle"
                    label="Text Style"
                    options={textStyleOptions}
                  />
                  <Select
                    name="weight"
                    label="Weight"
                    options={
                      isBoldAllowed ? weightOptions : notApplicableOptions
                    }
                    disabled={!isBoldAllowed}
                  />
                  <Input name="text" label="Text" validate={false} />
                </Grid>
              </div>
            </Flex>
          );
        }}
      </Form>
    </Flex>
  );
}

export default AccessibilityPage;
