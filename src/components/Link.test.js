import React from "react";
import "@testing-library/jest-dom/extend-expect";
import { render, screen, userEvent } from "../utils/test";
import Link from "./Link";
import Container from "./Container";

describe("Link", () => {
  it("same tab", () => {
    render(
      <Link href="/terms" newTab={false}>
        Terms and Conditions
      </Link>
    );

    const link = screen.getByText("Terms and Conditions");

    expect(link.tagName).toBe("A");
    expect(link).not.toHaveAttribute("target");
    expect(link).toHaveAttribute("href", "/terms");
    expect(link).toHaveStyle({
      textDecoration: "none",
      borderBottomWidth: "1px",
      borderBottomStyle: "solid",
      borderBottomColor: "rgba(0,70,170,0.5)",
      transition:
        "background-color 200ms ease-out,border-bottom-color 200ms ease-out",
      fontFamily: "'Roboto',sans-serif",
      color: "#0046aa",
    });
  });

  it("new tab", () => {
    render(
      <Link href="/terms" newTab>
        Terms and Conditions
      </Link>
    );

    const link = screen.getByText("Terms and Conditions");

    expect(link).toHaveAttribute("target", "_blank");
    expect(link).toHaveAttribute("rel", "noreferrer");
  });

  it("with variant", () => {
    render(
      <Link href="/terms" newTab={false} variant="dark-bg">
        Terms and Conditions
      </Link>
    );

    const link = screen.getByText("Terms and Conditions");

    expect(link).toHaveStyle({
      color: "#d8edff",
      borderBottomColor: "rgba(216,237,255,0.5)",
    });
  });

  it("inherits variant based on background", () => {
    render(
      <Container bg="primary.blue.t100">
        <Link href="/terms" newTab={false}>
          Terms and Conditions
        </Link>
      </Container>
    );

    const link = screen.getByText("Terms and Conditions");

    expect(link).toHaveStyle({
      color: "#d8edff",
      borderBottomColor: "rgba(216,237,255,0.5)",
    });
  });

  it("inherits variant based on background in nested container", () => {
    render(
      <Container bg="primary.blue.t100">
        <Container>
          <Link href="/terms" newTab={false}>
            Terms and Conditions
          </Link>
        </Container>
      </Container>
    );

    const link = screen.getByText("Terms and Conditions");

    expect(link).toHaveStyle({
      color: "#d8edff",
      borderBottomColor: "rgba(216,237,255,0.5)",
    });
  });

  it("with margin", () => {
    render(
      <Link href="/terms" newTab={false} margin="1 2 3">
        Terms and Conditions
      </Link>
    );

    const link = screen.getByText("Terms and Conditions");

    expect(link).toHaveStyle({
      margin: "4px 8px 12px",
    });
  });

  it("with padding", () => {
    render(
      <Link href="/terms" newTab={false} padding="3 6">
        Terms and Conditions
      </Link>
    );

    const link = screen.getByText("Terms and Conditions");

    expect(link).toHaveStyle({
      padding: "12px 24px",
    });
  });

  it("with width", () => {
    render(
      <Link
        variant="primary-blue-button"
        href="/terms"
        newTab={false}
        width="300"
      >
        Terms and Conditions
      </Link>
    );

    const link = screen.getByText("Terms and Conditions");

    expect(link).toHaveStyle({
      width: "300px",
    });
  });

  it("with onClick", () => {
    const onClick = jest.fn().mockImplementation((e) => {
      e.preventDefault();
    });

    render(
      <Link href="/terms" newTab={false} onClick={onClick}>
        Terms and Conditions
      </Link>
    );

    const link = screen.getByText("Terms and Conditions");

    userEvent.click(link);

    expect(onClick).toHaveBeenCalledTimes(1);
  });

  it("with analyticsClassName", () => {
    render(
      <Link
        href="/terms"
        newTab={false}
        analyticsClassName="trackcustomanalytics"
      >
        Terms and Conditions
      </Link>
    );

    const link = screen.getByText("Terms and Conditions");

    expect(link).toHaveClass("trackcustomanalytics");
  });

  it("with testId", () => {
    const { container } = render(
      <Link href="/terms" newTab={false} testId="my-link">
        Terms and Conditions
      </Link>
    );

    expect(container.firstChild).toHaveAttribute("data-testid", "my-link");
  });
});
