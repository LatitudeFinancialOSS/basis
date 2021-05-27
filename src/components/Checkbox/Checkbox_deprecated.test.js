import React from "react";
import { render, screen, userEvent } from "../../utils/test";
import "@testing-library/jest-dom/extend-expect";
import { Form, Checkbox, Container } from "..";

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
    const checkboxContainer = container.querySelector("[aria-labelledby]");

    expect(label).toHaveAttribute(
      "id",
      checkboxContainer.getAttribute("aria-labelledby")
    );

    const checkboxInput = container.querySelector('input[type="checkbox"]');
    const checkboxInputLabel = container.querySelector("label");

    expect(checkboxInputLabel).toHaveAttribute(
      "for",
      checkboxInput.getAttribute("id")
    );

    expect(checkboxInputLabel).toHaveStyle({
      display: "inline-flex",
      alignItems: "flex-start",
      padding: "12px 16px",
      minHeight: "24px",
      fontSize: "16px",
      fontWeight: 300,
      lineHeight: "24px",
      fontFamily: "'Roboto',sans-serif",
      color: "#000000",
      backgroundColor: "#f2f2f2",
    });
  });

  it("inside dark container", () => {
    const { container } = render(
      <Container bg="primary.blue.t100">
        <FormWithCheckbox label="Accept terms and conditions">
          I agree
        </FormWithCheckbox>
      </Container>
    );
    const checkboxInputLabel = container.querySelector("label");

    expect(checkboxInputLabel).toHaveStyle({
      backgroundColor: "#ffffff",
    });
  });

  it("inside nested container", () => {
    const { container } = render(
      <Container bg="primary.blue.t100">
        <Container>
          <FormWithCheckbox label="Accept terms and conditions">
            I agree
          </FormWithCheckbox>
        </Container>
      </Container>
    );
    const checkboxInputLabel = container.querySelector("label");

    expect(checkboxInputLabel).toHaveStyle({
      backgroundColor: "#ffffff",
    });
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

  it("with onChange", () => {
    const onChange = jest.fn();
    const { container } = render(
      <FormWithCheckbox label="Accept terms and conditions" onChange={onChange}>
        I agree
      </FormWithCheckbox>
    );
    const checkboxInputLabel = container.querySelector("label");

    // Check
    userEvent.click(checkboxInputLabel);

    expect(onChange).toHaveBeenCalledTimes(1);
    expect(onChange).toBeCalledWith({
      isChecked: true,
    });

    // Uncheck
    userEvent.click(checkboxInputLabel);

    expect(onChange).toBeCalledWith({
      isChecked: false,
    });
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
