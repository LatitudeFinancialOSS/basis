import React, { useMemo, useRef } from "react";
import PropTypes from "prop-types";
import { getStickyItemInfo } from "../utils/sticky";
import { DEFAULT_BREAKPOINT } from "../utils/css";
import useTheme from "../hooks/useTheme";
import useSticky, { StickyProvider } from "../hooks/useSticky";
import { responsiveHeightType } from "../hooks/useResponsiveProp";

function Item({ children, testId }) {
  const theme = useTheme();
  const { css } = useSticky(getStickyItemInfo(children, theme));

  return (
    <div css={css} data-testid={testId}>
      {children}
    </div>
  );
}

Item.propTypes = {
  ...responsiveHeightType,
  children: PropTypes.node,
  testId: PropTypes.string,
};

function Sticky(props) {
  const { children, testId } = props;
  const theme = useTheme();
  const initialOffsetMap = useMemo(() => {
    const result = {
      [DEFAULT_BREAKPOINT]: 0,
    };

    for (const bp in theme.breakpoints) {
      result[bp] = 0;
    }

    return result;
  }, [theme]);
  const accumulativeOffsetMap = useRef(initialOffsetMap);
  const offsetMap = useRef({});
  const updateOffsetMap = (id, heightMap) => {
    if (!offsetMap.current[id]) {
      offsetMap.current[id] = { ...accumulativeOffsetMap.current }; // Spread is important here since `accumulativeOffsetMap.current` is updated below.

      for (const bp in heightMap) {
        accumulativeOffsetMap.current[bp] += heightMap[bp];
      }
    }
  };

  /*
    Without this div, we have no control over sticky items' parent.
    If the parent ends up having `height: 100vh`, for example, the sticky items won't stick. 
  */
  return (
    <StickyProvider
      value={{
        accumulativeOffsetMap: accumulativeOffsetMap.current,
        offsetMap: offsetMap.current,
        updateOffsetMap,
      }}
    >
      <div data-testid={testId}>{children}</div>
    </StickyProvider>
  );
}

Sticky.propTypes = {
  children: PropTypes.node.isRequired,
  testId: PropTypes.string,
};

Sticky.Item = Item;

export default Sticky;
