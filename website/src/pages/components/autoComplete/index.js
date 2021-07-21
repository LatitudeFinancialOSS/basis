import React from "react";
import { useCombobox } from "downshift";
import * as allDesignSystem from "basis";
import ComponentContainer from "../../../components/ComponentContainer";
import { formatCode } from "../../../utils/formatting";
import {
  mockAddressList,
  itemToString,
  typeAhead,
  timeout,
  EMPTY_ADDRESS_VALUE,
} from "../../../utils/autoComplete-utils";

const scope = {
  ...allDesignSystem,
  mockAddressList,
  itemToString,
  typeAhead,
  useCombobox,
  timeout,
  EMPTY_ADDRESS_VALUE,
};

function AutoCompletePage() {
  const code = formatCode(`
  // mockAddressList, itemToString, typeAheadm, timeout, EMPTY_ADDRESS_VALUE from './utils' folder

function App() {
  const { methods, Field } = useBasisForm()

  const fetchAddress = async ({ inputValue }) => {
    if (!inputValue) return []
    return mockAddressList
  }
  const CantFind = () => (
    <div>
    <Text color="primary.blue.t100">
      <b>Can't find your address?</b>
    </Text>
  </div>
  )

  return (
    <Form methods={methods} onSubmit={console.log}>
        <Field
          name="myAddress"
          label="Address"
          getItems={fetchAddress}
          emptyValue={EMPTY_ADDRESS_VALUE}
          itemToString={itemToString}
          itemsFooter={CantFind}
          as={AutoComplete}
        />
        </Form>

  )
}

render(<App />)


  `);

  return <ComponentContainer code={code} noInline scope={scope} width="sm" />;
}

export default AutoCompletePage;
