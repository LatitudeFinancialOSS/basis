import React from "react";
import PropTypes from "prop-types";
import { pascalCase } from "pascal-case";
import { hex } from "wcag-contrast";
import { Container, Grid, Text, designTokens, useTheme } from "basis";

const { colors } = designTokens;

function ColorGroup({ title, subTitle, children }) {
  return (
    <div css={{ display: "flex" }}>
      <div
        css={{
          width: designTokens.sizes[17],
          paddingTop: designTokens.space[2]
        }}
      >
        {title && <Text intent="h5">{title}</Text>}
        {subTitle && (
          <div css={{ marginTop: title ? designTokens.space[1] : "2px" }}>
            <Text color="grey.t75">{subTitle}</Text>
          </div>
        )}
      </div>
      <div css={{ display: "flex" }}>{children}</div>
    </div>
  );
}

ColorGroup.propTypes = {
  title: PropTypes.string,
  subTitle: PropTypes.string,
  children: PropTypes.node.isRequired
};

const TINT_REGEX = /^t(\d{2,3})$/;

function getNiceColorName(colorName) {
  const parts = colorName.split(".");
  const lastPart = parts[parts.length - 1];
  const match = lastPart.match(TINT_REGEX);

  if (match) {
    const tint = parseInt(match[1], 10);
    return tint === 100 ? "Solid" : `${tint}% Tint`;
  }

  return pascalCase(lastPart);
}

function Color({ name }) {
  const theme = useTheme();
  const colorHex = theme.getColor(name);
  const contrastWithBlack = hex(colorHex, designTokens.colors.black);
  const contrastWithWhite = hex(colorHex, designTokens.colors.white);
  const textColor = contrastWithBlack > contrastWithWhite ? "black" : "white";

  return (
    <div
      css={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        boxSizing: "border-box",
        width: designTokens.sizes[15],
        height: designTokens.sizes[15],
        padding: designTokens.space[3],
        backgroundColor: theme.getColor(name)
      }}
    >
      <Text intent="body2" color={textColor}>
        {getNiceColorName(name)}
      </Text>
      <div css={{ marginTop: "auto" }}>
        <Text intent="body2" color={textColor}>
          {colorHex.toUpperCase()}
        </Text>
      </div>
    </div>
  );
}

Color.propTypes = {
  name: PropTypes.string.isRequired
};

function ColorsPage() {
  return (
    <Container padding="6">
      <Grid rowsGutter="10">
        <ColorGroup title="Greys">
          <Color name="black" />
          {Object.keys(colors.grey).map(t => (
            <Color name={`grey.${t}`} key={t} />
          ))}
          <Color name="white" />
        </ColorGroup>
        <ColorGroup title="Primary" subTitle="Blue">
          {Object.keys(colors.primary.blue).map(t => (
            <Color name={`primary.blue.${t}`} key={t} />
          ))}
        </ColorGroup>
        <Grid rowsGutter="6">
          <ColorGroup title="Secondary" subTitle="Light Blue">
            {Object.keys(colors.secondary.lightBlue).map(t => (
              <Color name={`secondary.lightBlue.${t}`} key={t} />
            ))}
          </ColorGroup>
          <ColorGroup subTitle="Pink">
            {Object.keys(colors.secondary.pink).map(t => (
              <Color name={`secondary.pink.${t}`} key={t} />
            ))}
          </ColorGroup>
          <ColorGroup subTitle="Purple">
            {Object.keys(colors.secondary.purple).map(t => (
              <Color name={`secondary.purple.${t}`} key={t} />
            ))}
          </ColorGroup>
          <ColorGroup subTitle="Turquoise">
            {Object.keys(colors.secondary.turquoise).map(t => (
              <Color name={`secondary.turquoise.${t}`} key={t} />
            ))}
          </ColorGroup>
        </Grid>
        <Grid rowsGutter="6">
          <ColorGroup title="Highlight" subTitle="Blue">
            {Object.keys(colors.highlight.blue).map(t => (
              <Color name={`highlight.blue.${t}`} key={t} />
            ))}
          </ColorGroup>
          <ColorGroup subTitle="Pink">
            {Object.keys(colors.highlight.pink).map(t => (
              <Color name={`highlight.pink.${t}`} key={t} />
            ))}
          </ColorGroup>
          <ColorGroup subTitle="Purple">
            {Object.keys(colors.highlight.purple).map(t => (
              <Color name={`highlight.purple.${t}`} key={t} />
            ))}
          </ColorGroup>
        </Grid>
        <Grid rowsGutter="6">
          <ColorGroup title="Conditional" subTitle="Positive">
            {Object.keys(colors.conditional.positive).map(t => (
              <Color name={`conditional.positive.${t}`} key={t} />
            ))}
          </ColorGroup>
          <ColorGroup subTitle="Attention">
            {Object.keys(colors.conditional.attention).map(t => (
              <Color name={`conditional.attention.${t}`} key={t} />
            ))}
          </ColorGroup>
          <ColorGroup subTitle="Negative">
            {Object.keys(colors.conditional.negative).map(t => (
              <Color name={`conditional.negative.${t}`} key={t} />
            ))}
          </ColorGroup>
        </Grid>
      </Grid>
    </Container>
  );
}

export default ColorsPage;
