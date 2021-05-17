import React from "react";
import { render } from "../utils/test";
import "@testing-library/jest-dom/extend-expect";
import Stepper from "./Stepper";

describe("Stepper", () => {
  it("exposes an ID", () => {
    expect(Stepper.ID).toBe("Stepper");
  });

  it("exposes a HEIGHT_MAP", () => {
    expect(Stepper.HEIGHT_MAP).toStrictEqual({
      default: 100,
    });
  });

  it("with testId", () => {
    const { container } = render(
      <Stepper testId="my-stepper">
        <Stepper.Item label="You" label-md="About you" />
        <Stepper.Item
          label="Address"
          label-sm="Address and ID"
          label-md="Address and identification"
          minor
        />
        <Stepper.Item label="Work" label-xs="Employment" />
        <Stepper.Item label="Expenses" minor />
        <Stepper.Item label="Verify" label-xs="Verify details" />
      </Stepper>
    );

    expect(container.firstChild.firstChild).toHaveAttribute(
      "data-testid",
      "my-stepper"
    );
  });
});
