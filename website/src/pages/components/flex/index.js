import React from "react";
import * as allDesignSystem from "basis";
import ComponentContainer from "../../../components/ComponentContainer";
import { formatCode } from "../../../utils/formatting";

const scope = allDesignSystem;

function FlexPage() {
  const code = formatCode(`
    <Container>
      <Text intent="h4" margin="0 0 3">Horizontal stack:</Text>
      <Flex gutter="2">
        <Button>First</Button>
        <Button>Second</Button>
        <Button>Third</Button>
      </Flex>

      <Text intent="h4" margin="10 0 3">Vertical stack:</Text>
      <Flex direction="column" gutter="4">
        <Button>First</Button>
        <Button>Second</Button>
        <Button>Third</Button>
      </Flex>

      <Text intent="h4" margin="10 0 3">Horizontal centering:</Text>
      <Container bg="grey.t05" height="16">
        <Flex height="100%" placeItems="top center">
          <Button>Button</Button>
        </Flex>
      </Container>

      <Text intent="h4" margin="10 0 3">Vertical centering:</Text>
      <Container bg="grey.t05" height="16">
        <Flex height="100%" placeItems="center right">
          <Button>Button</Button>
        </Flex>
      </Container>

      <Text intent="h4" margin="10 0 3">Horizontal and vertical centering:</Text>
      <Container bg="grey.t05" height="16">
        <Flex height="100%" placeItems="center">
          <Button>Button</Button>
        </Flex>
      </Container>
    </Container>
  `);

  return <ComponentContainer code={code} scope={scope} width="md" />;
}

export default FlexPage;
