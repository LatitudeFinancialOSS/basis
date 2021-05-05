import React from "react";
import "@testing-library/jest-dom/extend-expect";
import { Form, Input, Button, useBasisForm } from "../..";

import {
  render,
  screen,
  userEvent,
  fireEvent,
  waitFor,
} from "../../utils/test";
import { SubmitHandler } from "react-hook-form";

interface SimpleFormValues {
  testInput: string;
}

interface SimpleFormProps {
  onSubmit?: SubmitHandler<SimpleFormValues>;
  validate?: (val: string) => string | string[] | null;
}

const SimpleForm = ({ onSubmit = () => {}, validate }: SimpleFormProps) => {
  const { methods, Field } = useBasisForm<SimpleFormValues>();

  return (
    <Form methods={methods} onSubmit={onSubmit}>
      <Field label="Test" name="testInput" as={Input} validate={validate} />
      <Button type="submit">Submit</Button>
    </Form>
  );
};

describe("Form", () => {
  it("should render a form with an input", () => {
    render(<SimpleForm />);

    const input = screen.getByLabelText("Test");
    expect(input).toBeInTheDocument();
  });

  it("should display required error when input blurred without value", async () => {
    render(<SimpleForm onSubmit={() => {}} />);

    const input = screen.getByLabelText("Test");

    expect(input).toBeValid();

    // focus input
    userEvent.tab();
    // blur the input
    userEvent.tab();

    await waitFor(() => expect(input).toBeInvalid());
    expect(screen.getByText("Required")).toBeInTheDocument();
  });

  it("should call onSubmit with values when form is submitted correctly", async () => {
    const submitHandler = jest.fn();
    render(<SimpleForm onSubmit={submitHandler} />);

    const input = screen.getByLabelText("Test");

    // can't use userEvent.type becuase of: https://github.com/testing-library/user-event/issues/387#issuecomment-819761470
    fireEvent.input(input, {
      target: {
        value: "some-data",
      },
    });

    // await userEvent.click(screen.getByRole("button", {
    //   name: "Submit"
    // }));
    userEvent.click(screen.getByText("Submit"));

    await waitFor(() => {
      expect(submitHandler.mock.calls[0][0]).toStrictEqual({
        testInput: "some-data",
      });
    });

    expect(submitHandler).toHaveBeenCalledTimes(1);
  });

  it("should give an error with validation message when custom validate is provided", async () => {
    const onSubmit = jest.fn();
    render(
      <SimpleForm
        onSubmit={onSubmit}
        validate={(val: string) => (val === "invalid" ? "Wrong" : null)}
      />
    );

    const input = screen.getByLabelText("Test");

    // can't use userEvent.type becuase of: https://github.com/testing-library/user-event/issues/387#issuecomment-819761470
    fireEvent.input(input, {
      target: {
        value: "invalid",
      },
    });

    userEvent.click(screen.getByText("Submit"));

    await waitFor(() => expect(input).toBeInvalid());
    expect(input).toHaveFocus();
    expect(onSubmit).not.toHaveBeenCalled();
    expect(screen.getByText("Wrong")).toBeInTheDocument();
  });
});
