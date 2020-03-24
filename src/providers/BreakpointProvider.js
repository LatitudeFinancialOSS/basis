import React, { useState, useEffect, useLayoutEffect } from "react";
import PropTypes from "prop-types";
import useTheme from "../hooks/useTheme";

export const BreakpointContext = React.createContext();

function BreakpointProvider(props) {
  const { children } = props;
  const theme = useTheme();
  const windowObj =
    props.window || (typeof window === "undefined" ? null : window);
  const [mediaQueryListMap, setMediaQueryListMap] = useState(null);
  const [breakpoint, setBreakpoint] = useState(null);

  useLayoutEffect(() => {
    const mediaQueryListMap = {};

    for (const bp in theme.exclusiveMediaQueries) {
      mediaQueryListMap[bp] = windowObj.matchMedia(
        theme.exclusiveMediaQueries[bp]
      );

      if (mediaQueryListMap[bp].matches) {
        setBreakpoint(bp);
      }
    }

    setMediaQueryListMap(mediaQueryListMap);
  }, [windowObj, theme.exclusiveMediaQueries]);

  useEffect(() => {
    let mounted = true;
    const removeListeners = [];

    for (const bp in mediaQueryListMap) {
      const mediaQueryList = mediaQueryListMap[bp];
      const listener = (event) => {
        if (event.matches && mounted) {
          setBreakpoint(bp);
        }
      };

      mediaQueryList.addListener(listener);

      removeListeners.push(() => {
        mediaQueryList.removeListener(listener);
      });
    }

    return () => {
      mounted = false;

      removeListeners.forEach((fn) => {
        fn();
      });
    };
  }, [mediaQueryListMap]);

  return (
    <BreakpointContext.Provider value={breakpoint}>
      {children}
    </BreakpointContext.Provider>
  );
}

BreakpointProvider.propTypes = {
  window: PropTypes.object,
  children: PropTypes.node.isRequired,
};

export default BreakpointProvider;
