import React from "react";
import "@testing-library/jest-dom/extend-expect";
import {
  Form,
  Input,
  Button,
  useBasisForm,
} from "../..";

import { render, screen, userEvent, act, fireEvent } from "../../utils/test";
import { SubmitHandler } from "react-hook-form";


interface SimpleFormValues {
  testInput: string;
}

interface SimpleProps {
  onSubmit: SubmitHandler<SimpleFormValues>;
  validate?: any;
}

const SimpleForm = ({ onSubmit, validate }: SimpleProps) => {
  const { methods, Field } = useBasisForm<SimpleFormValues>();

  return (
    <Form methods={methods} onSubmit={onSubmit}>
      <Field label="Test" name="testInput" as={Input} validate={validate} />
      <Button type="submit">Submit</Button>
    </Form>
  )
}

describe('FormTwo', () => {
  it('should render the form', () => {
    render(<SimpleForm onSubmit={() => { }} />)

    const input = screen.getByLabelText("Test");
    expect(input).toBeInTheDocument();
  });

  it('should display required error when input blurred without value', async () => {
    render(<SimpleForm onSubmit={() => { }} />)

    const input = screen.getByLabelText("Test");

    await act(async () => {
      await userEvent.tab();
      await userEvent.tab()
    });

    expect(input).toBeInvalid();
    expect(screen.getByText("Required")).toBeInTheDocument();
  });

  it('should call onSubmit with values when form is submitted correctly', async () => {
    const submitHandler = jest.fn();
    render(<SimpleForm onSubmit={submitHandler} />)

    const input = screen.getByLabelText("Test");

    await act(async () => {
      // can't use userEvent.type becuase of: https://github.com/testing-library/user-event/issues/387#issuecomment-819761470
      await fireEvent.input(input, {
        target: {
          value: "some-data"
        }
      });

      await userEvent.click(screen.getByText("Submit"));
    });


    expect(submitHandler.mock.calls[0][0]).toStrictEqual({
      testInput: "some-data"
    });
  });


  it('should give an error with validation message when custom validate is provided', async () => {
    const submitHandler = jest.fn();
    render(<SimpleForm onSubmit={submitHandler} validate={(val: string) => val === "invalid" ? "Wrong" : null}/>)

    const input = screen.getByLabelText("Test");

    await act(async () => {
      // can't use userEvent.type becuase of: https://github.com/testing-library/user-event/issues/387#issuecomment-819761470
      await fireEvent.input(input, {
        target: {
          value: "invalid"
        }
      });

      await userEvent.click(screen.getByText("Submit"));
    });

    expect(input).toBeInvalid();
    expect(submitHandler).not.toHaveBeenCalled();
    expect(screen.getByText("Wrong")).toBeInTheDocument();
  });
})
