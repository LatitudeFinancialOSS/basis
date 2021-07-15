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
} from "../../../utils/autoComplete-utils";

const scope = {
  ...allDesignSystem,
  mockAddressList,
  itemToString,
  typeAhead,
  useCombobox,
  timeout,
};

function AutoCompletePage() {
  const code = formatCode(`
  // mockAddressList, itemToString, typeAheadm, timeout from './utils' folder

function App() {
  const { methods, Field } = useBasisForm()

  const fetchAddress = async ({ inputValue }) => {
    if (!inputValue) return []
    return mockAddressList
  }
  const CantFind = () => (
    <Link
      href="#"
      newTab={false}
    >
        <b>Can't find your address?</b>
    </Link>
  )

  return (
    <Form methods={methods} onSubmit={console.log}>
        <Field
          name="myAddress"
          label="Address"
          getItems={fetchAddress}
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
