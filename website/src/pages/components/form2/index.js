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

      const { methods, Field } = useBasisForm();

      return (
        <Container padding="8">
          <Form methods={methods} onSubmit={onSubmit}>
            <Stack gap="8">
              <Text as="h2" textStyle="heading4">About you</Text>
              <Field name="name" label="Name" as={Input}/>
              <Field name="relationshipStatus" label="Relationship status" options={relationshipStatusOptions} as={Select} />
              <Field name="hungry" label="Are you hungry?" options={hungryOptions} as={RadioGroup}/>
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
