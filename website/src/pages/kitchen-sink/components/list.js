import React from "react";
import { Container, Stack, List, Text, Link } from "basis";
import KitchenSinkLayout from "../../../components/kitchen-sink/KitchenSinkLayout";

function KitchenSinkList() {
  return (
    <KitchenSinkLayout name="List">
      <Container padding="4">
        <Text textStyle="heading4" margin="0 0 4 0">
          Unordered:
        </Text>
        <Stack direction="horizontal" gap="10">
          {List.TEXT_STYLES.map((textStyle) => (
            <Container width="240" bg="grey.t05" key={textStyle}>
              <List textStyle={textStyle}>
                <List.Item>Short item</List.Item>
                <List.Item>
                  Very long item with a{" "}
                  <Link href="#" newTab={false}>
                    link
                  </Link>{" "}
                  and a <b>bold text</b> that demonstrates a multi-line
                  paragraph.
                  <Text textStyle="legal">
                    {`Note that you can override List's textStyle.`}
                  </Text>
                </List.Item>
                <List.Item>
                  <strong>Nested list</strong>
                  <List>
                    <List.Item>First</List.Item>
                    <List.Item>Second</List.Item>
                    <List.Item>Third</List.Item>
                  </List>
                </List.Item>
                <List.Item>Last item</List.Item>
              </List>
            </Container>
          ))}
        </Stack>
        <Text textStyle="heading5" margin="6 0 4 0">
          danger
        </Text>
        <Container width="240" bg="grey.t05">
          <List variant="danger">
            <List.Item>Short item</List.Item>
            <List.Item>
              Very long item with a{" "}
              <Link href="#" newTab={false}>
                link
              </Link>{" "}
              and a <b>bold text</b> that demonstrates a multi-line paragraph.
              <Text textStyle="legal">
                {`Note that you can override List's textStyle.`}
              </Text>
            </List.Item>
            <List.Item>
              <strong>Nested list</strong>
              <List>
                <List.Item>First</List.Item>
                <List.Item>Second</List.Item>
                <List.Item>Third</List.Item>
              </List>
            </List.Item>
            <List.Item>Last item</List.Item>
          </List>
        </Container>
      </Container>

      <Container padding="4">
        <Text textStyle="heading4" margin="0 0 4 0">
          Ordered:
        </Text>
        <Stack direction="horizontal" gap="10">
          {List.TEXT_STYLES.map((textStyle) => (
            <Container width="240" bg="grey.t05" key={textStyle}>
              <List type="ordered" textStyle={textStyle}>
                <List.Item>Short item</List.Item>
                <List.Item>
                  Very long item with a{" "}
                  <Link href="#" newTab={false}>
                    link
                  </Link>{" "}
                  and a <b>bold text</b> that demonstrates a multi-line
                  paragraph.
                  <Text textStyle="legal">
                    {`Note that you can override List's textStyle.`}
                  </Text>
                </List.Item>
                <List.Item>
                  <strong>Nested list</strong>
                  <List>
                    <List.Item>First</List.Item>
                    <List.Item>Second</List.Item>
                    <List.Item>
                      Another level of nesting:
                      <List>
                        <List.Item>More</List.Item>
                        <List.Item>Nesting</List.Item>
                        <List.Item>Last deeply nested</List.Item>
                      </List>
                    </List.Item>
                    <List.Item>Last nested</List.Item>
                  </List>
                </List.Item>
                <List.Item>Last item</List.Item>
              </List>
            </Container>
          ))}
        </Stack>
      </Container>

      <Container padding="4">
        <Text textStyle="heading4" margin="0 0 4 0">
          Steps:
        </Text>
        <Stack direction="horizontal" gap="10">
          {List.TEXT_STYLES.map((textStyle) => (
            <Container width="240" bg="grey.t05" key={textStyle}>
              <List type="steps" textStyle={textStyle}>
                <List.Item>Short item</List.Item>
                <List.Item>
                  Very long item with a{" "}
                  <Link href="#" newTab={false}>
                    link
                  </Link>{" "}
                  and a <b>bold text</b> that demonstrates a multi-line
                  paragraph.
                  <Text textStyle="legal">
                    {`Note that you can override List's textStyle.`}
                  </Text>
                </List.Item>
                <List.Item>
                  <strong>Nested list</strong>
                  <List>
                    <List.Item>First</List.Item>
                    <List.Item>Second</List.Item>
                    <List.Item>Third</List.Item>
                  </List>
                </List.Item>
              </List>
            </Container>
          ))}
        </Stack>
      </Container>
    </KitchenSinkLayout>
  );
}

export default KitchenSinkList;
