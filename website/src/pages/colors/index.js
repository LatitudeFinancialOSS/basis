import React from "react";
import PropTypes from "prop-types";
import { pascalCase } from "pascal-case";
import { hex } from "wcag-contrast";
import { useTheme, Container, Stack, Flex, Text } from "basis";

function ColorGroup({ title, subTitle, children }) {
  const theme = useTheme();

  return (
    <Flex>
      <Container width="160" padding="2 0 0 0">
        {title && (
          <Text as="h3" textStyle="heading5" color="grey.t75">
            {title}
          </Text>
        )}
        {subTitle && (
          <div css={{ marginTop: title ? theme.space[1] : "2px" }}>
            <Text color="grey.t75">{subTitle}</Text>
          </div>
        )}
      </Container>
      <Flex>{children}</Flex>
    </Flex>
  );
}

ColorGroup.propTypes = {
  title: PropTypes.string,
  subTitle: PropTypes.string,
  children: PropTypes.node.isRequired,
};

const BLACK_REGEX = /^b(\d{2,3})$/;
const TINT_REGEX = /^t(\d{2,3})$/;

function getNiceColorName(colorName) {
  const parts = colorName.split(".");
  const lastPart = parts[parts.length - 1];
  let match = lastPart.match(BLACK_REGEX);

  if (match) {
    const black = parseInt(match[1], 10);

    return `${black}% Black`;
  }

  match = lastPart.match(TINT_REGEX);

  if (match) {
    const tint = parseInt(match[1], 10);
    return tint === 100 ? "Solid" : `${tint}% Tint`;
  }

  return pascalCase(lastPart);
}

function Color({ name }) {
  const theme = useTheme();
  const colorHex = theme.getColor(name);
  const contrastWithBlack = hex(colorHex, theme.colors.black);
  const contrastWithWhite = hex(colorHex, theme.colors.white);
  const textColor = contrastWithBlack > contrastWithWhite ? "black" : "white";

  return (
    <div
      css={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        boxSizing: "border-box",
        width: "96px",
        height: "96px",
        padding: theme.space[3],
        backgroundColor: theme.getColor(name),
      }}
    >
      <Text textStyle="body2" color={textColor}>
        {getNiceColorName(name)}
      </Text>
      <div css={{ marginTop: "auto" }}>
        <Text textStyle="body2" color={textColor}>
          {colorHex.toUpperCase()}
        </Text>
      </div>
    </div>
  );
}

Color.propTypes = {
  name: PropTypes.string.isRequired,
};

function ColorsPage() {
  const theme = useTheme();

  return (
    <Container padding="6">
      <Stack gap="10">
        <ColorGroup title="Greys">
          <Color name="black" />
          {Object.keys(theme.colors.grey).map((t) => (
            <Color name={`grey.${t}`} key={t} />
          ))}
          <Color name="white" />
        </ColorGroup>
        <ColorGroup title="Primary" subTitle="Blue">
          {Object.keys(theme.colors.primary.blue).map((t) => (
            <Color name={`primary.blue.${t}`} key={t} />
          ))}
        </ColorGroup>
        <Stack gap="6">
          <ColorGroup title="Secondary" subTitle="Light Blue">
            {Object.keys(theme.colors.secondary.lightBlue).map((t) => (
              <Color name={`secondary.lightBlue.${t}`} key={t} />
            ))}
          </ColorGroup>
          <ColorGroup subTitle="Pink">
            {Object.keys(theme.colors.secondary.pink).map((t) => (
              <Color name={`secondary.pink.${t}`} key={t} />
            ))}
          </ColorGroup>
          <ColorGroup subTitle="Purple">
            {Object.keys(theme.colors.secondary.purple).map((t) => (
              <Color name={`secondary.purple.${t}`} key={t} />
            ))}
          </ColorGroup>
          <ColorGroup subTitle="Turquoise">
            {Object.keys(theme.colors.secondary.turquoise).map((t) => (
              <Color name={`secondary.turquoise.${t}`} key={t} />
            ))}
          </ColorGroup>
        </Stack>
        <Stack gap="6">
          <ColorGroup title="Highlight" subTitle="Blue">
            {Object.keys(theme.colors.highlight.blue).map((t) => (
              <Color name={`highlight.blue.${t}`} key={t} />
            ))}
          </ColorGroup>
          <ColorGroup subTitle="Pink">
            {Object.keys(theme.colors.highlight.pink).map((t) => (
              <Color name={`highlight.pink.${t}`} key={t} />
            ))}
          </ColorGroup>
          <ColorGroup subTitle="Purple">
            {Object.keys(theme.colors.highlight.purple).map((t) => (
              <Color name={`highlight.purple.${t}`} key={t} />
            ))}
          </ColorGroup>
        </Stack>
        <Stack gap="6">
          <ColorGroup title="Conditional" subTitle="Positive">
            {Object.keys(theme.colors.conditional.positive).map((t) => (
              <Color name={`conditional.positive.${t}`} key={t} />
            ))}
          </ColorGroup>
          <ColorGroup subTitle="Attention">
            {Object.keys(theme.colors.conditional.attention).map((t) => (
              <Color name={`conditional.attention.${t}`} key={t} />
            ))}
          </ColorGroup>
          <ColorGroup subTitle="Negative">
            {Object.keys(theme.colors.conditional.negative).map((t) => (
              <Color name={`conditional.negative.${t}`} key={t} />
            ))}
          </ColorGroup>
        </Stack>
      </Stack>
    </Container>
  );
}

export default ColorsPage;
