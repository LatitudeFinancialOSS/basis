import React, { useMemo } from "react";
import PropTypes from "prop-types";
import { getStickyItemHeightMap, getStickyItemsCSS } from "../utils/sticky";
import useTheme from "../hooks/useTheme";
import { responsiveHeightType } from "../hooks/useResponsiveProp";

function Item({ children, testId, wrapperCSS }) {
  return (
    <div css={wrapperCSS} data-testid={testId}>
      {children}
    </div>
  );
}

Item.propTypes = {
  ...responsiveHeightType,
  children: PropTypes.node,
  testId: PropTypes.string,
  wrapperCSS: PropTypes.object
};

function Sticky(props) {
  const theme = useTheme();
  const { children, testId } = props;
  const childrenArray = React.Children.toArray(children);
  const items = childrenArray.filter(child => child.type === Item);
  const heightMaps = useMemo(
    () => items.map(item => getStickyItemHeightMap(item, theme)),
    [items, theme]
  );
  const itemsCSS = useMemo(() => getStickyItemsCSS(heightMaps, theme), [
    heightMaps,
    theme
  ]);
  const childrenToRender = useMemo(() => {
    const result = [];
    let itemsCSSIndex = 0;

    childrenArray.forEach((child, index) => {
      if (child.type === Item) {
        result.push(
          React.cloneElement(child, {
            wrapperCSS: itemsCSS[itemsCSSIndex++],
            key: index
          })
        );
      } else {
        result.push(child);
      }
    });

    return result;
  }, [childrenArray, itemsCSS]);

  /*
    Without this div, we have no control over sticky items' parent.
    If the parent ends up having `height: 100vh`, for example, the sticky items won't stick. 
  */
  return <div data-testid={testId}>{childrenToRender}</div>;
}

Sticky.propTypes = {
  children: PropTypes.node.isRequired,
  testId: PropTypes.string
};

Sticky.Item = Item;

export default Sticky;
