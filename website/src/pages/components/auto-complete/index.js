import React from "react";
import * as allDesignSystem from "basis";
import ComponentContainer from "../../../components/ComponentContainer";
import { formatCode } from "../../../utils/formatting";
import {
  mockAddressList,
  itemToString,
  EMPTY_ADDRESS_VALUE,
} from "../../../utils/autoComplete-utils";

const scope = {
  ...allDesignSystem,
  mockAddressList,
  itemToString,
  EMPTY_ADDRESS_VALUE,
};

function AutoCompletePage() {
  const code = formatCode(`
    // mockAddressList, itemToString and EMPTY_ADDRESS_VALUE are from './utils'

    const getItems = async ({ inputValue }) => {
      if (!inputValue) return []
      return mockAddressList
    }

    const CantFind = () => (
      <Container padding="6 4">
        <Text color="primary.blue.t100">
          <b>Can't find your address?</b>
        </Text>
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
            emptyValue={EMPTY_ADDRESS_VALUE}
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
