import React, { useState } from "react";
import { render } from "../utils/test";
import "@testing-library/jest-dom/extend-expect";
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

function App(props) {
  const [hungry, setHungry] = useState({
    value: ""
  });

  return (
    <RadioGroup
      options={options}
      data={hungry}
      onChange={setHungry}
      {...props}
    />
  );
}

describe("RadioGroup", () => {
  it("renders label that is connected to the radio group", () => {
    const { getByText, getByRole } = render(<App label="Are you happy?" />);
    const label = getByText("Are you happy?");
    const radioGroup = getByRole("radiogroup");

    expect(label.tagName).toBe("LABEL");

    const labelId = label.getAttribute("id");

    expect(labelId).toBeTruthy();
    expect(radioGroup.getAttribute("aria-labelledby")).toBe(labelId);
  });

  it("renders help text that is connected to the radio group", () => {
    const { container, getByRole } = render(
      <App label="Are you happy?" helpText="Some help text" />
    );
    const radioGroup = getByRole("radiogroup");
    const describedBy = radioGroup.getAttribute("aria-describedby");
    const errorMessage = container.querySelector(`[id="${describedBy}"]`);

    expect(errorMessage).toHaveTextContent("Some help text");
  });

  it("renders error message", () => {
    const { container, queryByText, getByLabelText, getByRole } = render(
      <App label="Are you happy?" helpText="Some help text" />
    );
    const yesInput = getByLabelText("Yes");

    yesInput.focus();
    yesInput.blur();

    const radioGroup = getByRole("radiogroup");
    const describedBy = radioGroup.getAttribute("aria-describedby");
    const errorMessage = container.querySelector(`[id="${describedBy}"]`);

    expect(errorMessage).toHaveTextContent("Please make a selection.");
    expect(queryByText("Some help text")).not.toBeInTheDocument();
  });

  it("inside dark container", () => {
    const { getByText } = render(
      <Container bg="primary.blue.t100">
        <App label="Are you happy?" />
      </Container>
    );
    const yesLabel = getByText("Yes");

    expect(yesLabel).toHaveStyle(`
      background-color: #ffffff;
    `);
  });

  it("with testId", () => {
    const { container } = render(
      <App label="Are you happy?" testId="my-radio-group" />
    );

    expect(container.firstChild).toHaveAttribute(
      "data-testid",
      "my-radio-group"
    );
  });
});
