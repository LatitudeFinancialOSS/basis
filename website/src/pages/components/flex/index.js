import React from "react";
import * as allDesignSystem from "basis";
import ComponentContainer from "../../../components/ComponentContainer";
import { formatCode } from "../../../utils/formatting";

const scope = allDesignSystem;

function FlexPage() {
  const code = formatCode(`
    <Container>
      <Text as="h4" textStyle="heading4" margin="0 0 3">Horizontal stack:</Text>
      <Flex gutter="2">
        <Button>First</Button>
        <Button>Second</Button>
        <Button>Third</Button>
      </Flex>

      <Text as="h4" textStyle="heading4" margin="10 0 3">Vertical stack:</Text>
      <Flex direction="column" gutter="4">
        <Button>First</Button>
        <Button>Second</Button>
        <Button>Third</Button>
      </Flex>

      <Text as="h4" textStyle="heading4" margin="10 0 3">Horizontal centering:</Text>
      <Container bg="grey.t05" height="16">
        <Flex height="100%" placeItems="top center">
          <Button>Button</Button>
        </Flex>
      </Container>

      <Text as="h4" textStyle="heading4" margin="10 0 3">Vertical centering:</Text>
      <Container bg="grey.t05" height="16">
        <Flex height="100%" placeItems="center right">
          <Button>Button</Button>
        </Flex>
      </Container>

      <Text as="h4" textStyle="heading4" margin="10 0 3">Horizontal and vertical centering:</Text>
      <Container bg="grey.t05" height="16">
        <Flex height="100%" placeItems="center">
          <Button>Button</Button>
        </Flex>
      </Container>

      <Text as="h4" textStyle="heading4" margin="10 0 3">Wrapping items:</Text>
      <Container bg="grey.t05" width="20" height="16">
        <Flex height="100%" wrap={true} gutter="4 10">
          <Container bg="secondary.lightBlue.t30" padding="1 3">
            <Text textStyle="body2">Item 1</Text>
          </Container>
          <Container bg="secondary.lightBlue.t30" padding="1 3">
            <Text textStyle="body2">Item 2</Text>
          </Container>
          <Container bg="secondary.lightBlue.t30" padding="1 3">
            <Text textStyle="body2">Item 3</Text>
          </Container>
          <Container bg="secondary.lightBlue.t30" padding="1 3">
            <Text textStyle="body2">Item 4</Text>
          </Container>
          <Container bg="secondary.lightBlue.t30" padding="1 3">
            <Text textStyle="body2">Item 5</Text>
          </Container>
        </Flex>
      </Container>
    </Container>
  `);

  return <ComponentContainer code={code} scope={scope} width="md" />;
}

export default FlexPage;
