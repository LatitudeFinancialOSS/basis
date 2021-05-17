import React from "react";
import { render, screen } from "../utils/test";
import "@testing-library/jest-dom/extend-expect";
import Placeholder from "./Placeholder";

describe("Placeholder", () => {
  it("with width", () => {
    const { container } = render(<Placeholder width="80" />);

    expect(container.firstChild.firstChild).toHaveStyle({
      width: "80px",
    });
  });

  it("with height", () => {
    const { container } = render(<Placeholder height="100%" />);

    expect(container.firstChild.firstChild).toHaveStyle({
      height: "100%",
    });
  });

  it("with label", () => {
    render(<Placeholder label="Navigation placeholder" />);

    expect(screen.getByText("Navigation placeholder")).toBeInTheDocument();
  });

  it("with testId", () => {
    const { container } = render(<Placeholder testId="my-placeholder" />);

    expect(container.firstChild.firstChild).toHaveAttribute(
      "data-testid",
      "my-placeholder"
    );
  });
});
