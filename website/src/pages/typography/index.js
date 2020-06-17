import React, { Fragment } from "react";
import PropTypes from "prop-types";
import { upperCaseFirst } from "upper-case-first";
import { useTheme, Container, Grid, Flex, Text } from "basis";

const fontWeightsMap = {
  100: "thin",
  200: "extra-light",
  300: "light",
  400: "regular",
  500: "medium",
  600: "semi-bold",
  700: "bold",
  800: "extra-bold",
  900: "black",
};

function getFontWeights(textStyles) {
  const fontWeights = textStyles.map((textStyle) => textStyle.fontWeight);

  fontWeights.sort();

  return [...new Set(fontWeights)]
    .map((fontWeight) =>
      upperCaseFirst(`${fontWeightsMap[fontWeight]} ${fontWeight}`)
    )
    .join(" / ");
}

function getFontFamily(textStyle) {
  let result = textStyle.fontFamily.split(/\s*,\s*/)[0].trim();

  if (result[0] === "'" || result[0] === '"') {
    return result.slice(1, -1);
  }

  return result;
}

function Cell({ textStyle, children }) {
  const theme = useTheme();

  return (
    <div
      css={{
        padding: `${theme.space[3]} 0`,
        borderBottom: `${theme.borderWidths[0]} solid ${theme.colors.grey.t16}`,
      }}
    >
      <Flex height="100%" placeItems="center left">
        <Text textStyle={textStyle}>{children}</Text>
      </Flex>
    </div>
  );
}

Cell.propTypes = {
  textStyle: PropTypes.oneOf(Text.TEXT_STYLES),
  children: PropTypes.node.isRequired,
};

function HeaderCell({ children }) {
  const theme = useTheme();

  return (
    <div
      css={{
        paddingBottom: theme.space[2],
        borderBottom: `${theme.borderWidths[1]} solid ${theme.colors.grey.t30}`,
      }}
    >
      <Text textStyle="subtitle2">
        <b>{children}</b>
      </Text>
    </div>
  );
}

HeaderCell.propTypes = {
  children: PropTypes.node.isRequired,
};

function TypographyPage() {
  const theme = useTheme();
  const textStylesMap = theme.textStyles;

  return (
    <Container padding="6">
      <Grid cols="140px 320px 140px 220px 120px 120px 140px 160px">
        <HeaderCell>Text Style</HeaderCell>
        <HeaderCell>Example</HeaderCell>
        <HeaderCell>Font Family</HeaderCell>
        <HeaderCell>Font Weight</HeaderCell>
        <HeaderCell>Case</HeaderCell>
        <HeaderCell>Font Size</HeaderCell>
        <HeaderCell>Line Height</HeaderCell>
        <HeaderCell>Letter Spacing</HeaderCell>

        {Object.keys(textStylesMap)
          .filter((textStyleName) => !textStyleName.endsWith(".bold"))
          .map((textStyleName) => {
            const textStyle = textStylesMap[textStyleName];
            const fontFamily = getFontFamily(textStyle);
            const fontWeights = getFontWeights([
              textStyle,
              textStylesMap[`${textStyleName}.bold`],
            ]);
            const {
              fontSize,
              lineHeight,
              letterSpacing,
              textTransform,
            } = textStyle;
            const case_ =
              textTransform === "uppercase" ? "Uppercase" : "Sentence";

            return (
              <Fragment key={textStyleName}>
                <Cell>{textStyleName}</Cell>
                <Cell textStyle={textStyleName}>Hello</Cell>
                <Cell>{fontFamily}</Cell>
                <Cell>{fontWeights}</Cell>
                <Cell>{case_}</Cell>
                <Cell>{fontSize}</Cell>
                <Cell>{lineHeight}</Cell>
                <Cell>{letterSpacing}</Cell>
              </Fragment>
            );
          })}
      </Grid>
    </Container>
  );
}

export default TypographyPage;
