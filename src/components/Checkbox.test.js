import React, { useState } from "react";
import { render } from "../utils/test";
import "@testing-library/jest-dom/extend-expect";
import Checkbox from "./Checkbox";
import Container from "./Container";

function App(props) {
  const [data, onChange] = useState({
    value: false
  });

  return <Checkbox data={data} onChange={onChange} {...props} />;
}

describe("Checkbox", () => {
  it("renders label that is connected to checkbox", () => {
    const { container, getByText } = render(
      <App label="Accept terms and conditions">I agree</App>
    );
    const label = getByText("Accept terms and conditions");
    const checkboxContainer = container.querySelector("[aria-checked]");

    expect(label.getAttribute("id")).toBe(
      checkboxContainer.getAttribute("aria-labelledby")
    );
    expect(checkboxContainer.getAttribute("aria-checked")).toBe("false");

    const checkboxInput = checkboxContainer.querySelector(
      'input[type="checkbox"]'
    );
    const checkboxInputLabel = checkboxContainer.querySelector("label");

    expect(checkboxInputLabel.getAttribute("for")).toBe(
      checkboxInput.getAttribute("id")
    );

    expect(checkboxInputLabel).toHaveStyle(`
      display: inline-flex;
      align-items: flex-start;
      padding: 12px 16px;
      min-height: 24px;
      font-size: 16px;
      font-weight: 300;
      line-height: 24px;
      font-family: 'Roboto',sans-serif;
      color: #000000;
      background-color: #f2f2f2;
    `);
  });

  it("inside dark container", () => {
    const { container } = render(
      <Container bg="primary.blue.t100">
        <App label="Accept terms and conditions">I agree</App>
      </Container>
    );
    const checkboxContainer = container.querySelector("[aria-checked]");
    const checkboxInputLabel = checkboxContainer.querySelector("label");

    expect(checkboxInputLabel).toHaveStyle(`
      background-color: #ffffff;
    `);
  });

  it("with testId", () => {
    const { container } = render(
      <App label="Accept terms and conditions" testId="my-checkbox">
        I agree
      </App>
    );

    expect(container.firstChild).toHaveAttribute("data-testid", "my-checkbox");
  });
});
