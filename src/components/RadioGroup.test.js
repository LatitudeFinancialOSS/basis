import React from "react";
import { render, wait } from "../utils/test";
import "@testing-library/jest-dom/extend-expect";
import Form from "./Form";
import RadioGroup from "./RadioGroup";
import Container from "./Container";

const options = [
  {
    label: "Yes",
    value: "yes"
  },
  {
    label: "No",
    value: "no"
  },
  {
    label: "Maybe",
    value: "maybe"
  }
];

function FormWithRadioGroup(props) {
  const initialValues = {
    hungry: ""
  };

  return (
    <Form initialValues={initialValues}>
      <RadioGroup name="hungry" options={options} {...props} />
    </Form>
  );
}

describe("RadioGroup", () => {
  it("renders label that is connected to the radio group", () => {
    const { getByText, getByRole } = render(
      <FormWithRadioGroup label="Are you happy?" />
    );
    const label = getByText("Are you happy?");
    const radioGroup = getByRole("radiogroup");

    expect(label.tagName).toBe("LABEL");

    const labelId = label.getAttribute("id");

    expect(labelId).toBeTruthy();
    expect(radioGroup.getAttribute("aria-labelledby")).toBe(labelId);
  });

  it("renders help text that is connected to the radio group", () => {
    const { container, getByRole } = render(
      <FormWithRadioGroup label="Are you happy?" helpText="Some help text" />
    );
    const radioGroup = getByRole("radiogroup");
    const describedBy = radioGroup.getAttribute("aria-describedby");
    const helpText = container.querySelector(`[id="${describedBy}"]`);

    expect(helpText).toHaveTextContent("Some help text");
  });

  it("renders error message", async () => {
    const { container, queryByText, getByLabelText, getByRole } = render(
      <FormWithRadioGroup label="Are you happy?" helpText="Some help text" />
    );
    const yesInput = getByLabelText("Yes");

    yesInput.focus();
    yesInput.blur();

    const radioGroup = getByRole("radiogroup");
    const describedBy = radioGroup.getAttribute("aria-describedby");
    const errorMessage = container.querySelector(`[id="${describedBy}"]`);

    await wait(() => {
      expect(errorMessage).toHaveTextContent("Please make a selection.");
      expect(queryByText("Some help text")).not.toBeInTheDocument();
    });
  });

  it("inside dark container", () => {
    const { getByText } = render(
      <Container bg="primary.blue.t100">
        <FormWithRadioGroup label="Are you happy?" />
      </Container>
    );
    const yesLabel = getByText("Yes");

    expect(yesLabel).toHaveStyle(`
      background-color: #ffffff;
    `);
  });

  it("with testId", () => {
    const { container } = render(
      <FormWithRadioGroup label="Are you happy?" testId="my-radio-group" />
    );

    expect(container.querySelector("form").firstChild).toHaveAttribute(
      "data-testid",
      "my-radio-group"
    );
  });
});
