import "@testing-library/jest-dom/extend-expect";
import React from "react";
import Icon from "./Icon";
import { render } from "../utils/test";

describe("Icon", () => {
  Icon.NAMES.forEach((name) => {
    it(`Icon - ${name}`, () => {
      const { container } = render(<Icon name={name} testId={`my-${name}`} />);
      const svg = container.querySelector("svg");

      expect(svg).toHaveAttribute("role", "img");
      expect(svg).toHaveAttribute("data-testid", `my-${name}`);
    });
  });
});
