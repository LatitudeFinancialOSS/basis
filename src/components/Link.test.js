import React from "react";
import { render } from "../utils/test";
import "@testing-library/jest-dom/extend-expect";
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
    expect(link.getAttribute("target")).toBe(null);
    expect(link.getAttribute("href")).toBe("/terms");
    expect(link).toHaveStyle(`
      text-decoration: none;
      border-bottom-width: 1px;
      border-bottom-style: solid;
      border-bottom-color: rgba(0,106,255,0.5);
      transition: background-color 0.2s ease-out,border-bottom-color 0.2s ease-out;
      color: #0046aa;
      font-family: 'Roboto',sans-serif;
    `);
  });

  it("new tab", () => {
    const { getByText } = render(
      <Link href="/terms" newTab={true} color="secondary.turquoise.t60">
        Terms and Conditions
      </Link>
    );
    const link = getByText("Terms and Conditions");

    expect(link.getAttribute("target")).toBe("_blank");
    expect(link.getAttribute("rel")).toBe("noopener");
  });

  it("secondary.turquoise.t60", () => {
    const { getByText } = render(
      <Link href="/terms" newTab={false} color="secondary.turquoise.t60">
        Terms and Conditions
      </Link>
    );
    const link = getByText("Terms and Conditions");

    expect(link).toHaveStyle(`
      color: #87edf9;
      border-bottom-color: rgba(135,237,249,0.5);
    `);
  });

  it("secondary.lightBlue.t100", () => {
    const { getByText } = render(
      <Link href="/terms" newTab={false} color="secondary.lightBlue.t100">
        Terms and Conditions
      </Link>
    );
    const link = getByText("Terms and Conditions");

    expect(link).toHaveStyle(`
      color: #63b8ff;
      border-bottom-color: rgba(99,184,255,0.5);
    `);
  });

  it("inside dark container", () => {
    const { getByText } = render(
      <Container bg="primary.blue.t100">
        <Link href="/terms" newTab={false}>
          Terms and Conditions
        </Link>
      </Container>
    );
    const link = getByText("Terms and Conditions");

    expect(link).toHaveStyle(`
      color: #87edf9;
      border-bottom-color: rgba(135,237,249,0.5);
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
});
