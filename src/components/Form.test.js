/* eslint-disable react/prop-types */
import React, { useState, useEffect } from "react";
import "@testing-library/jest-dom/extend-expect";
import {
  Button,
  Checkbox,
  DatePicker,
  Form,
  Frequency,
  Grid,
  Input,
  RadioGroup,
  Select,
  Text,
  Textarea,
  TimeSpan,
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

function ComplexForm({
  initialValues,
  initialErrors,
  onSubmit,
  unMountFormOnSubmit = false,
}) {
  const [isSubmitted, setIsSubmitted] = useState(false);
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
    aboutYourself: "",
    address: {
      streetNumber: "",
      streetName: "",
    },
    ...initialValues,
  };

  if (isSubmitted) {
    return <div>Congrats!</div>;
  }

  return (
    <Form
      initialValues={formInitialValues}
      initialErrors={initialErrors}
      onSubmit={(args) => {
        onSubmit(args);

        if (unMountFormOnSubmit) {
          setIsSubmitted(true);
        }
      }}
    >
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
          <Textarea
            name="aboutYourself"
            label="Tell us about yourself"
            height="100"
          />
          <Input name="address.streetNumber" label="Street number" />
          <Input name="address.streetName" label="Street name" />
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
          aboutYourself: ["Required"],
          address: {
            streetNumber: ["Required"],
            streetName: ["Required"],
          },
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
          aboutYourself: "",
          address: {
            streetNumber: "",
            streetName: "",
          },
        },
        setErrors: expect.any(Function),
      })
    );
  });

  it("doesn't throw errors if the form is unmounted after submission", async () => {
    const onSubmit = jest.fn();

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
          aboutYourself: "I like chess",
          address: {
            streetNumber: "22",
            streetName: "The Esplanade",
          },
        }}
        onSubmit={onSubmit}
        unMountFormOnSubmit
      />
    );

    screen.getByLabelText("Name").focus();
    userEvent.click(screen.getByRole("button", "Submit"));

    await waitFor(() => {
      expect(onSubmit).toBeCalled();
    });
  });

  it("sets state correctly when setErrors to be called from onSubmit", async () => {
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
          aboutYourself: "I like chess",
          address: {
            streetNumber: "22",
            streetName: "The Esplanade",
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

  it("with initialErrors", () => {
    const initialErrors = {
      name: ["This name is already taken."],
      aboutYourself: ["You can't use inappropriate words.", "Max 500 words."],
      address: {
        streetNumber: ["Please enter a street number"],
      },
    };

    render(<ComplexForm initialErrors={initialErrors} />);

    expect(screen.getByText("This name is already taken.")).toBeInTheDocument();
    expect(
      screen.getByText("You can't use inappropriate words.")
    ).toBeInTheDocument();
    expect(screen.getByText("Max 500 words.")).toBeInTheDocument();
    expect(
      screen.getByText("Please enter a street number")
    ).toBeInTheDocument();
  });

  it("with testId", () => {
    const { container } = render(<SimpleForm testId="my-form" />);

    expect(container.firstChild).toHaveAttribute("data-testid", "my-form");
  });

  describe("calling exposed functions from render child", () => {
    it("sets form state correctly when setErrors is called", async () => {
      const initialValues = {
        name: "",
        age: "",
        address: { streetNumber: "", streetName: "" },
      };

      const initialErrors = {
        name: ["Please enter a name"],
        age: ["Please enter an age"],
      };

      const RenderChild = ({ setErrors, state }) => {
        useEffect(() => {
          if (state.values.name === "Helena") {
            setErrors({
              name: [
                "This name is already taken",
                "Try to spell it differently",
              ],
              "address.streetNumber": "Please enter a street number",
            });
          }
        }, [setErrors, state.values.name]);

        return (
          <>
            <Input name="name" label="Name" />
            <Input name="age" label="Age" />
            <Input name="address.streetNumber" label="Street number" />
            <Input name="address.streetName" label="Street name" />
          </>
        );
      };

      render(
        <Form initialValues={initialValues} initialErrors={initialErrors}>
          {RenderChild}
        </Form>
      );

      expect(
        screen.queryByText("This name is already taken")
      ).not.toBeInTheDocument();
      expect(
        screen.queryByText("Try to spell it differently")
      ).not.toBeInTheDocument();
      expect(screen.queryByText("Please enter a name")).toBeInTheDocument();
      expect(screen.queryByText("Please enter an age")).toBeInTheDocument();
      expect(
        screen.queryByText("Please enter a street number")
      ).not.toBeInTheDocument();

      userEvent.type(screen.getByLabelText("Name"), "Helena");

      await waitFor(() => {
        expect(
          screen.queryByText("This name is already taken")
        ).toBeInTheDocument();
        expect(
          screen.queryByText("Try to spell it differently")
        ).toBeInTheDocument();
        expect(
          screen.queryByText("Please enter a name")
        ).not.toBeInTheDocument();
        expect(screen.queryByText("Please enter an age")).toBeInTheDocument();

        expect(
          screen.queryByText("Please enter a street number")
        ).toBeInTheDocument();
      });
    });

    it("sets form state to initial values when resetForm is called without argument", async () => {
      const initialValues = {
        name: "",
        address: { streetNumber: "", streetName: "" },
      };
      const initialErrors = {
        name: ["Please enter a name"],
        address: { streetNumber: ["Please enter a street number"] },
      };

      const RenderChild = ({ resetForm }) => (
        <>
          <Input name="name" label="Name" />
          <Input name="address.streetNumber" label="Street number" />
          <Input name="address.streetName" label="Street name" />
          <Button
            testId="resetButton"
            onClick={() => {
              resetForm();
            }}
          >
            Reset
          </Button>
        </>
      );

      render(
        <Form initialValues={initialValues} initialErrors={initialErrors}>
          {RenderChild}
        </Form>
      );

      expect(screen.queryByText("Please enter a name")).toBeInTheDocument();
      expect(
        screen.queryByText("Please enter a street number")
      ).toBeInTheDocument();
      expect(screen.getByLabelText("Name")).toHaveValue("");
      expect(screen.getByLabelText("Street name")).toHaveValue("");

      userEvent.type(screen.getByLabelText("Name"), "Helena");
      userEvent.type(screen.getByLabelText("Street number"), "22");

      await waitFor(() => {
        expect(
          screen.queryByText("Please enter a name")
        ).not.toBeInTheDocument();
        expect(
          screen.queryByText("Please enter a street number")
        ).not.toBeInTheDocument();
        expect(screen.getByLabelText("Name")).toHaveValue("Helena");
        expect(screen.getByLabelText("Street number")).toHaveValue("22");
      });

      userEvent.click(screen.getByTestId("resetButton"));

      await waitFor(() => {
        expect(screen.queryByText("Please enter a name")).toBeInTheDocument();
        expect(
          screen.queryByText("Please enter a street number")
        ).toBeInTheDocument();
        expect(screen.getByLabelText("Name")).toHaveValue("");
        expect(screen.getByLabelText("Street name")).toHaveValue("");
      });
    });

    it("sets form state to new values when resetForm is called with argument", async () => {
      const initialValues = {
        name: "Helena",
        address: { streetNumber: "22", streetName: "" },
      };
      const initialErrors = {};

      const newValues = {
        name: "Bob",
        address: { streetNumber: "1", streetName: "" },
      };
      const newErrors = {
        name: ["Please enter a name"],
        address: { streetNumber: ["Please enter a street number"] },
      };

      const RenderChild = ({ resetForm }) => (
        <>
          <Input name="name" label="Name" />
          <Input name="address.streetNumber" label="Street number" />
          <Input name="address.streetName" label="Street name" />
          <Button
            testId="resetButton"
            onClick={() => {
              resetForm({ values: newValues, errors: newErrors });
            }}
          >
            Reset
          </Button>
        </>
      );

      render(
        <Form initialValues={initialValues} initialErrors={initialErrors}>
          {RenderChild}
        </Form>
      );

      expect(screen.queryByText("Please enter a name")).not.toBeInTheDocument();
      expect(
        screen.queryByText("Please enter a street number")
      ).not.toBeInTheDocument();
      expect(screen.getByLabelText("Name")).toHaveValue("Helena");
      expect(screen.getByLabelText("Street number")).toHaveValue("22");

      userEvent.click(screen.getByTestId("resetButton"));

      await waitFor(() => {
        expect(screen.queryByText("Please enter a name")).toBeInTheDocument();
        expect(
          screen.queryByText("Please enter a street number")
        ).toBeInTheDocument();
        expect(screen.getByLabelText("Name")).toHaveValue("Bob");
        expect(screen.getByLabelText("Street number")).toHaveValue("1");
      });
    });
  });
});
