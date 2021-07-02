import React from "react";
import * as allDesignSystem from "basis";
import ComponentContainer from "../../../components/ComponentContainer";
import { formatCode } from "../../../utils/formatting";

const scope = allDesignSystem;

function FormPage() {
  const code = formatCode(`
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
    ]

    function App() {
      const onSubmit = (...args) => {
        console.log(...args)
      };

      const { methods, Field, CustomField } = useBasisForm();

      return (
        <Container padding="8">
          <Form methods={methods} onSubmit={onSubmit}>
            <Stack gap="8">
              <Text as="h2" textStyle="heading4">About you</Text>
              <Field name="name" label="Name" as={Input}/>
              <Field name="relationshipStatus" label="Relationship status" options={relationshipStatusOptions} as={Select} />
              <Field label="Do you like ice cream?" hideLabel name="likeIceCream" helpText="You MUST like it!" as={Checkbox}>I like ice cream</Field>
              <Field name="hungry" label="Are you hungry?" options={hungryOptions} as={RadioGroup}/>
              <Field name="salary" label="Salary (before tax)" amountPrefix="$" as={Frequency}/>
              <Field name="birthDate" label="Birth date" as={DateInput}/>
              <Field name="aboutYourself" label="Tell us about yourself" height="100" as={Textarea}/>
              <CustomField
              name="testCustomInput"
              defaultValue=""
              validate={(val) => (val === "" ? "Required" : null)}
            >
              {(props) => (
                <Input label="Custom Input" {...props} testId="field" />
              )}
            </CustomField>
              <Field
                name="simpleList"
                label="Simple items"
                placeholder=""
                isLoading={false}
                items={["item1", "item2"]}
                as={AutoComplete}
              />
              <Button type="submit">Submit</Button>
            </Stack>
          </Form>
        </Container>
      );
    }

    render(<App />);
  `);

  return <ComponentContainer code={code} noInline scope={scope} width="sm" />;
}

export default FormPage;
