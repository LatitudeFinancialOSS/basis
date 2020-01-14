import React from "react";
import { COLORS } from "basis/components/Text";
import { BACKGROUNDS } from "basis/components/Container";
import { designTokens, useTheme, Container, Text } from "basis";

function AccessibilityPage() {
  const theme = useTheme();

  return (
    <Container padding="6">
      <div css={{ display: "flex", paddingLeft: designTokens.sizes[15] }}>
        {BACKGROUNDS.map(backgroundColor => (
          <div
            css={{
              display: "flex",
              justifyContent: "center",
              width: designTokens.sizes[15],
              height: designTokens.sizes[7]
            }}
            key={backgroundColor}
          >
            <Text weight="bold">{backgroundColor}</Text>
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
              justifyContent: "flex-end",
              width: designTokens.sizes[15],
              paddingRight: designTokens.space[3],
              boxSizing: "border-box"
            }}
          >
            <Text weight="bold">{color}</Text>
          </div>
          {BACKGROUNDS.map(backgroundColor => (
            <div
              css={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                width: designTokens.sizes[15],
                height: designTokens.sizes[10],
                marginLeft: designTokens.space[1],
                border:
                  backgroundColor === "white"
                    ? `1px solid ${designTokens.colors.grey.t05}`
                    : null,
                boxSizing: "border-box",
                backgroundColor: theme.getColor(backgroundColor)
              }}
              key={backgroundColor}
            >
              <Text color={color}>Text</Text>
            </div>
          ))}
        </div>
      ))}
    </Container>
  );
}

export default AccessibilityPage;
