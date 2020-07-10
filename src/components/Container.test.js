import React from "react";
import { render, screen } from "../utils/test";
import "@testing-library/jest-dom/extend-expect";
import Container from "./Container";
import Text from "./Text";

describe("Container", () => {
  it("no props", () => {
    render(<Container>Hello World</Container>);

    const node = screen.getByText("Hello World");

    expect(node.tagName).toBe("DIV");
    expect(node).toHaveStyle({
      backgroundColor: "transparent",
    });
  });

  it("with margin", () => {
    render(<Container margin="1 4">Hello World</Container>);

    expect(screen.getByText("Hello World")).toHaveStyle({
      margin: "4px 16px",
    });
  });

  it("with padding", () => {
    render(<Container padding="1 2 3 4">Hello World</Container>);

    expect(screen.getByText("Hello World")).toHaveStyle({
      padding: "4px 8px 12px 16px",
    });
  });

  it("with width", () => {
    render(<Container width="80">Hello World</Container>);

    expect(screen.getByText("Hello World")).toHaveStyle({
      width: "80px",
    });
  });

  it("with height", () => {
    render(<Container height="72px">Hello World</Container>);

    expect(screen.getByText("Hello World")).toHaveStyle({
      height: "72px",
    });
  });

  it("with textStyle parent", () => {
    render(
      <Container textStyle="legal">
        <Text>Hello World</Text>
      </Container>
    );

    expect(screen.getByText("Hello World")).toHaveStyle({
      fontSize: "14px",
    });
  });

  it("with textStyle grandparent", () => {
    render(
      <Container textStyle="hero">
        <Container>
          <Text>Hello World</Text>
        </Container>
      </Container>
    );

    expect(screen.getByText("Hello World")).toHaveStyle({
      fontSize: "104px",
    });
  });

  it("with textAlign", () => {
    render(<Container textAlign="right">Hello World</Container>);

    expect(screen.getByText("Hello World")).toHaveStyle({
      textAlign: "right",
    });
  });

  it("with overflow", () => {
    render(<Container overflow=" auto  hidden ">Hello World</Container>);

    expect(screen.getByText("Hello World")).toHaveStyle({
      overflow: "auto hidden",
    });
  });

  it("with background color", () => {
    render(<Container bg="secondary.lightBlue.t25">Hello World</Container>);

    const node = screen.getByText("Hello World");

    expect(node).toHaveStyle({
      backgroundColor: "#d8edff",
    });
  });

  it("with flexGrow", () => {
    render(<Container flexGrow>Hello World</Container>);

    expect(screen.getByText("Hello World")).toHaveStyle({
      flexGrow: 1,
    });
  });

  it("with hasBorder", () => {
    render(<Container hasBorder>Hello World</Container>);

    expect(screen.getByText("Hello World")).toHaveStyle({
      border: "1px solid #D6D6D6",
    });
  });

  it("with hide", () => {
    render(<Container hide>Hello World</Container>);

    expect(screen.getByText("Hello World")).toHaveStyle({
      display: "none",
    });
  });

  it("with testId", () => {
    const { container } = render(
      <Container testId="my-container">Hello World</Container>
    );

    expect(container.firstChild).toHaveAttribute("data-testid", "my-container");
  });
});
