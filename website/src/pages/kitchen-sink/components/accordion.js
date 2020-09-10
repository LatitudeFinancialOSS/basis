import React from "react";
import { Container, Accordion, Text } from "basis";
import KitchenSinkLayout from "../../../components/kitchen-sink/KitchenSinkLayout";

function KitchenSinkAccordion() {
  return (
    <KitchenSinkLayout name="Accordion">
      <Container padding="4" width="320">
        <Text textStyle="heading4" margin="0 0 4 0">
          Default
        </Text>
        <Accordion>
          <Accordion.Item>
            <Accordion.Item.Header>First header</Accordion.Item.Header>
            <Accordion.Item.Content>
              <Text>First content</Text>
            </Accordion.Item.Content>
          </Accordion.Item>
          <Accordion.Item>
            <Accordion.Item.Header>Second header</Accordion.Item.Header>
            <Accordion.Item.Content>
              <Text>Second content</Text>
            </Accordion.Item.Content>
          </Accordion.Item>
          <Accordion.Item>
            <Accordion.Item.Header>Third header</Accordion.Item.Header>
            <Accordion.Item.Content>
              <Text>Third content</Text>
            </Accordion.Item.Content>
          </Accordion.Item>
        </Accordion>
      </Container>

      <Container padding="4" width="320">
        <Text textStyle="heading4" margin="0 0 4 0">
          Keyboard focus
        </Text>
        <Accordion>
          <Accordion.Item>
            <Accordion.Item.Header>First header</Accordion.Item.Header>
            <Accordion.Item.Content>
              <Text>First content</Text>
            </Accordion.Item.Content>
          </Accordion.Item>
          <Accordion.Item>
            <Accordion.Item.Header __internal__keyboardFocus>
              Second header
            </Accordion.Item.Header>
            <Accordion.Item.Content>
              <Text>Second content</Text>
            </Accordion.Item.Content>
          </Accordion.Item>
          <Accordion.Item>
            <Accordion.Item.Header>Third header</Accordion.Item.Header>
            <Accordion.Item.Content>
              <Text>Third content</Text>
            </Accordion.Item.Content>
          </Accordion.Item>
        </Accordion>
      </Container>

      <Container padding="4" width="320">
        <Text textStyle="heading4" margin="0 0 4 0">
          With icon
        </Text>
        <Accordion color="secondary.lightBlue.t25">
          <Accordion.Item>
            <Accordion.Item.Header>
              <Accordion.Item.Header.Icon name="calculator" />
              First header
            </Accordion.Item.Header>
            <Accordion.Item.Content>
              <Text>First content</Text>
            </Accordion.Item.Content>
          </Accordion.Item>
          <Accordion.Item>
            <Accordion.Item.Header>
              <Accordion.Item.Header.Icon name="birthday" />
              Second header
            </Accordion.Item.Header>
            <Accordion.Item.Content>
              <Text>Second content</Text>
            </Accordion.Item.Content>
          </Accordion.Item>
          <Accordion.Item>
            <Accordion.Item.Header>
              <Accordion.Item.Header.Icon name="mail" />
              Third header
            </Accordion.Item.Header>
            <Accordion.Item.Content>
              <Text>Third content</Text>
            </Accordion.Item.Content>
          </Accordion.Item>
        </Accordion>
      </Container>

      <Container padding="4" width="320" bg="grey.t05">
        <Text textStyle="heading4" margin="0 0 4 0">
          Small gap
        </Text>
        <Accordion itemGap="small" color="white">
          <Accordion.Item>
            <Accordion.Item.Header>First header</Accordion.Item.Header>
            <Accordion.Item.Content>
              <Text>First content</Text>
            </Accordion.Item.Content>
          </Accordion.Item>
          <Accordion.Item>
            <Accordion.Item.Header>Second header</Accordion.Item.Header>
            <Accordion.Item.Content>
              <Text>Second content</Text>
            </Accordion.Item.Content>
          </Accordion.Item>
          <Accordion.Item>
            <Accordion.Item.Header>Third header</Accordion.Item.Header>
            <Accordion.Item.Content>
              <Text>Third content</Text>
            </Accordion.Item.Content>
          </Accordion.Item>
        </Accordion>
      </Container>

      <Container padding="4" width="320">
        <Text textStyle="heading4" margin="0 0 4 0">
          Initially open
        </Text>
        <Accordion
          color="secondary.lightBlue.t25"
          textColor="primary.blue.t100"
        >
          <Accordion.Item>
            <Accordion.Item.Header>First header</Accordion.Item.Header>
            <Accordion.Item.Content>
              <Text>First content</Text>
            </Accordion.Item.Content>
          </Accordion.Item>
          <Accordion.Item initiallyOpen>
            <Accordion.Item.Header>Open by default</Accordion.Item.Header>
            <Accordion.Item.Content>
              <Text>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer
                nec odio. Praesent libero. Sed cursus ante dapibus diam. Sed
                nisi. Nulla quis sem at nibh elementum imperdiet. Duis sagittis
                ipsum. Praesent mauris. Fusce nec tellus sed augue semper porta.
                Mauris massa.
              </Text>
            </Accordion.Item.Content>
          </Accordion.Item>
          <Accordion.Item>
            <Accordion.Item.Header>Third header</Accordion.Item.Header>
            <Accordion.Item.Content>
              <Text>Third content</Text>
            </Accordion.Item.Content>
          </Accordion.Item>
        </Accordion>
      </Container>

      <Container padding="4" width="360">
        <Text textStyle="heading4" margin="0 0 4 0">
          Without content padding
        </Text>
        <Accordion>
          <Accordion.Item initiallyOpen>
            <Accordion.Item.Header>Open by default</Accordion.Item.Header>
            <Accordion.Item.Content padding="0">
              <Text>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer
                nec odio. Praesent libero. Sed cursus ante dapibus diam. Sed
                nisi. Nulla quis sem at nibh elementum imperdiet. Duis sagittis
                ipsum. Praesent mauris. Fusce nec tellus sed augue semper porta.
                Mauris massa.
              </Text>
            </Accordion.Item.Content>
          </Accordion.Item>
        </Accordion>
      </Container>
    </KitchenSinkLayout>
  );
}

export default KitchenSinkAccordion;
