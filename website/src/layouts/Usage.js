import React from "react";
import PropTypes from "prop-types";
import { MDXProvider } from "@mdx-js/react";
import { Link as GatsbyLink } from "gatsby";
import * as allDesignSystem from "basis";

const { BasisProvider, defaultTheme, Container } = allDesignSystem;

function Usage({ children }) {
  return (
    <BasisProvider theme={defaultTheme} InternalLink={GatsbyLink}>
      <MDXProvider components={allDesignSystem}>
        <Container padding="3 6">{children}</Container>
      </MDXProvider>
    </BasisProvider>
  );
}

Usage.propTypes = {
  children: PropTypes.node.isRequired,
};

export default Usage;
