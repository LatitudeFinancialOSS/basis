import React from "react";
import PropTypes from "prop-types";

export const LinkContext = React.createContext();

// See: https://www.gatsbyjs.org/docs/gatsby-link/#reminder-use-link-only-for-internal-links
function defaultIsLinkInternal(href) {
  return /^\/(?!\/)/.test(href);
}

function LinkProvider({
  InternalLink,
  isLinkInternal = defaultIsLinkInternal,
  children,
}) {
  return (
    <LinkContext.Provider value={{ InternalLink, isLinkInternal }}>
      {children}
    </LinkContext.Provider>
  );
}

LinkProvider.propTypes = {
  InternalLink: PropTypes.elementType,
  isLinkInternal: PropTypes.func,
  children: PropTypes.node.isRequired,
};

export default LinkProvider;
