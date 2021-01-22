import React from "react";
import { render, screen } from "../utils/test";
import "@testing-library/jest-dom/extend-expect";
import Text from "./Text";
import Container from "./Container";

describe("Text", () => {
  it("default", () => {
    render(<Text>Hello World</Text>);

    const node = screen.getByText("Hello World");

    expect(node.tagName).toBe("P");
    expect(node).toHaveStyle({
      fontFamily: "'Roboto',sans-serif",
      fontSize: "16px",
      fontWeight: "300",
      lineHeight: "24px",
      letterSpacing: "0px",
      color: "#000000",
      textAlign: "inherit",
      margin: "0",
    });
  });

  it("with id", () => {
    render(<Text id="my-id">Hello World</Text>);

    expect(screen.getByText("Hello World")).toHaveAttribute("id", "my-id");
  });

  it("h1", () => {
    render(
      <Text as="h1" textStyle="heading1">
        Hello World
      </Text>
    );

    const node = screen.getByText("Hello World");

    expect(node.tagName).toBe("H1");
    expect(node).toHaveStyle({
      fontFamily: "'Montserrat',sans-serif",
      fontSize: "48px",
      fontWeight: "600",
      lineHeight: "56px",
      letterSpacing: "-1.05px",
      margin: "0",
    });
  });

  it(`h1 with textStyle="heading2"`, () => {
    render(
      <Text as="h1" textStyle="heading2">
        Hello World
      </Text>
    );

    const node = screen.getByText("Hello World");

    expect(node.tagName).toBe("H1");
    expect(node).toHaveStyle({
      fontFamily: "'Montserrat',sans-serif",
      fontSize: "40px",
      fontWeight: "600",
      lineHeight: "48px",
      letterSpacing: "-0.88px",
      margin: "0px",
    });
  });

  it("h2 and center aligned", () => {
    render(
      <Text as="h2" textStyle="heading2" align="center">
        Hello World
      </Text>
    );

    const node = screen.getByText("Hello World");

    expect(node.tagName).toBe("H2");
    expect(node).toHaveStyle({
      fontFamily: "'Montserrat',sans-serif",
      fontSize: "40px",
      fontWeight: "600",
      lineHeight: "48px",
      letterSpacing: "-0.88px",
      textAlign: "center",
    });
  });

  it("h3 and primary.blue.t100", () => {
    render(
      <Text as="h3" textStyle="heading3" color="primary.blue.t100">
        Hello World
      </Text>
    );

    const node = screen.getByText("Hello World");

    expect(node.tagName).toBe("H3");
    expect(node).toHaveStyle({
      fontFamily: "'Montserrat',sans-serif",
      fontSize: "32px",
      fontWeight: "600",
      lineHeight: "36px",
      letterSpacing: "-0.7px",
      color: "#0046aa",
    });
  });

  it("inside dark container", () => {
    render(
      <Container bg="primary.blue.t100">
        <Text>Hello World</Text>
      </Container>
    );

    const node = screen.getByText("Hello World");

    expect(node).toHaveStyle({
      color: "#ffffff",
    });
  });

  it("inside nested containers", () => {
    render(
      <Container bg="primary.blue.t100">
        <Container>
          <Text>Hello World</Text>
        </Container>
      </Container>
    );

    const node = screen.getByText("Hello World");

    expect(node).toHaveStyle({
      color: "#ffffff",
    });
  });

  it("with margin", () => {
    render(<Text margin="1 2 3 4">Hello World</Text>);

    const node = screen.getByText("Hello World");

    expect(node).toHaveStyle({
      margin: "4px 8px 12px 16px",
    });
  });

  it("with role", () => {
    render(<Text role="alert">Hello World</Text>);

    const node = screen.getByText("Hello World");

    expect(node).toHaveAttribute("role", "alert");
  });

  it("with testId", () => {
    const { container } = render(<Text testId="my-text">Hello World</Text>);

    expect(container.firstChild).toHaveAttribute("data-testid", "my-text");
  });
});
