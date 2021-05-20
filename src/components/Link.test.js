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

    const span = screen.getByText("Terms and Conditions");
    const link = screen.getByRole("link");

    expect(link).not.toHaveAttribute("target");
    expect(link).toHaveAttribute("href", "/terms");
    expect(link).toHaveStyle({
      textDecoration: "none",
      borderRadius: "4px",
      outline: 0,
    });
    expect(span).toHaveStyle({
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

    const link = screen.getByRole("link");

    expect(link).toHaveAttribute("target", "_blank");
    expect(link).toHaveAttribute("rel", "noreferrer");
  });

  it("with appearance", () => {
    render(
      <Link
        appearance="primary-button"
        variant="white-button"
        href="/terms"
        newTab={false}
      >
        Terms and Conditions
      </Link>
    );

    const span = screen.getByText("Terms and Conditions");

    expect(span).toHaveStyle({
      backgroundColor: "#ffffff",
      color: "#006aff",
    });
  });

  it("with variant", () => {
    render(
      <Link href="/terms" newTab={false} variant="dark-bg">
        Terms and Conditions
      </Link>
    );

    const span = screen.getByText("Terms and Conditions");

    expect(span).toHaveStyle({
      color: "#ffffff",
      borderBottomColor: "rgba(255,255,255,0.5)",
    });
  });

  it("defaults to a button variant", () => {
    render(
      <Link appearance="secondary-button" href="/terms" newTab={false}>
        Terms and Conditions
      </Link>
    );

    const span = screen.getByText("Terms and Conditions");

    expect(span).toHaveStyle({
      backgroundColor: "transparent",
      color: "#006aff",
      borderWidth: "1px",
      borderStyle: "solid",
      borderColor: "#006aff",
    });
  });

  it("defaults to a button appearance", () => {
    render(
      <Link variant="black-button" href="/terms" newTab={false}>
        Terms and Conditions
      </Link>
    );

    const span = screen.getByText("Terms and Conditions");

    expect(span).toHaveStyle({
      backgroundColor: "transparent",
      color: "#000000",
      borderWidth: "1px",
      borderStyle: "solid",
      borderColor: "#000000",
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

    const span = screen.getByText("Terms and Conditions");

    expect(span).toHaveStyle({
      color: "#ffffff",
      borderBottomColor: "rgba(255,255,255,0.5)",
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

    const span = screen.getByText("Terms and Conditions");

    expect(span).toHaveStyle({
      color: "#ffffff",
      borderBottomColor: "rgba(255,255,255,0.5)",
    });
  });

  it("with margin", () => {
    render(
      <Link href="/terms" newTab={false} margin="1 2 3">
        Terms and Conditions
      </Link>
    );

    const link = screen.getByRole("link");

    expect(link).toHaveStyle({
      margin: "4px 8px 12px",
    });
  });

  it("with width", () => {
    render(
      <Link
        appearance="primary-button"
        href="/terms"
        newTab={false}
        width="300"
      >
        Terms and Conditions
      </Link>
    );

    const span = screen.getByText("Terms and Conditions");
    const link = screen.getByRole("link");

    expect(link).toHaveStyle({
      width: "300px",
    });
    expect(span).toHaveStyle({
      width: "100%",
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

    const link = screen.getByRole("link");

    userEvent.click(link);

    expect(onClick).toHaveBeenCalledTimes(1);
  });

  it("with testId", () => {
    render(
      <Link href="/terms" newTab={false} testId="my-link">
        Terms and Conditions
      </Link>
    );

    const link = screen.getByRole("link");

    expect(link).toHaveAttribute("data-testid", "my-link");
  });
});
