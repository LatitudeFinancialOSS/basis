import React from "react";
import { render, screen, userEvent, waitFor } from "../../utils/test";
import "@testing-library/jest-dom/extend-expect";
import Form from "../Form";
import { RadioGroup } from "..";
import Container from "../Container";

const options = [
  {
    label: "Yes",
    value: "yes",
  },
  {
    label: "No",
    value: "no",
  },
  {
    label: "Maybe",
    value: "maybe",
  },
];

function FormWithRadioGroup(props) {
  const initialValues = {
    hungry: "",
  };

  return (
    <Form initialValues={initialValues}>
      <RadioGroup name="hungry" options={options} {...props} />
    </Form>
  );
}

function getLabelByText(text) {
  return screen.getByText(text).closest("label");
}

describe("RadioGroup", () => {
  it("renders label that is connected to the radio group", () => {
    render(<FormWithRadioGroup label="Are you happy?" />);

    const label = screen.getByText("Are you happy?");
    const radioGroup = screen.getByRole("radiogroup");
    const labelId = label.getAttribute("id");

    expect(labelId).toBeTruthy();
    expect(radioGroup).toHaveAttribute("aria-labelledby", labelId);
  });

  it("renders help text that is connected to the radio group", () => {
    const { container } = render(
      <FormWithRadioGroup label="Are you happy?" helpText="Some help text" />
    );
    const radioGroup = screen.getByRole("radiogroup");
    const describedBy = radioGroup.getAttribute("aria-describedby");
    const helpText = container.querySelector(`[id="${describedBy}"]`);

    expect(helpText).toHaveTextContent("Some help text");
  });

  it("renders error message", async () => {
    render(
      <FormWithRadioGroup label="Are you happy?" helpText="Some help text" />
    );
    const yesInput = screen.getByLabelText("Yes");

    yesInput.focus();
    yesInput.blur();

    await screen.findByText("Please make a selection.");
    await waitFor(() => {
      expect(screen.queryByText("Some help text")).not.toBeInTheDocument();
    });
  });

  it("inside dark container", () => {
    render(
      <Container bg="primary.blue.t100">
        <FormWithRadioGroup label="Are you happy?" />
      </Container>
    );

    const yesLabel = getLabelByText("Yes");

    expect(yesLabel).toHaveStyle({
      backgroundColor: "#ffffff",
    });
  });

  it("inside nested container", () => {
    render(
      <Container bg="primary.blue.t100">
        <Container>
          <FormWithRadioGroup label="Are you happy?" />
        </Container>
      </Container>
    );

    const yesLabel = getLabelByText("Yes");

    expect(yesLabel).toHaveStyle({
      backgroundColor: "#ffffff",
    });
  });

  it("with onChange", () => {
    const onChange = jest.fn();
    const { container } = render(
      <FormWithRadioGroup label="Are you happy?" onChange={onChange} />
    );

    const yesInput = screen.getByLabelText("Yes");
    const yesLabel = container.querySelector(
      `label[for="${yesInput.getAttribute("id")}"]`
    );
    const noInput = screen.getByLabelText("No");
    const noLabel = container.querySelector(
      `label[for="${noInput.getAttribute("id")}"]`
    );

    // Click "Yes"
    userEvent.click(yesLabel);

    expect(onChange).toHaveBeenCalledTimes(1);
    expect(onChange).toBeCalledWith({
      selectedOption: {
        label: "Yes",
        value: "yes",
      },
    });

    // Click "No"
    userEvent.click(noLabel);

    expect(onChange).toBeCalledWith({
      selectedOption: {
        label: "No",
        value: "no",
      },
    });
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
