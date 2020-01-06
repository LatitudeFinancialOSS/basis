import React from "react";
import PropTypes from "prop-types";
import { MDXProvider } from "@mdx-js/react";
import * as allDesignSystem from "basis";

const { ThemeProvider, defaultTheme, Container } = allDesignSystem;

function Resources({ children }) {
  return (
    <ThemeProvider theme={defaultTheme}>
      <MDXProvider components={allDesignSystem}>
        <Container padding="3 6">{children}</Container>
      </MDXProvider>
    </ThemeProvider>
  );
}

Resources.propTypes = {
  children: PropTypes.node.isRequired
};

export default Resources;
