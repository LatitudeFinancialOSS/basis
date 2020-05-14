import React from "react";
import { render } from "../utils/test";
import "@testing-library/jest-dom/extend-expect";
import Section from "./Section";

describe("Section", () => {
  it("no props", () => {
    const { container } = render(<Section>Hello World</Section>);

    expect(container.firstChild).toHaveStyle({
      backgroundColor: "transparent",
    });
  });

  it("with testId", () => {
    const { container } = render(
      <Section testId="my-section">Content goes here</Section>
    );

    expect(container.firstChild).toHaveAttribute("data-testid", "my-section");
  });
});
