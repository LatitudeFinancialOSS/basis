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

function Item({ children, testId, __index }) {
  const theme = useTheme();
  const { type, level } = useListType();
  const { textStyle } = useTextStyle();
  const fontSizeInt = parseInt(theme.getTextStyleCSS(textStyle).fontSize, 10);
  const markerContainerMargin = `${fontSizeInt * 0.75}px`;
  const unorderedCircleSize = `${fontSizeInt * 0.5}px`;
  const spaceBetweenItems = `${fontSizeInt * 0.75}px`;
  const unorderedCSS = {
    width: unorderedCircleSize,
    height: unorderedCircleSize
  };

  return (
    <li
      css={{
        ...theme[`listItem.${type}`],
        ":not(:first-of-type)": {
          marginTop: spaceBetweenItems
        },
        "& ol": theme["list.ordered.nested"],
        "& ol ol": theme["list.ordered.nested.nested"]
      }}
      data-testid={testId}
    >
      {(type === "unordered" || type === "steps") && (
        <>
          <div
            css={{
              ...theme.listItemMarkerContainer,
              marginRight: markerContainerMargin
            }}
            aria-hidden="true"
          >
            <div
              css={{
                ...theme[`listItemMarker.${type}`],
                ...(level === 1 && theme[`listItemMarker.${type}.nested`]),
                ...(type === "unordered" && unorderedCSS)
              }}
            >
              {type === "steps" && level === 0 && __index + 1}
              {type === "steps" &&
                level === 1 &&
                String.fromCharCode(97 + __index)}
            </div>
            &#8203;
            {/* See: https://twitter.com/adamwathan/status/1217864323466432516 */}
          </div>
        </>
      )}
      <div
        css={{
          ...theme[`listItemContent.${type}`],
          ...theme[`listItemContent.${type}.${textStyle}`]
        }}
      >
        {children}
      </div>
    </li>
  );
}

Item.propTypes = {
  children: PropTypes.node.isRequired,
  testId: PropTypes.string,
  __index: PropTypes.number
};

function List(props) {
  const theme = useTheme();
  const { type: inheritedListType, level } = useListType();
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
  const items = React.Children.toArray(children)
    .filter(
      // Ignore all children that aren't List.Item
      child => child.type === Item
    )
    .map((child, index) => React.cloneElement(child, { __index: index }));
  let list = (
    <ListComponent
      css={{
        ...theme.list,
        ...theme[`list.${type}`],
        ...theme[`list.${type}.${textStyle}`],
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

  return (
    <ListTypeProvider value={{ type, level: level + 1 }}>
      {list}
    </ListTypeProvider>
  );
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
