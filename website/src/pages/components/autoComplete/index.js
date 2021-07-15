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
  const CantFind = ({ closeMenu }) => (
    <Link
      href="#"
      newTab={false}
      onClick={() => {
        closeMenu();
      }}
    >
      <span>
        <b>Can't find your address?</b>
      </span>
    </Link>
  )

  return (
    <Form methods={methods} onSubmit={console.log}>
      <Stack gap="8">
        <Field
          name="simpleList"
          label="Simple items"
          getItems={() => ["item1", "item2"]}
          as={AutoComplete}
        />

        <Field
          name="myAddress"
          label="Address Auto Complete"
          placeholder="Search Address here!"
          getItems={fetchAddress}
          itemToString={itemToString}
          itemsFooter={CantFind}
          as={AutoComplete}
        />

        <Field
          name="typeAhead"
          label="Type Ahead"
          optional
          placeholder="Type abcde.... "
          getItems={typeAhead}
          itemToString={(value) =>
            value ? value.text : ""
          }
          as={AutoComplete}
        />
        <Button type="submit">Get started</Button>
      </Stack>
    </Form>
  )
}

render(<App />)


  `);

  return <ComponentContainer code={code} noInline scope={scope} width="sm" />;
}

export default AutoCompletePage;
