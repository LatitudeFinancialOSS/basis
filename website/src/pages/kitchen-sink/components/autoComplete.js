import { AutoComplete, Container, Stack } from "basis";
import React from "react";
import KitchenSinkLayout from "../../../components/kitchen-sink/KitchenSinkLayout";
const items = [
  {
    id: "AuPaf643492660",
    RecordId: "AuPaf643492660",
    AddressLine: "Abc, 246-250 Riverside Bvd",
    Locality: "DOUGLAS",
    State: "QLD",
    Postcode: "4814",
    Country: "Australia",
    CountryCode: "AU",
  },
  {
    id: "AuPaf783106205",
    RecordId: "AuPaf783106205",
    AddressLine: "Abc, 85 Grey Tce",
    Locality: "PORT PIRIE SOUTH",
    State: "SA",
    Postcode: "5540",
    Country: "Australia",
    CountryCode: "AU",
  },
];

const simpleItems = ["item1", "item2"];

const itemToString = (value) =>
  value
    ? `${value.AddressLine}, ${value.Locality}, ${value.State}, ${value.Country}`
    : "";

function KitchenSinkAccordion() {
  return (
    <KitchenSinkLayout name="AutoComplete">
      {["transparent", "grey.t05"].map((bg) => (
        <Container bg={bg} padding="4" key={bg}>
          <Stack width="360" gap="8">
            <AutoComplete label="Default" items={simpleItems} emptyValue={""} />
            {/* <AutoComplete
              label="Custom list item"
              items={items}
              emptyValue={emptyValue}
              itemToString={itemToString}
              listItem={({ item }) => {
                return <div>{`${item.AddressLine} $$$ ${item.Locality}`}</div>;
              }}
            />
            <Form methods={methods} onSubmit={handleStart}>
              <Field
                name="myAddress"
                label="Address complete"
                items={items}
                placeholder="Search here!"
                isLoading={false}
                onSelectedItemChange={() => {}}
                onInputValueChange={() => {}}
                itemToString={itemToString}
                as={AutoComplete}
              />
              <Button type="submit">Get started</Button>
            </Form> */}
            <AutoComplete
              label="With custom placeholder"
              placeholder="Search something!"
              items={[]}
            />
            <AutoComplete
              label="Help text"
              helpText="This is for help"
              items={[]}
            />

            <AutoComplete label="Optional" optional items={[]} />
            <AutoComplete
              label="With value"
              items={items}
              value={items[0]}
              itemToString={itemToString}
            />

            <AutoComplete label="Focus" items={[]} __internal__focus />
            <AutoComplete label="Loading" items={[]} __internal__loading />
            <AutoComplete
              label="Big address"
              optional
              items={[]}
              placeholder={itemToString(items[0])}
            />
            <AutoComplete label="With error" items={[]} error="Required" />

            <AutoComplete
              label="Simple Items Open"
              items={simpleItems}
              __internal__open
            />

            <Container margin="14 0" padding="14 0">
              <AutoComplete
                label="Address Items Open"
                itemToString={itemToString}
                items={items}
                __internal__open
                __internal__highlightedIndex={1}
              />
            </Container>

            {/* <Container margin="14 0" padding="14 0">
              <AutoComplete
                label="Loading Open"
                itemToString={itemToString}
                items={items}
                __internal__open
                __internal__loading
                __internal__highlightedIndex={1}
              />
            </Container> */}
          </Stack>
        </Container>
      ))}
    </KitchenSinkLayout>
  );
}

export default KitchenSinkAccordion;
