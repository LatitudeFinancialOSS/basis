/* eslint-disable react/prop-types */
import React, { useState, useEffect } from "react";
import "@testing-library/jest-dom/extend-expect";
import {
  Button,
  Checkbox,
  CheckboxGroup,
  DateInput,
  Form,
  Frequency,
  Input,
  RadioGroup,
  Select,
  Stack,
  Text,
  Textarea,
  TimeSpan,
} from "..";
import { render, screen, userEvent, waitFor } from "../../utils/test";

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
const fruitOptions = [
  {
    key: "apple",
    label: "Apple",
  },
  {
    key: "banana",
    label: "Banana",
  },
  {
    key: "lemon",
    label: "Lemon",
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

const yesNoOptions = [
  {
    label: "Yes",
    value: "yes",
  },
  {
    label: "No",
    value: "no",
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
    fruits: {
      apple: false,
      banana: false,
      lemon: false,
    },
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
        <Stack gap="8">
          <Text as="h2" textStyle="heading4">
            About you
          </Text>
          <Input name="name" label="Name" />
          <Select
            name="relationshipStatus"
            label="Relationship status"
            options={relationshipStatusOptions}
          />
          <CheckboxGroup
            name="fruits"
            label="Which fruits do you like?"
            options={fruitOptions}
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
          <DateInput name="birthDate" label="Birth date" />
          <TimeSpan name="age" label="Age" />
          <Textarea
            name="aboutYourself"
            label="Tell us about yourself"
            height="100"
          />
          <Input name="address.streetNumber" label="Street number" />
          <Input name="address.streetName" label="Street name" />
          <Button type="submit">Submit</Button>
        </Stack>
      )}
    </Form>
  );
}

describe("Form_deprecated", () => {
  it("renders a form", () => {
    const { container } = render(<SimpleForm />);

    expect(container.querySelector("form")).toBeInTheDocument();
  });

  it("calls onSubmit with the right params", async () => {
    const onSubmit = jest.fn();

    render(<ComplexForm onSubmit={onSubmit} />);

    userEvent.click(screen.getByRole("button", "Submit"));

    await waitFor(() =>
      expect(onSubmit).toBeCalledWith({
        errors: {
          age: ["Must be at least 1 month."],
          fruits: ["Please make a selection."],
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
          fruits: {
            apple: false,
            banana: false,
            lemon: false,
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

    expect(
      screen.queryByText("This name is already taken.")
    ).not.toBeInTheDocument();
    expect(
      screen.queryByText("Try to spell it differently.")
    ).not.toBeInTheDocument();
  });

  it("doesn't validate fields when they become disabled", async () => {
    render(
      <Form
        initialValues={{
          nameDisabled: false,
          name: "",
        }}
      >
        {({ state, validateField }) => {
          return (
            <Stack gap="8">
              <Checkbox
                name="nameDisabled"
                label="Is name disabled?"
                hideLabel
                testId="checkbox"
              >
                Is name disabled?
              </Checkbox>
              <Input
                name="name"
                label="Name"
                disabled={state.values.nameDisabled}
              />
              <Button
                onClick={() => {
                  validateField("name");
                }}
              >
                Validate name
              </Button>
            </Stack>
          );
        }}
      </Form>
    );

    userEvent.click(screen.getByTestId("checkbox").querySelector("label"));
    userEvent.click(screen.getByRole("button", { name: "Validate name" }));

    await waitFor(() => {
      expect(screen.queryByText("Required")).not.toBeInTheDocument();
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

    expect(container.querySelector("form")).toHaveAttribute(
      "data-testid",
      "my-form"
    );
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

it("with hidden fields", async () => {
  const onSubmit = jest.fn();
  const { container } = render(
    <Form
      initialValues={{ hasMiddleName: "", middleName: "" }}
      onSubmit={onSubmit}
    >
      {({ state }) => (
        <>
          <RadioGroup
            name="hasMiddleName"
            label="Do you have a middle name?"
            options={yesNoOptions}
          />
          {state.values.hasMiddleName === "yes" && (
            <Input name="middleName" label="Middle name" />
          )}
          <Button type="submit">Submit</Button>
        </>
      )}
    </Form>
  );

  const yesInput = screen.getByLabelText("Yes");
  const yesLabel = container.querySelector(
    `label[for="${yesInput.getAttribute("id")}"]`
  );
  const noInput = screen.getByLabelText("No");
  const noLabel = container.querySelector(
    `label[for="${noInput.getAttribute("id")}"]`
  );

  userEvent.click(yesLabel);

  const middleNameInput = screen.getByLabelText("Middle name");
  middleNameInput.focus();
  middleNameInput.blur();

  // Wait until form state is updated with the error.
  // Without this await, the test ends before form's state gets the error.
  await waitFor(() => {
    expect(screen.getByText("Required")).toBeInTheDocument();
  });

  userEvent.click(noLabel);
  screen.getByRole("button", { name: "Submit" }).click();

  await waitFor(() =>
    expect(onSubmit).toBeCalledWith({
      errors: {},
      values: {
        hasMiddleName: "no",
        middleName: "",
      },
      setErrors: expect.any(Function),
    })
  );
});
