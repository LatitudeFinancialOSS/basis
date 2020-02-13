import React, { useState, useRef } from "react";
import "@testing-library/jest-dom/extend-expect";
import {
  Form,
  Input,
  Checkbox,
  TimeSpan,
  DatePicker,
  Frequency,
  RadioGroup,
  Select,
  Button
} from ".";
import { render, fireEvent } from "../utils/test";

const hungryOptions = [
  {
    label: "Yes",
    value: "yes"
  },
  {
    label: "No",
    value: "no"
  },
  {
    label: "Maybe",
    value: "maybe"
  }
];
const relationshipOptions = [
  {
    label: "Single",
    value: "single"
  },
  {
    label: "Married",
    value: "married"
  },
  {
    label: "Other",
    value: "other"
  }
];

// eslint-disable-next-line react/prop-types
function SimpleForm({ testId }) {
  const [name, setName] = useState({
    value: ""
  });

  return (
    <Form onSubmit={() => {}} testId={testId}>
      <Input label="Name" data={name} onChange={setName} />
    </Form>
  );
}

// eslint-disable-next-line react/prop-types
function ComplexForm({ onSubmit }) {
  const formRef = useRef();
  const [name, setName] = useState({
    value: ""
  });
  const [showAge, setShowAge] = useState({
    value: false
  });
  const [age, setAge] = useState({
    value: {
      years: "",
      months: ""
    }
  });
  const [weddingDate, setWeddingDate] = useState({
    value: {
      day: "",
      month: "",
      year: ""
    }
  });
  const [salary, setSalary] = useState({
    value: {
      input: "",
      frequency: ""
    }
  });
  const [hungry, setHungry] = useState({
    value: ""
  });
  const [relationshipStatus, setRelationshipStatus] = useState({
    value: ""
  });

  return (
    <Form
      onSubmit={e => {
        e.preventDefault();
        onSubmit(formRef.current.validateForm());
      }}
      ref={formRef}
    >
      <Input label="Name" data={name} onChange={setName} />
      <Checkbox data={showAge} onChange={setShowAge}>
        Show age
      </Checkbox>
      <TimeSpan label="Age" data={age} onChange={setAge} />
      <DatePicker
        label="Wedding date"
        data={weddingDate}
        onChange={setWeddingDate}
      />
      <Frequency label="Salary" data={salary} onChange={setSalary} />
      <RadioGroup
        label="Are you hungry?"
        options={hungryOptions}
        data={hungry}
        onChange={setHungry}
      />
      <Select
        label="Relationship status"
        options={relationshipOptions}
        data={relationshipStatus}
        onChange={setRelationshipStatus}
      />
      <Button type="submit">Submit</Button>
    </Form>
  );
}

describe("Form", () => {
  it("renders a form", () => {
    const { container } = render(<SimpleForm />);

    expect(container.firstChild.tagName).toBe("FORM");
  });

  it("validates all form elements on submit", () => {
    const onSubmit = jest.fn();
    const { getByText } = render(<ComplexForm onSubmit={onSubmit} />);

    fireEvent.click(getByText("Submit"));
    expect(onSubmit).toBeCalledWith(12);
  });

  it("with testId", () => {
    const { container } = render(<SimpleForm testId="my-form" />);

    expect(container.firstChild).toHaveAttribute("data-testid", "my-form");
  });
});
