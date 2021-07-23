import React from "react";
import * as allDesignSystem from "basis";
import ComponentContainer from "../../../components/ComponentContainer";
import { formatCode } from "../../../utils/formatting";
import {
  mockAddressList,
  itemToString,
} from "../../../utils/autoComplete-utils";

const scope = {
  ...allDesignSystem,
  mockAddressList,
  itemToString,
};

function AutoCompletePage() {
  const code = formatCode(`
    // mockAddressList and itemToString are from './utils' folder

    const getItems = async ({ inputValue }) => {
      if (!inputValue) return []
      return mockAddressList
    }

    const CantFind = () => (
      <Container padding="4 6">
        <Link href="#" newTab={false}>
          <b>Can't find your address?</b>
        </Link>
      </Container>
    )

    function App() {
      const { methods, Field } = useBasisForm()

      return (
        <Form methods={methods}>
          <Field
            as={AutoComplete}
            name="address"
            label="Address"
            getItems={getItems}
            itemToString={itemToString}
            itemsFooter={CantFind}
          />
        </Form>
      )
    }

    render(<App />)
  `);

  return <ComponentContainer code={code} noInline scope={scope} width="sm" />;
}

export default AutoCompletePage;
