import React from "react";
import { render } from "../../../../src/utils/test";
import "@testing-library/jest-dom/extend-expect";
import Playground from "./index";

describe("Playground", () => {
  it("loads successfully", async () => {
    expect(() => {
      render(<Playground />);
    }).not.toThrow();
  });
});
