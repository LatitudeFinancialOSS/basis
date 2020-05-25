import React from "react";
import PropTypes from "prop-types";
import { MDXProvider } from "@mdx-js/react";
import { Link as GatsbyLink } from "gatsby";
import * as allDesignSystem from "basis";
import { paramCase } from "param-case";

const {
  BasisProvider,
  defaultTheme: theme,
  Link,
  Container,
  Text,
  List,
} = allDesignSystem;
const components = {
  ...allDesignSystem,
  a: (props) => <Link newTab={false} {...props} />,
  p: (props) => <Text margin="0 0 4 0" {...props} />,
  h3: ({ children }) => {
    console.log(paramCase(children));
    return (
      <Text as="h3" textStyle="heading4" margin="0 0 4 0">
        {children}
      </Text>
    );
  },
  ul: ({ children }) => (
    <List>
      {children.map((child, index) => (
        <List.Item key={index}>{child.props.children}</List.Item>
      ))}
    </List>
  ),
  inlineCode: (props) => (
    <code
      css={{
        backgroundColor: theme.colors.secondary.purple.t30,
        padding: "0 2px",
      }}
      {...props}
    />
  ),
  Color: ({ children }) => (
    <Container bg={children} padding="0 2" width="200">
      <Text>{children}</Text>
    </Container>
  ),
};

function Usage({ children }) {
  return (
    <BasisProvider theme={theme} InternalLink={GatsbyLink}>
      <MDXProvider components={components}>
        <Container padding="3 6">{children}</Container>
      </MDXProvider>
    </BasisProvider>
  );
}

Usage.propTypes = {
  children: PropTypes.node.isRequired,
};

export default Usage;
