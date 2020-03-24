import React from "react";
import PropTypes from "prop-types";
import weakMemoize from "@emotion/weak-memoize";
import createCache from "@emotion/cache";
import { CacheProvider } from "@emotion/core";

// Inspired by: https://github.com/emotion-js/emotion/issues/760#issuecomment-404353706
const memoizedCreateCacheWithContainer = weakMemoize((container) => {
  return createCache({
    key: "basis", // This key must exist! See: https://emotion.sh/docs/@emotion/cache#key
    container,
  });
});

function CacheProviderWithContainer({ container, children }) {
  const cache = memoizedCreateCacheWithContainer(container);

  return <CacheProvider value={cache}>{children}</CacheProvider>;
}

CacheProviderWithContainer.propTypes = {
  container: PropTypes.object.isRequired,
  children: PropTypes.node.isRequired,
};

export default CacheProviderWithContainer;
