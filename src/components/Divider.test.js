import React from "react";
import "@testing-library/jest-dom/extend-expect";
import Divider from "./Divider";
import { render, screen } from "../utils/test";

describe("Divider", () => {
  it("with margin", () => {
    render(<Divider margin="6 0" />);

    const svg = screen.getByRole("img");

    expect(svg).toHaveStyle({
      margin: "24px 0px",
    });
  });

  it("with testId", () => {
    render(<Divider testId="my-divider" />);

    const svg = screen.getByRole("img");

    expect(svg).toHaveAttribute("data-testid", "my-divider");
  });
});
