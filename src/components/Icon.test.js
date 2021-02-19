import React from "react";
import { render } from "../utils/test";
import "@testing-library/jest-dom/extend-expect";
import Icon from "./Icon";

describe("Icon", () => {
  Icon.NAMES.forEach((name) => {
    it(`Icon - ${name}`, () => {
      const { container } = render(<Icon name={name} testId={`my-${name}`} />);
      const svg = container.firstChild;

      expect(svg).toHaveAttribute("role", "img");
      expect(svg).toHaveAttribute("data-testid", `my-${name}`);
    });
  });
});
