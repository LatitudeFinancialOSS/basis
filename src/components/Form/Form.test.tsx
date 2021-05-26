import React from "react";
import "@testing-library/jest-dom/extend-expect";
import {
  Form,
  Input,
  RadioGroup,
  Button,
  Select,
  DateInput,
  useBasisForm,
} from "../..";
import {
  render,
  screen,
  userEvent,
  fireEvent,
  waitFor,
} from "../../utils/test";
import { SubmitHandler } from "react-hook-form";
import { ValidationFunction } from "../../types";
import { DateInputValue, FrequencyValue } from "../../values";
import { Frequency } from "..";

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

interface ComplexFormValues {
  testInput: string;
  testRadio: "value1" | "value2";
  testSelect: string;
  testDateInput: DateInputValue;
  testFrequency: FrequencyValue;
}

const radioOptions = [
  { label: "Radio Option 1", value: "value1" },
  { label: "Radio Option 2", value: "value2" },
] as const;

const selectOptions = [
  { label: "Select Option 1", value: "value1" },
  { label: "Select Option 2", value: "value2" },
] as const;
interface ComplexFormProps {
  onSubmit?: SubmitHandler<SimpleFormValues>;
  validate?: (val: string) => string | string[] | null;
  testId?: string;
}

const validateDate: ValidationFunction<typeof DateInput> = (val, props) => {
  return val.day === "" && !props.optional ? { field: "Required date" } : null;
};

const ComplexForm = ({
  onSubmit = () => {},
  validate,
  testId,
}: ComplexFormProps) => {
  const { methods, Field } = useBasisForm<ComplexFormValues>();

  return (
    <Form testId={testId} methods={methods} onSubmit={onSubmit}>
      <Field
        label="Test Input"
        name="testInput"
        testId="field"
        as={Input}
        validate={validate}
      />
      <Field
        label="Test Radio"
        name="testRadio"
        testId="field"
        options={radioOptions}
        as={RadioGroup}
      />
      <Field
        label="Test Select"
        name="testSelect"
        testId="field"
        options={selectOptions}
        as={Select}
        validate={validate}
      />
      <Field
        label="Test DateInput"
        name="testDateInput"
        as={DateInput}
        validate={validateDate}
      />
      <Field
        label="Test Frequency"
        name="testFrequency"
        as={Frequency}
      />
      <Button type="submit">Submit</Button>
    </Form>
  );
};

describe("Form", () => {
  describe("SimpleForm", () => {
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

    it("should display required error when input only has space", async () => {
      render(<SimpleForm onSubmit={() => {}} />);

      const input = screen.getByLabelText("Test");

      expect(input).toBeValid();

      // focus input
      userEvent.tab();

      // can't use userEvent.type becuase of: https://github.com/testing-library/user-event/issues/387#issuecomment-819761470
      fireEvent.input(input, {
        target: {
          value: " ",
        },
      });

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

  describe("ComplexForm", () => {
    it("should render a form with variety of input types", () => {
      render(<ComplexForm testId="form" />);

      const form = screen.getByTestId("form");
      expect(form).toBeInTheDocument();
    });

    it("should have all fields invalid when submit is called without values", async () => {
      render(<ComplexForm />);

      const fields = screen.getAllByTestId("field");

      fields.forEach((field) => expect(field).toBeValid());

      userEvent.click(screen.getByText("Submit"));

      await waitFor(() =>
        fields.forEach((field) => expect(field).toBeInvalid())
      );

      expect(screen.getByText("Required date")).toBeInTheDocument();
      expect(fields[0]).toHaveFocus();
    });

    it("should call onSubmit with correct values", async () => {
      const submitHandler = jest.fn();
      render(<ComplexForm onSubmit={submitHandler} />);

      // can't use userEvent.type becuase of: https://github.com/testing-library/user-event/issues/387#issuecomment-819761470
      fireEvent.input(screen.getByLabelText("Test Input"), {
        target: {
          value: "some-data",
        },
      });

      userEvent.click(screen.getByLabelText("Radio Option 1"));
      userEvent.selectOptions(screen.getByLabelText("Test Select"), ["value2"]);

      // can't use userEvent.type becuase of: https://github.com/testing-library/user-event/issues/387#issuecomment-819761470
      fireEvent.input(screen.getByLabelText("day"), {
        target: {
          value: "1",
        },
      });
      fireEvent.input(screen.getByLabelText("month"), {
        target: {
          value: "2",
        },
      });
      fireEvent.input(screen.getByLabelText("year"), {
        target: {
          value: "2020",
        },
      });

      fireEvent.input(screen.getByLabelText("amount"), {
        target: {
          value: "200",
        },
      });
      userEvent.click(screen.getByLabelText("Monthly"));

      userEvent.click(screen.getByText("Submit"));

      await waitFor(() => {
        expect(submitHandler.mock.calls[0][0]).toStrictEqual({
          testInput: "some-data",
          testRadio: "value1",
          testSelect: "value2",
          testDateInput: {
            day: "1",
            month: "2",
            year: "2020",
          },
          testFrequency: {
            amount: "200",
            frequency: "monthly"
          }
        });
      });

      expect(submitHandler).toHaveBeenCalledTimes(1);
    });
  });
});
