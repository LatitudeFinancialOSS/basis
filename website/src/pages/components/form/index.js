import React from "react";
import * as allDesignSystem from "basis";
import ComponentContainer from "../../../components/ComponentContainer";
import { formatCode } from "../../../utils/formatting";

const scope = allDesignSystem;

function FormPage() {
  const code = formatCode(`
    function App() {
      const initialValues = {
        name: "",
        relationshipStatus: "",
        likeIceCream: false,
        hungry: "",
        salary: {
          amount: "",
          frequency: ""
        },
        birthDate: {
          day: "",
          month: "",
          year: ""
        },
        age: {
          years: "",
          months: ""
        },
      };
      const relationshipStatusOptions = [
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
      const onSubmit = ({ errors, values }) => {
        if (Object.keys(errors).length > 0) {
          console.log("Errors:", JSON.stringify(errors, null, 2));
        } else {
          console.log("Submitting:", JSON.stringify(values, null, 2));
        }
      };
    
      return (
        <Container padding="8">
          <Form initialValues={initialValues} onSubmit={onSubmit}>
            <Grid rowsGutter="8">
              <Text as="h2" textStyle="heading4">About you</Text>
              <Input name="name" label="Name" />
              <Select name="relationshipStatus" label="Relationship status" options={relationshipStatusOptions} />
              <Checkbox name="likeIceCream" helpText="You MUST like it!">I like ice cream</Checkbox>
              <RadioGroup name="hungry" label="Are you hungry?" options={hungryOptions} />
              <Frequency name="salary" label="Salary" />
              <DatePicker name="birthDate" label="Birth date" />
              <TimeSpan name="age" label="Age" />
              <Button type="submit">Submit</Button>
            </Grid>
          </Form>
        </Container>
      );
    }
  `);

  return <ComponentContainer code={code} scope={scope} width="sm" />;
}

export default FormPage;
