import React from "react";
import { RecoilRoot } from "recoil";
import { render } from "../../../../src/utils/test";
import "@testing-library/jest-dom/extend-expect";
import Playground from "./index";

describe("Playground", () => {
  it("loads successfully", () => {
    expect(() => {
      render(
        <RecoilRoot>
          <Playground />
        </RecoilRoot>
      );
    }).not.toThrow();
  });
});
