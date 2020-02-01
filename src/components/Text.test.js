import React from "react";
import { render } from "../utils/test";
import "@testing-library/jest-dom/extend-expect";
import Text from "./Text";
import Container from "./Container";

describe("Text", () => {
  it("default", () => {
    const { getByText } = render(<Text>Hello World</Text>);
    const node = getByText("Hello World");

    expect(node.tagName).toBe("P");
    expect(node).toHaveStyle(`
      font-family: 'Roboto',sans-serif;
      font-size: 16px;
      font-weight: 300;
      line-height: 24px;
      letter-spacing: 0px;
      color: #000000;
      text-align: inherit;
      margin: 0;
    `);
  });

  it("h1", () => {
    const { getByText } = render(
      <Text as="h1" textStyle="heading1">
        Hello World
      </Text>
    );
    const node = getByText("Hello World");

    expect(node.tagName).toBe("H1");
    expect(node).toHaveStyle(`
      font-family: 'Montserrat',sans-serif;
      font-size: 48px;
      font-weight: 600;
      line-height: 56px;
      letter-spacing: -1.05px;
      margin: 0;
    `);
  });

  it(`h1 with textStyle="heading2"`, () => {
    const { getByText } = render(
      <Text as="h1" textStyle="heading2">
        Hello World
      </Text>
    );
    const node = getByText("Hello World");

    expect(node.tagName).toBe("H1");
    expect(node).toHaveStyle(`
      font-family: 'Montserrat',sans-serif;
      font-size: 40px;
      font-weight: 600;
      line-height: 48px;
      letter-spacing: -0.88px;
      margin: 0px;
    `);
  });

  it("h2 and center aligned", () => {
    const { getByText } = render(
      <Text as="h2" textStyle="heading2" align="center">
        Hello World
      </Text>
    );
    const node = getByText("Hello World");

    expect(node.tagName).toBe("H2");
    expect(node).toHaveStyle(`
      font-family: 'Montserrat',sans-serif;
      font-size: 40px;
      font-weight: 600;
      line-height: 48px;
      letter-spacing: -0.88px;
      text-align: center;
    `);
  });

  it("h3 and primary.blue.t100", () => {
    const { getByText } = render(
      <Text as="h3" textStyle="heading3" color="primary.blue.t100">
        Hello World
      </Text>
    );
    const node = getByText("Hello World");

    expect(node.tagName).toBe("H3");
    expect(node).toHaveStyle(`
      font-family: 'Montserrat',sans-serif;
      font-size: 32px;
      font-weight: 600;
      line-height: 36px;
      letter-spacing: -0.7px;
      color: #0046aa;
    `);
  });

  it("inside dark container", () => {
    const { getByText } = render(
      <Container bg="primary.blue.t100">
        <Text>Hello World</Text>
      </Container>
    );
    const node = getByText("Hello World");

    expect(node).toHaveStyle(`
      color: #ffffff;
    `);
  });

  it("with margin", () => {
    const { getByText } = render(<Text margin="1 2 3 4">Hello World</Text>);
    const node = getByText("Hello World");

    expect(node).toHaveStyle(`
      margin: 4px 8px 12px 16px;
    `);
  });

  it("with testId", () => {
    const { container } = render(<Text testId="my-text">Hello World</Text>);

    expect(container.firstChild).toHaveAttribute("data-testid", "my-text");
  });
});
