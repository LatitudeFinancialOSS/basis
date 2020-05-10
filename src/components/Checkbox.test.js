import React from "react";
import { render, screen } from "../utils/test";
import "@testing-library/jest-dom/extend-expect";
import Form from "./Form";
import Checkbox from "./Checkbox";
import Container from "./Container";

function FormWithCheckbox(props) {
  const initialValues = {
    terms: false,
  };

  return (
    <Form initialValues={initialValues}>
      <Checkbox name="terms" {...props} />
    </Form>
  );
}

describe("Checkbox", () => {
  it("renders label that is connected to checkbox", () => {
    const { container } = render(
      <FormWithCheckbox label="Accept terms and conditions">
        I agree
      </FormWithCheckbox>
    );
    const label = screen.getByText("Accept terms and conditions");
    const checkboxContainer = container.querySelector("[aria-checked]");

    expect(label).toHaveAttribute(
      "id",
      checkboxContainer.getAttribute("aria-labelledby")
    );
    expect(checkboxContainer).not.toBeChecked();

    const checkboxInput = checkboxContainer.querySelector(
      'input[type="checkbox"]'
    );
    const checkboxInputLabel = checkboxContainer.querySelector("label");

    expect(checkboxInputLabel).toHaveAttribute(
      "for",
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
        <FormWithCheckbox label="Accept terms and conditions">
          I agree
        </FormWithCheckbox>
      </Container>
    );
    const checkboxContainer = container.querySelector("[aria-checked]");
    const checkboxInputLabel = checkboxContainer.querySelector("label");

    expect(checkboxInputLabel).toHaveStyle(`
      background-color: #ffffff;
    `);
  });

  it("with hideLabel", () => {
    render(
      <FormWithCheckbox label="Accept terms and conditions" hideLabel>
        I agree
      </FormWithCheckbox>
    );

    const label = screen.getByText("Accept terms and conditions");

    expect(label).toBeVisuallyHidden();
  });

  it("with testId", () => {
    const { container } = render(
      <FormWithCheckbox
        label="Accept terms and conditions"
        testId="my-checkbox"
      >
        I agree
      </FormWithCheckbox>
    );

    expect(container.querySelector("form").firstChild).toHaveAttribute(
      "data-testid",
      "my-checkbox"
    );
  });
});
