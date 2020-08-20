import React from "react";
import { render, screen, waitFor } from "../utils/test";
import "@testing-library/jest-dom/extend-expect";
import Form from "./Form";
import Frequency from "./Frequency";
import Container from "./Container";

function FormWithFrequency(props) {
  const initialValues = {
    salary: {
      amount: "",
      frequency: "",
    },
  };

  return (
    <Form initialValues={initialValues}>
      <Frequency name="salary" {...props} />
    </Form>
  );
}

function getLabelByText(text) {
  return screen.getByText(text).closest("label");
}

describe("Frequency", () => {
  it("renders label, amount and frequency", () => {
    const { container } = render(
      <FormWithFrequency label="Salary" amountPlaceholder="0.00" />
    );
    const label = screen.getByText("Salary");
    const inputsContainer = container.querySelector("[aria-labelledby]");
    const labelId = label.getAttribute("id");

    expect(labelId).toBeTruthy();
    expect(inputsContainer).toHaveAttribute("aria-labelledby", labelId);

    const amountInput = screen.getByPlaceholderText("0.00");

    expect(amountInput).toHaveAttribute("inputmode", "numeric");

    expect(getLabelByText("Annually")).toBeInTheDocument();
    expect(getLabelByText("Quarterly")).toBeInTheDocument();
    expect(getLabelByText("Monthly")).toBeInTheDocument();
    expect(getLabelByText("Fortnightly")).toBeInTheDocument();
    expect(getLabelByText("Weekly")).toBeInTheDocument();
  });

  it("select mode", () => {
    render(
      <FormWithFrequency
        label="Salary"
        mode="select"
        selectPlaceholder="Select frequency"
      />
    );

    const placeholderOption = screen.getByText("Select frequency");

    expect(placeholderOption.parentNode.tagName).toBe("SELECT");
  });

  it("renders help text", () => {
    const { container } = render(
      <FormWithFrequency label="Salary" helpText="Some help text" />
    );
    const inputsContainer = container.querySelector("[aria-labelledby]");
    const describedBy = inputsContainer.getAttribute("aria-describedby");
    const helpText = container.querySelector(`[id="${describedBy}"]`);

    expect(helpText).toHaveTextContent("Some help text");
  });

  it("renders error message", async () => {
    render(
      <FormWithFrequency
        label="Salary"
        amountPlaceholder="0.00"
        helpText="Some help text"
      />
    );

    const amountInput = screen.getByPlaceholderText("0.00");

    amountInput.focus();
    amountInput.blur();

    await screen.findByText("Please enter an amount.");
    await screen.findByText("Please select a frequency.");
    await waitFor(() => {
      expect(screen.queryByText("Some help text")).not.toBeInTheDocument();
    });
  });

  it("hides options", () => {
    render(
      <FormWithFrequency
        label="Salary"
        annually={false}
        quarterly={false}
        monthly={false}
        fortnightly={false}
        weekly={false}
      />
    );

    expect(screen.queryByText("Annually")).not.toBeInTheDocument();
    expect(screen.queryByText("Quarterly")).not.toBeInTheDocument();
    expect(screen.queryByText("Monthly")).not.toBeInTheDocument();
    expect(screen.queryByText("Fortnightly")).not.toBeInTheDocument();
    expect(screen.queryByText("Weekly")).not.toBeInTheDocument();
  });

  it("inside dark container", () => {
    render(
      <Container bg="primary.blue.t100">
        <FormWithFrequency label="Salary" amountPlaceholder="0.00" />
      </Container>
    );

    const amountInput = screen.getByPlaceholderText("0.00");
    const annuallyLabel = getLabelByText("Annually");

    expect(amountInput).toHaveStyle({
      backgroundColor: "#ffffff",
    });
    expect(annuallyLabel).toHaveStyle({
      backgroundColor: "#ffffff",
    });
  });

  it("inside nested container", () => {
    render(
      <Container bg="primary.blue.t100">
        <Container>
          <FormWithFrequency label="Salary" amountPlaceholder="0.00" />
        </Container>
      </Container>
    );

    const amountInput = screen.getByPlaceholderText("0.00");

    expect(amountInput).toHaveStyle({
      backgroundColor: "#ffffff",
    });
  });

  it("with testId", () => {
    const { container } = render(
      <FormWithFrequency label="Salary" testId="my-frequency" />
    );

    expect(container.querySelector("form").firstChild).toHaveAttribute(
      "data-testid",
      "my-frequency"
    );
  });
});
