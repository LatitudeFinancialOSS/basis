import React from "react";
import PropTypes from "prop-types";
import { Container, Text } from "basis";

function KitchenSinkLayout({ name, children }) {
  return (
    <Container>
      <Container bg="primary.blue.t100" padding="6">
        <Text as="h2" textStyle="heading2" align="center">
          {name}
        </Text>
      </Container>
      {children}
    </Container>
  );
}

KitchenSinkLayout.propTypes = {
  name: PropTypes.string.isRequired,
  children: PropTypes.node.isRequired,
};

export default KitchenSinkLayout;
