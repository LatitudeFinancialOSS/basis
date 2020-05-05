import React from "react";
import "@testing-library/jest-dom/extend-expect";
import {
  Form,
  Grid,
  Text,
  Input,
  Checkbox,
  TimeSpan,
  DatePicker,
  Frequency,
  RadioGroup,
  Select,
  Button,
} from ".";
import { render, fireEvent } from "../utils/test";

const relationshipStatusOptions = [
  {
    label: "Single",
    value: "single",
  },
  {
    label: "Married",
    value: "married",
  },
  {
    label: "Other",
    value: "other",
  },
];
const hungryOptions = [
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

// eslint-disable-next-line react/prop-types
function SimpleForm({ testId }) {
  const initialValues = {
    name: "",
  };

  return (
    <Form initialValues={initialValues} testId={testId}>
      <Input name="name" label="Name" />
    </Form>
  );
}

// eslint-disable-next-line react/prop-types
function ComplexForm({ onSubmit }) {
  const initialValues = {
    name: "",
    relationshipStatus: "",
    likeIceCream: false,
    hungry: "",
    salary: {
      amount: "",
      frequency: "",
    },
    birthDate: {
      day: "",
      month: "",
      year: "",
    },
    age: {
      years: "",
      months: "",
    },
  };

  return (
    <Form initialValues={initialValues} onSubmit={onSubmit}>
      {() => (
        <Grid rowsGap="8">
          <Text as="h2" textStyle="heading4">
            About you
          </Text>
          <Input name="name" label="Name" />
          <Select
            name="relationshipStatus"
            label="Relationship status"
            options={relationshipStatusOptions}
          />
          <Checkbox
            label="Do you like ice cream?"
            hideLabel
            name="likeIceCream"
            helpText="You MUST like it!"
          >
            I like ice cream
          </Checkbox>
          <RadioGroup
            name="hungry"
            label="Are you hungry?"
            options={hungryOptions}
          />
          <Frequency name="salary" label="Salary" />
          <DatePicker name="birthDate" label="Birth date" />
          <TimeSpan name="age" label="Age" />
          <Button type="submit">Submit</Button>
        </Grid>
      )}
    </Form>
  );
}

describe("Form", () => {
  it("renders a form", () => {
    const { container } = render(<SimpleForm />);

    expect(container.firstChild.tagName).toBe("FORM");
  });

  it("calls onSubmit with the right params", () => {
    const onSubmit = jest.fn();
    const { getByText } = render(<ComplexForm onSubmit={onSubmit} />);

    fireEvent.click(getByText("Submit"));
    expect(onSubmit).toBeCalledWith({
      errors: {
        age: ["Must be at least 1 month."],
        hungry: ["Please make a selection."],
        likeIceCream: ["Must be checked"],
        name: ["Required"],
        relationshipStatus: ["Please make a selection."],
        salary: ["Please enter a valid amount.", "Please select a frequency."],
        birthDate: [
          "Day must be within 1-31.",
          "Month must be within 1-12.",
          "Year must be within 1800-2200.",
        ],
      },
      values: {
        age: {
          months: "",
          years: "",
        },
        hungry: "",
        likeIceCream: false,
        name: "",
        relationshipStatus: "",
        salary: {
          amount: "",
          frequency: "",
        },
        birthDate: {
          day: "",
          month: "",
          year: "",
        },
      },
    });
  });

  it("with testId", () => {
    const { container } = render(<SimpleForm testId="my-form" />);

    expect(container.firstChild).toHaveAttribute("data-testid", "my-form");
  });
});
