import React, { useState, useMemo } from "react";
import PropTypes from "prop-types";
import { rgba } from "polished";
import { COLORS } from "basis/components/Text";
import { BACKGROUNDS } from "basis/components/Container";
import { designTokens, useTheme, Grid, Text, Select, Input } from "basis";
import { INTENTS, WEIGHTS, allowedWeights } from "basis/components/Text";
import { colorContrast, accessibleContrast } from "../../utils/color";

const TEXT_COLOR_COLUMN_WIDTH = designTokens.sizes[18];
const CELL_WIDTH = designTokens.sizes[18];
const CELL_HEIGHT = designTokens.sizes[14];

const showOptions = [
  {
    label: "All",
    value: "All"
  },
  {
    label: "Pass AA",
    value: "Pass AA" // We parse the value to extract AA or AAA.
  },
  {
    label: "Pass AAA",
    value: "Pass AAA"
  },
  {
    label: "Fail AA",
    value: "Fail AA"
  },
  {
    label: "Fail AAA",
    value: "Fail AAA"
  }
];
const intentOptions = INTENTS.map(intent => ({
  label: intent,
  value: intent
}));
const SIZES = ["1", "2", "3", "4", "5", "6"];
const sizeOptions = SIZES.map(size => ({
  label: size,
  value: size
}));
const weightOptions = WEIGHTS.map(weight => ({
  label: weight,
  value: weight
}));
const notApplicableOptions = [
  {
    label: "Not applicable",
    value: ""
  }
];

function isHeading(intent) {
  return ["h1", "h2", "h3", "h4", "h5", "h6"].includes(intent);
}

function isBoldAllowedForIntent(intent) {
  for (let i = 0; i < allowedWeights.length; i++) {
    if (allowedWeights[i].intent.includes(intent)) {
      return allowedWeights[i].allowedWeights.length > 1;
    }
  }

  return false;
}

function MatrixCell({
  color,
  backgroundColor,
  intent,
  weight,
  size,
  text,
  minContrast,
  shouldPass
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
        width: CELL_WIDTH,
        height: CELL_HEIGHT,
        marginLeft: designTokens.space[1],
        border:
          backgroundColor === "white"
            ? `1px solid ${designTokens.colors.grey.t05}`
            : null,
        boxSizing: "border-box",
        backgroundColor: theme.getColor(backgroundColor),
        overflow: "hidden",
        position: "relative",
        opacity: isVisible ? 1 : 0,
        transition: "opacity .2s"
      }}
      aria-hidden={isVisible ? null : "true"}
    >
      <Text intent={intent} weight={weight} size={size} color={color}>
        {text}
      </Text>
      <div
        css={{
          position: "absolute",
          right: 0,
          borderTopLeftRadius: "4px",
          bottom: 0,
          width: designTokens.sizes[9],
          padding: `0 ${designTokens.space[1]}`,
          backgroundColor: rgba(designTokens.colors.black, 0.6)
        }}
      >
        <Text intent="body2" color="white" align="center">
          {contrast.toFixed(2)}
        </Text>
      </div>
    </div>
  );
}

MatrixCell.propTypes = {
  color: PropTypes.oneOf(COLORS).isRequired,
  backgroundColor: PropTypes.oneOf(BACKGROUNDS).isRequired,
  intent: PropTypes.oneOf(INTENTS).isRequired,
  weight: PropTypes.oneOf(WEIGHTS).isRequired,
  size: PropTypes.oneOf(SIZES),
  text: PropTypes.string.isRequired,
  minContrast: PropTypes.number,
  shouldPass: PropTypes.bool
};

function AccessibilityPage() {
  const theme = useTheme();
  const [show, setShow] = useState({
    value: "Pass AA"
  });
  const [intent, setIntent] = useState({
    value: "body1"
  });
  const [size, setSize] = useState({
    value: ""
  });
  const [weight, setWeight] = useState({
    value: "regular"
  });
  const [text, setText] = useState({
    value: "Text"
  });
  const isIntentHeading = isHeading(intent.value);
  const isBoldAllowed = isBoldAllowedForIntent(intent.value);
  const { fontSize, fontWeight } = {
    ...theme[`text.${intent.value}`],
    ...(weight.value === "bold" && theme[`text.${intent.value}.bold`]),
    ...(isIntentHeading && theme[`text.size${size.value}`])
  };
  const showParts = show.value.split(" ");
  const shouldPass = showParts[0] === "All" ? null : showParts[0] === "Pass";
  const accessibilityLevel = showParts[1] || null;
  const minContrast = accessibilityLevel
    ? accessibleContrast(
        accessibilityLevel,
        parseInt(fontSize, 10),
        fontWeight > 400
      )
    : null;

  return (
    <div css={{ display: "flex", height: "100%" }}>
      <div css={{ flexGrow: 1, overflow: "auto" }}>
        <Text intent="h3" size="5" color="grey.t75" margin="6">
          Color contrast matrix
        </Text>
        <div
          css={{
            marginBottom: designTokens.space[6],
            padding: `0 ${designTokens.space[6]}`,
            width: "min-content" // Otherwise, right padding is not visible when there is an overflow.
          }}
        >
          <div css={{ display: "flex", paddingLeft: TEXT_COLOR_COLUMN_WIDTH }}>
            {BACKGROUNDS.map(backgroundColor => (
              <div
                css={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  flexShrink: 0,
                  width: CELL_WIDTH,
                  height: designTokens.space[8],
                  marginLeft: designTokens.space[1]
                }}
                key={backgroundColor}
              >
                <Text intent="body2" weight="bold">
                  {backgroundColor}
                </Text>
              </div>
            ))}
          </div>
          {COLORS.map(color => (
            <div
              css={{
                display: "flex",
                marginTop: designTokens.space[1]
              }}
              key={color}
            >
              <div
                css={{
                  display: "flex",
                  alignItems: "center",
                  flexShrink: 0,
                  width: TEXT_COLOR_COLUMN_WIDTH,
                  paddingRight: designTokens.space[3],
                  boxSizing: "border-box"
                }}
              >
                <Text intent="body2" weight="bold">
                  {color}
                </Text>
              </div>
              {BACKGROUNDS.map(backgroundColor => (
                <MatrixCell
                  color={color}
                  backgroundColor={backgroundColor}
                  intent={intent.value}
                  weight={weight.value}
                  size={size.value || undefined}
                  text={text.value}
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
          width: designTokens.sizes[19],
          backgroundColor: designTokens.colors.grey.t05,
          padding: designTokens.space[6],
          boxSizing: "border-box",
          overflow: "auto"
        }}
      >
        <Grid rowsGutter="7">
          <Select
            label="Show"
            options={showOptions}
            placeholder={null}
            helpText={
              minContrast
                ? `${shouldPass ? "Min" : "Max"} contrast: ${minContrast}`
                : "Filter for AA or AAA here"
            }
            data={show}
            onChange={setShow}
          />
          <Select
            label="Intent"
            options={intentOptions}
            placeholder={null}
            data={intent}
            onChange={data => {
              setIntent(data);
              setSize({
                ...size,
                value: isHeading(data.value) ? data.value[1] : ""
              });
            }}
          />
          <Select
            label="Size"
            placeholder={null}
            options={isIntentHeading ? sizeOptions : notApplicableOptions}
            isDisabled={!isIntentHeading}
            data={size}
            onChange={setSize}
          />
          <Select
            label="Weight"
            placeholder={null}
            options={isBoldAllowed ? weightOptions : notApplicableOptions}
            isDisabled={!isBoldAllowed}
            data={weight}
            onChange={setWeight}
          />
          <Input label="Text" validation={[]} data={text} onChange={setText} />
        </Grid>
      </div>
    </div>
  );
}

export default AccessibilityPage;
