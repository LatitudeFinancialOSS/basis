import React from "react";
import PropTypes from "prop-types";
import { BasisProvider, defaultTheme, Container, Text } from "basis";
import "typeface-montserrat";
import "typeface-roboto";

function KitchenSinkLayout({ name, children }) {
  return (
    <BasisProvider theme={defaultTheme}>
      <Container>
        <Container bg="primary.blue.t100" padding="6">
          <Text as="h2" textStyle="heading2" align="center">
            {name}
          </Text>
        </Container>
        {children}
      </Container>
    </BasisProvider>
  );
}

KitchenSinkLayout.propTypes = {
  name: PropTypes.string.isRequired,
  children: PropTypes.node.isRequired,
};

export default KitchenSinkLayout;
