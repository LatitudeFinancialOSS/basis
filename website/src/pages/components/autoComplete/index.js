import React from "react";
import { useCombobox } from "downshift";
import * as allDesignSystem from "basis";
import ComponentContainer from "../../../components/ComponentContainer";
import { formatCode } from "../../../utils/formatting";
import {
  mockAddressList,
  itemToString,
  typeAhead,
} from "./utils/mockAddressList";

const scope = {
  ...allDesignSystem,
  mockAddressList,
  itemToString,
  typeAhead,
  useCombobox,
};

function AutoCompletePage() {
  const code = formatCode(`
  // mockAddressList, itemToString, typeAhead from './utils' folder

  const useData = () => {
    const [items, setItems] = React.useState([])
    const [loading, setLoading] = React.useState(false)
  
    const fetch = (inputValue) => {
      if (!inputValue) return []
      setLoading(true)
      setTimeout(() => {
        setItems(mockAddressList)
        setLoading(false)
        return mockAddressList
      }, 1000)
    }
  
    return { fetch, items, loading }
  }
  
  const useTypeAhead = () => {
    const [items, setItems] = React.useState([])
    const [loading, setLoading] = React.useState(false)
  
    const fetch = (inputValue) => {
      if (!inputValue) return []
      setLoading(true)
      setTimeout(() => {
        setLoading(false)
        const data = typeAhead(inputValue)
        setItems(data)
        return data
      }, 1000)
    }
    return { fetch, items, loading }
  }
  
  function App() {
    const { methods, Field } = useBasisForm()
    const { fetch, items = [], loading } = useData()
    const {
      fetch: fetch2,
      items: items2 = [],
      loading: loading2,
    } = useTypeAhead()
  
    const onInputValueChange = (changed) => {
      fetch(changed.inputValue)
    }
  
    const typeAheadInputChange = (changed) => {
      fetch2(changed.inputValue)
    }
  
    const typeAheadReducer = (
      state,
      actionAndChanges
    ) => {
      const { type, changes } = actionAndChanges
      console.log("changes", type, changes)
      switch (type) {
        case useCombobox.stateChangeTypes.ItemClick:
          return { ...changes, isOpen: state.isOpen }
        default:
          return changes
      }
    }
  
    console.log("items2", items2)
    return (
      <Form methods={methods} onSubmit={console.log}>
        <Stack gap="8">
          <Field
            name="simpleList"
            label="Simple items"
            placeholder=""
            getItems={()=>["item1", "item2"]}
            as={AutoComplete}
          />
  
          <Field
            name="myAddress"
            label="Address Auto Complete"
            placeholder="Search here!"
            isLoading={loading}
            items={items}
            itemToString={itemToString}
            onInputValueChange={onInputValueChange}
            as={AutoComplete}
          />
  
          <Field
            name="typeAhead"
            label="Type Ahead"
            optional
            placeholder="Type abcde.... "
            isLoading={loading2}
            items={items2}
            itemToString={(value) =>
              value ? value.text : ""
            }
            onInputValueChange={typeAheadInputChange}
            stateReducer={typeAheadReducer}
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
