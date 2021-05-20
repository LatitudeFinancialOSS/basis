import React from "react";
import "@testing-library/jest-dom/extend-expect";
import { render, screen, userEvent } from "../utils/test";
import Button from "./Button";
import Container from "./Container";

describe("Button", () => {
  it("default", () => {
    render(<Button>Find out more</Button>);

    const button = screen.getByRole("button", { name: "Find out more" });

    expect(button.tagName).toBe("BUTTON");
    expect(button).toHaveAttribute("type", "button");
    expect(button).toHaveStyle({
      fontSize: "18px",
      lineHeight: "28px",
      fontFamily: "'Roboto',sans-serif",
      fontWeight: 500,
      margin: 0,
      border: 0,
      borderRadius: "4px",
      padding: "0 24px",
      minHeight: "48px",
      transition: "background-color 150ms ease,color 150ms ease",
      backgroundColor: "#006aff",
      color: "#ffffff",
    });
    expect(button).not.toHaveStyle({
      width: "100%",
    });
  });

  it("secondary", () => {
    render(<Button variant="secondary">Find out more</Button>);

    const button = screen.getByRole("button", { name: "Find out more" });

    expect(button).toHaveStyle({
      backgroundColor: "transparent",
      color: "#006aff",
      borderWidth: "1px",
      borderStyle: "solid",
      borderColor: "#006aff",
    });
  });

  it("primary white", () => {
    render(<Button color="white">Find out more</Button>);

    const button = screen.getByRole("button", { name: "Find out more" });

    expect(button).toHaveStyle({
      backgroundColor: "#ffffff",
      color: "#006aff",
    });
  });

  it("primary green", () => {
    render(<Button color="green">Find out more</Button>);

    const button = screen.getByRole("button", { name: "Find out more" });

    expect(button).toHaveStyle({
      backgroundColor: "#21a637",
      color: "#ffffff",
    });
  });

  it("secondary black", () => {
    render(
      <Button variant="secondary" color="black">
        Find out more
      </Button>
    );

    const button = screen.getByRole("button", { name: "Find out more" });

    expect(button).toHaveStyle({
      backgroundColor: "transparent",
      color: "#000000",
      borderWidth: "1px",
      borderStyle: "solid",
      borderColor: "#000000",
    });
  });

  it("secondary white", () => {
    render(
      <Button variant="secondary" color="white">
        Find out more
      </Button>
    );

    const button = screen.getByRole("button", { name: "Find out more" });

    expect(button).toHaveStyle({
      backgroundColor: "transparent",
      color: "#ffffff",
      borderWidth: "1px",
      borderStyle: "solid",
      borderColor: "#ffffff",
    });
  });

  it("with width", () => {
    render(<Button width="100%">Find out more</Button>);

    const button = screen.getByRole("button", { name: "Find out more" });

    expect(button).toHaveStyle({
      width: "100%",
    });
  });

  it("loading", () => {
    render(<Button loading>I agree</Button>);

    const button = screen.getByRole("button");

    expect(button).toHaveStyle({
      backgroundColor: "transparent",
      borderWidth: "1px",
      borderStyle: "solid",
      borderColor: "rgba(0,0,0,0.35)",
      cursor: "progress",
    });

    expect(screen.getByLabelText("Loading icon")).toBeInTheDocument();
  });

  it("disabled", () => {
    render(<Button disabled>Find out more</Button>);

    const button = screen.getByRole("button", { name: "Find out more" });

    expect(button).toHaveStyle({
      backgroundColor: "#b2b2b2",
      color: "#414141",
      opacity: 0.7,
      cursor: "not-allowed",
    });
  });

  it('type="submit"', () => {
    render(<Button type="submit">Find out more</Button>);

    const button = screen.getByRole("button", { name: "Find out more" });

    expect(button).toHaveAttribute("type", "submit");
  });

  it("inside dark container", () => {
    render(
      <Container bg="primary.blue.t100">
        <Button>On dark blue</Button>
      </Container>
    );

    expect(screen.getByRole("button", { name: "On dark blue" })).toHaveStyle({
      backgroundColor: "#ffffff",
      color: "#006aff",
    });
  });

  it("inside nested container", () => {
    render(
      <Container bg="primary.blue.t100">
        <Container>
          <Button>Find out more</Button>
        </Container>
      </Container>
    );

    const button = screen.getByRole("button", { name: "Find out more" });

    expect(button).toHaveStyle({
      backgroundColor: "#ffffff",
      color: "#006aff",
    });
  });

  it("with margin", () => {
    render(<Button margin="2 4">Find out more</Button>);

    const button = screen.getByRole("button", { name: "Find out more" });

    expect(button).toHaveStyle({
      margin: "8px 16px",
    });
  });

  it("with onClick", () => {
    const onClick = jest.fn();

    render(<Button onClick={onClick}>Find out more</Button>);

    const button = screen.getByRole("button", { name: "Find out more" });

    userEvent.click(button);

    expect(onClick).toHaveBeenCalledTimes(1);
  });

  it("with testId", () => {
    render(<Button testId="my-button">Find out more</Button>);

    const button = screen.getByRole("button", { name: "Find out more" });

    expect(button).toHaveAttribute("data-testid", "my-button");
  });
});
