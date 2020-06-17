import React from "react";
import * as allDesignSystem from "basis";
import ComponentContainer from "../../../components/ComponentContainer";
import { formatCode } from "../../../utils/formatting";

const scope = allDesignSystem;

function FlexPage() {
  const code = formatCode(`
    <Container>
      <Text as="h4" textStyle="heading4" margin="10 0 3">Horizontal centering:</Text>
      <Container bg="grey.t05" height="96">
        <Flex height="100%" placeItems="top center">
          <Button>Button</Button>
        </Flex>
      </Container>

      <Text as="h4" textStyle="heading4" margin="10 0 3">Vertical centering:</Text>
      <Container bg="grey.t05" height="96">
        <Flex height="100%" placeItems="center right">
          <Button>Button</Button>
        </Flex>
      </Container>

      <Text as="h4" textStyle="heading4" margin="10 0 3">Horizontal and vertical centering:</Text>
      <Container bg="grey.t05" height="96">
        <Flex height="100%" placeItems="center">
          <Button>Button</Button>
        </Flex>
      </Container>
    </Container>
  `);

  return <ComponentContainer code={code} scope={scope} width="md" />;
}

export default FlexPage;
