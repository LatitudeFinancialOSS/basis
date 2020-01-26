import React from "react";
import { Container, Section, Text } from "basis";
import Layout from "./Layout";

function KitchenSinkSection() {
  return (
    <Layout name="Section">
      <Container padding="6 0">
        {Section.BACKGROUNDS.map((bg, index) => (
          <Section bg={bg} padding={index * 2} key={bg}>
            <Text>
              Background {bg} with padding = {index * 2}
            </Text>
          </Section>
        ))}
      </Container>
    </Layout>
  );
}

export default KitchenSinkSection;
