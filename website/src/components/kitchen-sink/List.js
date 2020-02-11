import React from "react";
import { Container, List, Text, Link } from "basis";
import Layout from "./Layout";

function KitchenSinkList() {
  return (
    <Layout name="List">
      <Container padding="4" width="320">
        <Text textStyle="heading4" margin="0 0 4 0">
          Unordered list:
        </Text>
        <List>
          <List.Item>
            <Text>Short item</Text>
          </List.Item>
          <List.Item>
            <Text>
              Very long item with a{" "}
              <Link href="#" newTab={false}>
                link
              </Link>{" "}
              and a <b>bold text</b> that demonstrates a multi-line paragraph.
            </Text>
            <Text textStyle="legal" margin="4 0 0 0">
              {`Note that you can override List's textStyle.`}
            </Text>
          </List.Item>
          <List.Item>
            <Text>
              <strong>Nested list</strong>
            </Text>
            <List textStyle="body2" margin="3 0 0 0">
              <List.Item>First</List.Item>
              <List.Item>Second</List.Item>
              <List.Item>Third</List.Item>
            </List>
          </List.Item>
        </List>
      </Container>

      <Container padding="4" width="320" bg="grey.t05">
        <Text textStyle="heading4" margin="0 0 4 0">
          Ordered list:
        </Text>
        <List type="ordered" textStyle="subtitle2">
          <List.Item>First item</List.Item>
          <List.Item>Second item</List.Item>
          <List.Item>
            <Text>
              <b>Nested list</b>
            </Text>
            <List textStyle="body2" margin="3 0 0 0">
              <List.Item>Hello</List.Item>
              <List.Item>World</List.Item>
              <List.Item>
                <Text>
                  <b>Nested again</b>
                </Text>
                <List margin="3 0 0 0">
                  <List.Item>Deeply</List.Item>
                  <List.Item>Nested</List.Item>
                </List>
              </List.Item>
            </List>
          </List.Item>
        </List>
      </Container>

      <Container padding="4" width="320">
        <Text textStyle="heading4" margin="0 0 4 0">
          Steps list:
        </Text>
        <List type="steps">
          <List.Item>First item</List.Item>
          <List.Item>Second item</List.Item>
          <List.Item>
            <Text>
              <b>Nested list</b>
            </Text>
            <List margin="3 0 0 0">
              <List.Item>Some</List.Item>
              <List.Item>Nested</List.Item>
              <List.Item>Items</List.Item>
            </List>
          </List.Item>
        </List>
      </Container>
    </Layout>
  );
}

export default KitchenSinkList;
