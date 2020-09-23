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
import { render, screen, userEvent, waitFor } from "../utils/test";

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
function ComplexForm({ onSubmit, initialValues }) {
  const formInitialValues = {
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
    ...initialValues,
  };

  return (
    <Form initialValues={formInitialValues} onSubmit={onSubmit}>
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

  it("calls onSubmit with the right params", async () => {
    const onSubmit = jest.fn();

    render(<ComplexForm onSubmit={onSubmit} />);

    userEvent.click(screen.getByRole("button", "Submit"));

    await waitFor(() =>
      expect(onSubmit).toBeCalledWith({
        errors: {
          age: ["Must be at least 1 month."],
          hungry: ["Please make a selection."],
          likeIceCream: ["Must be checked"],
          name: ["Required"],
          relationshipStatus: ["Please make a selection."],
          salary: ["Please enter an amount.", "Please select a frequency."],
          birthDate: ["Required"],
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
        setErrors: expect.any(Function),
      })
    );
  });

  it("setErrors", async () => {
    const onSubmit = jest.fn().mockImplementation(({ setErrors }) => {
      setTimeout(() => {
        setErrors({
          name: ["This name is already taken.", "Try to spell it differently."],
          age: "You look too young.",
        });
      }, 100);
    });

    render(
      <ComplexForm
        initialValues={{
          name: "David",
          relationshipStatus: "married",
          likeIceCream: true,
          hungry: "no",
          salary: {
            amount: "75000",
            frequency: "annually",
          },
          birthDate: {
            day: "18",
            month: "04",
            year: "1982",
          },
          age: {
            years: "16",
            months: "5",
          },
        }}
        onSubmit={onSubmit}
      />
    );

    userEvent.click(screen.getByRole("button", "Submit"));

    await waitFor(() => {
      expect(
        screen.getByText("This name is already taken.")
      ).toBeInTheDocument();
      expect(
        screen.getByText("Try to spell it differently.")
      ).toBeInTheDocument();
      expect(screen.getByText("You look too young.")).toBeInTheDocument();
    });

    userEvent.type(screen.getByLabelText("Name"), "Helena");

    await waitFor(() => {
      expect(
        screen.queryByText("This name is already taken.")
      ).not.toBeInTheDocument();
      expect(
        screen.queryByText("Try to spell it differently.")
      ).not.toBeInTheDocument();
    });
  });

  it("with testId", () => {
    const { container } = render(<SimpleForm testId="my-form" />);

    expect(container.firstChild).toHaveAttribute("data-testid", "my-form");
  });
});
