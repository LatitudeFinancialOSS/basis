import React from "react";
import "@testing-library/jest-dom/extend-expect";
import { render, screen, waitFor, userEvent } from "../../utils/test";
import Form from "../Form";
import DateInput from "./DateInput_deprecated";
import Container from "../Container";

function FormWithDateInput(props) {
  const initialValues = {
    birthDate: {
      day: "",
      month: "",
      year: "",
    },
  };

  return (
    <Form initialValues={initialValues}>
      <DateInput name="birthDate" {...props} />
    </Form>
  );
}

function getHelpText(container) {
  const inputsContainer = container.querySelector("[aria-labelledby]");
  const describedBy = inputsContainer.getAttribute("aria-describedby");

  return container.querySelector(`[id="${describedBy}"]`).textContent;
}

describe("DateInput", () => {
  it("renders label and 3 fields", () => {
    const { container } = render(<FormWithDateInput label="Expiry date" />);
    const label = screen.getByText("Expiry date");
    const inputsContainer = container.querySelector("[aria-labelledby]");
    const labelId = label.getAttribute("id");

    expect(labelId).toBeTruthy();
    expect(inputsContainer).toHaveAttribute("aria-labelledby", labelId);

    const dayInput = screen.getByPlaceholderText("DD");
    const monthInput = screen.getByPlaceholderText("MM");
    const yearInput = screen.getByPlaceholderText("YYYY");

    expect(dayInput).toHaveAttribute("inputmode", "numeric");
    expect(dayInput).toHaveAttribute("maxlength", "2");

    expect(monthInput).toHaveAttribute("inputmode", "numeric");
    expect(monthInput).toHaveAttribute("maxlength", "2");

    expect(yearInput).toHaveAttribute("inputmode", "numeric");
    expect(yearInput).toHaveAttribute("maxlength", "4");
  });

  it(`doesn't render the day field when dayMode="none"`, () => {
    render(<FormWithDateInput label="Expiry date" dayMode="none" />);

    expect(screen.queryByPlaceholderText("DD")).not.toBeInTheDocument();
  });

  it("doesn't render the label when aria-labelledby is specified", () => {
    const { container } = render(
      <FormWithDateInput label="Expiry date" aria-labelledby="my-id" />
    );
    const inputsContainer = container.querySelector("[aria-labelledby]");

    expect(screen.queryByText("Expiry date")).not.toBeInTheDocument();
    expect(inputsContainer).toHaveAttribute("aria-labelledby", "my-id");
  });

  it("help text date - 4 digits year", async () => {
    const { container } = render(<FormWithDateInput label="Expiry date" />);

    await userEvent.type(screen.getByPlaceholderText("DD"), "6");
    await userEvent.type(screen.getByPlaceholderText("MM"), "4");
    await userEvent.type(screen.getByPlaceholderText("YYYY"), "2017");

    expect(getHelpText(container)).toBe("6 April 2017");
  });

  it("help text date - 2 digits year", async () => {
    const { container } = render(
      <FormWithDateInput label="Expiry date" yearMode="2-digits" />
    );

    await userEvent.type(screen.getByPlaceholderText("DD"), "02");
    await userEvent.type(screen.getByPlaceholderText("MM"), "05");
    await userEvent.type(screen.getByPlaceholderText("YY"), "00");

    expect(getHelpText(container)).toBe("2 May 2000");
  });

  it("help text date - no day, 4 digits year", async () => {
    const { container } = render(
      <FormWithDateInput label="Expiry date" dayMode="none" />
    );

    await userEvent.type(screen.getByPlaceholderText("MM"), "4");
    await userEvent.type(screen.getByPlaceholderText("YYYY"), "2017");

    expect(getHelpText(container)).toBe("April 2017");
  });

  it("help text date - no day, 2 digits year", async () => {
    const { container } = render(
      <FormWithDateInput
        label="Expiry date"
        dayMode="none"
        yearMode="2-digits"
      />
    );

    await userEvent.type(screen.getByPlaceholderText("MM"), "08");
    await userEvent.type(screen.getByPlaceholderText("YY"), "01");

    expect(getHelpText(container)).toBe("August 2001");
  });

  it("renders help text", () => {
    const { container } = render(
      <FormWithDateInput label="Expiry date" helpText="Some help text" />
    );

    expect(getHelpText(container)).toBe("Some help text");
  });

  it("required error message", async () => {
    render(<FormWithDateInput label="Expiry date" helpText="Some help text" />);

    const dayInput = screen.getByPlaceholderText("DD");

    dayInput.focus();
    dayInput.blur();

    await screen.findByText("Required");
    await waitFor(() => {
      expect(screen.queryByText("Some help text")).not.toBeInTheDocument();
    });
  });

  it("multiple error messages", async () => {
    render(<FormWithDateInput label="Expiry date" helpText="Some help text" />);

    const dayInput = screen.getByPlaceholderText("DD");
    const monthInput = screen.getByPlaceholderText("MM");
    const yearInput = screen.getByPlaceholderText("YYYY");

    await userEvent.type(dayInput, "34");
    await userEvent.type(monthInput, "56");
    await userEvent.type(yearInput, "7890");

    dayInput.focus();
    dayInput.blur();

    await screen.findByText("Day must be within 1-31.");
    await screen.findByText("Month must be within 1-12.");
    await screen.findByText("Year must be within 1900-2199.");
    await waitFor(() => {
      expect(screen.queryByText("Some help text")).not.toBeInTheDocument();
    });
  });

  it("invalid date", async () => {
    render(<FormWithDateInput label="Expiry date" />);

    const dayInput = screen.getByPlaceholderText("DD");
    const monthInput = screen.getByPlaceholderText("MM");
    const yearInput = screen.getByPlaceholderText("YYYY");

    await userEvent.type(dayInput, "31");
    await userEvent.type(monthInput, "02");
    await userEvent.type(yearInput, "2001");

    dayInput.focus();
    dayInput.blur();

    await screen.findByText("Invalid date.");
    await waitFor(() => {
      expect(screen.queryByText("Some help text")).not.toBeInTheDocument();
    });
  });

  it("inside dark container", () => {
    render(
      <Container bg="primary.blue.t100">
        <FormWithDateInput label="Expiry date" />
      </Container>
    );

    const dayInput = screen.getByPlaceholderText("DD");
    const monthInput = screen.getByPlaceholderText("MM");
    const yearInput = screen.getByPlaceholderText("YYYY");

    expect(dayInput).toHaveStyle({
      backgroundColor: "#ffffff",
    });
    expect(monthInput).toHaveStyle({
      backgroundColor: "#ffffff",
    });
    expect(yearInput).toHaveStyle({
      backgroundColor: "#ffffff",
    });
  });

  it("inside nested container", () => {
    render(
      <Container bg="primary.blue.t100">
        <Container>
          <FormWithDateInput label="Expiry date" />
        </Container>
      </Container>
    );

    const dayInput = screen.getByPlaceholderText("DD");

    expect(dayInput).toHaveStyle({
      backgroundColor: "#ffffff",
    });
  });

  it("with testId", () => {
    const { container } = render(
      <FormWithDateInput label="Expiry date" testId="my-date-input" />
    );

    expect(container.querySelector("form").firstChild).toHaveAttribute(
      "data-testid",
      "my-date-input"
    );
  });
});
