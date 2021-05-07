import React from "react";
import * as allDesignSystem from "basis";
import ComponentContainer from "../../../components/ComponentContainer";
import { formatCode } from "../../../utils/formatting";

const scope = allDesignSystem;

function FormPage() {
  const code = formatCode(`
    function App() {
      const onSubmit = (...args) => {
        console.log(...args)
      };

      const { methods, Field } = useBasisForm();

      return (
        <Container padding="8">
          <Form methods={methods} onSubmit={onSubmit}>
            <Stack gap="8">
              <Field name="firstName" label="First Name" as={Input}/>
              <Field name="lastName" label="Last Name" as={Input}/>
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
