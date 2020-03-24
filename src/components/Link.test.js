import React from "react";
import "@testing-library/jest-dom/extend-expect";
import { render } from "../utils/test";
import Link from "./Link";
import Container from "./Container";

describe("Link", () => {
  it("same tab", () => {
    const { getByText } = render(
      <Link href="/terms" newTab={false}>
        Terms and Conditions
      </Link>
    );
    const link = getByText("Terms and Conditions");

    expect(link.tagName).toBe("A");
    expect(link).not.toHaveAttribute("target");
    expect(link).toHaveAttribute("href", "/terms");
    expect(link).toHaveStyle(`
      text-decoration: none;
      border-bottom-width: 1px;
      border-bottom-style: solid;
      transition: background-color 200ms ease-out,border-bottom-color 200ms ease-out;
      font-family: 'Roboto',sans-serif;
      color: #0046aa;
      border-bottom-color: rgba(0,70,170,0.5);
    `);
  });

  it("new tab", () => {
    const { getByText } = render(
      <Link href="/terms" newTab>
        Terms and Conditions
      </Link>
    );
    const link = getByText("Terms and Conditions");

    expect(link).toHaveAttribute("target", "_blank");
    expect(link).toHaveAttribute("rel", "noopener");
  });

  it("with variant", () => {
    const { getByText } = render(
      <Link href="/terms" newTab={false} variant="dark-bg">
        Terms and Conditions
      </Link>
    );
    const link = getByText("Terms and Conditions");

    expect(link).toHaveStyle(`
      color: #d8edff;
      border-bottom-color: rgba(216,237,255,0.5);
    `);
  });

  it("inherits variant based on background", () => {
    const { getByText } = render(
      <Container bg="primary.blue.t100">
        <Link href="/terms" newTab={false}>
          Terms and Conditions
        </Link>
      </Container>
    );
    const link = getByText("Terms and Conditions");

    expect(link).toHaveStyle(`
      color: #d8edff;
      border-bottom-color: rgba(216,237,255,0.5);
    `);
  });

  it("with margin", () => {
    const { getByText } = render(
      <Link href="/terms" newTab={false} margin="1 2 3">
        Terms and Conditions
      </Link>
    );
    const link = getByText("Terms and Conditions");

    expect(link).toHaveStyle(`
      margin: 4px 8px 12px;
    `);
  });

  it("with padding", () => {
    const { getByText } = render(
      <Link href="/terms" newTab={false} padding="3 6">
        Terms and Conditions
      </Link>
    );
    const link = getByText("Terms and Conditions");

    expect(link).toHaveStyle(`
      padding: 12px 24px;
    `);
  });

  it("with testId", () => {
    const { container } = render(
      <Link href="/terms" newTab={false} testId="my-link">
        Terms and Conditions
      </Link>
    );

    expect(container.firstChild).toHaveAttribute("data-testid", "my-link");
  });

  it("with analyticsClassName", () => {
    const { getByText } = render(
      <Link
        href="/terms"
        newTab={false}
        analyticsClassName="trackcustomanalytics"
      >
        Terms and Conditions
      </Link>
    );

    const link = getByText("Terms and Conditions");

    expect(link).toHaveClass("trackcustomanalytics");
  });
});
