import React from "react";
import PropTypes from "prop-types";
import useTheme from "../hooks/useTheme";
import useListType, { ListTypeProvider } from "../hooks/useListType";
import useTextStyle, { TextStyleProvider } from "../hooks/useTextStyle";
import {
  responsiveMarginType,
  responsivePropType
} from "../hooks/useResponsiveProp";
import useResponsivePropsCSS from "../hooks/useResponsivePropsCSS";
import { mergeProps } from "../utils/component";
import { responsiveMargin } from "../utils/css";

const TYPES = ["unordered", "ordered", "steps"];
const TEXT_STYLES = ["subtitle1", "subtitle2", "body1", "body2"];

const DEFAULT_PROPS = {
  type: "unordered",
  textStyle: "body1"
};

List.TYPES = TYPES;
List.TEXT_STYLES = TEXT_STYLES;
List.DEFAULT_PROPS = DEFAULT_PROPS;

function Item({ children, testId }) {
  const theme = useTheme();
  const { type } = useListType();

  return (
    <li
      css={{
        ...theme[`listItem.${type}`],
        "&:last-of-type": theme[`listItem.${type}.last`],
        "&:before": theme[`listItem.${type}:before`],
        "& ul, & ol": theme[`list.${type}.nested`],
        "& ol li:before": theme[`listItem.${type}.nested:before`],
        "& ol ol": theme[`list.${type}.nested.nested`],
        "& ol ol li:before": theme[`listItem.${type}.nested.nested:before`]
      }}
      data-testid={testId}
    >
      {children}
    </li>
  );
}

Item.propTypes = {
  children: PropTypes.node.isRequired,
  testId: PropTypes.string
};

function List(props) {
  const theme = useTheme();
  const { type: inheritedListType } = useListType();
  const { textStyle: inheritedTextStyle } = useTextStyle();
  const inheritedProps = {
    type: inheritedListType,
    textStyle: inheritedTextStyle
  };
  const mergedProps = mergeProps(props, DEFAULT_PROPS, inheritedProps, {
    type: type => TYPES.includes(type),
    textStyle: textStyle => TEXT_STYLES.includes(textStyle)
  });
  const { type, textStyle, children, testId } = mergedProps;
  const responsivePropsCSS = useResponsivePropsCSS(mergedProps, DEFAULT_PROPS, {
    margin: responsiveMargin
  });
  const ListComponent = type === "unordered" ? "ul" : "ol";
  const items = React.Children.toArray(children).filter(
    // Ignore all children that aren't List.Item
    child => child.type === Item
  );

  let list = (
    <ListComponent
      css={{
        ...theme.list,
        ...theme[`list.${type}`],
        ...theme.getTextStyleCSS(textStyle),
        ...responsivePropsCSS
      }}
      data-testid={testId}
    >
      {items}
    </ListComponent>
  );

  if (textStyle) {
    list = <TextStyleProvider value={textStyle}>{list}</TextStyleProvider>;
  }

  return <ListTypeProvider value={{ type }}>{list}</ListTypeProvider>;
}

List.propTypes = {
  ...responsiveMarginType,
  ...responsivePropType("textStyle", PropTypes.oneOf(TEXT_STYLES)),
  type: PropTypes.oneOf(TYPES),
  children: PropTypes.node.isRequired,
  testId: PropTypes.string
};

List.Item = Item;

export default List;
