import React, { useState } from "react";
import { rgba } from "polished";
import { COLORS } from "basis/components/Text";
import { BACKGROUNDS } from "basis/components/Container";
import { designTokens, useTheme, Grid, Text, Select, Input } from "basis";
import { INTENTS, WEIGHTS } from "basis/components/Text";
import { colorContrast } from "../../utils/color";

const TEXT_COLOR_COLUMN_WIDTH = designTokens.sizes[18];
const CELL_WIDTH = designTokens.sizes[18];
const CELL_HEIGHT = designTokens.sizes[14];

const intentOptions = INTENTS.map(intent => ({
  label: intent,
  value: intent
}));
const weightOptions = WEIGHTS.map(weight => ({
  label: weight,
  value: weight
}));

function AccessibilityPage() {
  const theme = useTheme();
  const [intent, setIntent] = useState({
    value: "body1"
  });
  const [weight, setWeight] = useState({
    value: "regular"
  });
  const [text, setText] = useState({
    value: "Text"
  });

  return (
    <div css={{ display: "flex", height: "100%" }}>
      <div css={{ flexGrow: 1, overflow: "auto" }}>
        <Text intent="h3" size="5" color="grey.t75" margin="6">
          Color contrast matrix
        </Text>
        <div
          css={{
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
                    position: "relative"
                  }}
                  key={backgroundColor}
                >
                  <Text
                    intent={intent.value}
                    weight={weight.value}
                    color={color}
                  >
                    {text.value}
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
                      {colorContrast(
                        theme.getColor(color),
                        theme.getColor(backgroundColor)
                      ).toFixed(2)}
                    </Text>
                  </div>
                </div>
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
            label="Intent"
            options={intentOptions}
            placeholder={null}
            data={intent}
            onChange={setIntent}
          />
          <Select
            label="Weight"
            options={weightOptions}
            placeholder={null}
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
