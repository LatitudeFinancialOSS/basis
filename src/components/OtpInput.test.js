import React from "react";
import { render, screen, waitFor, fireEvent } from "../utils/test";
import "@testing-library/jest-dom/extend-expect";
import Form from "./Form";
import OtpInput from "./OtpInput";

function FormWithOtpInput(props) {
  const initialValues = {
    otp: "",
  };

  return (
    <Form initialValues={initialValues}>
      <OtpInput name="otp" {...props} />
    </Form>
  );
}

describe("OtpInput", () => {
  it("renders correctly", () => {
    render(<FormWithOtpInput label="Enter OTP" testId="otp" />);
    expect(screen.getByTestId("otp")).toBeInTheDocument();
  });

  it("renders default number of inputs", () => {
    render(<FormWithOtpInput label="Enter OTP" />);
    const inputs = screen.getAllByRole("textbox");
    expect(inputs.length).toBe(6);
  });

  it("becomes disabled when the disabled prop is true", () => {
    render(<FormWithOtpInput label="Enter OTP" disabled />);
    const inputs = screen.getAllByRole("textbox");
    inputs.forEach((input) => {
      expect(input).toBeDisabled();
    });
  });

  it("calls onChange when value changes", () => {
    const onChange = jest.fn();
    render(<FormWithOtpInput label="Enter OTP" onChange={onChange} />);
    const firstInput = screen.getAllByRole("textbox")[0];
    fireEvent.change(firstInput, { target: { value: "1" } });
    expect(onChange).toHaveBeenCalledWith("1");
  });

  it("displays an error message for invalid input", async () => {
    render(<FormWithOtpInput label="Enter OTP" />);
    const firstInput = screen.getAllByRole("textbox")[0];
    fireEvent.change(firstInput, { target: { value: "1" } });
    fireEvent.blur(firstInput);
    await waitFor(() => {
      expect(screen.getByText("Must be 6 digits")).toBeInTheDocument();
    });
  });
});
