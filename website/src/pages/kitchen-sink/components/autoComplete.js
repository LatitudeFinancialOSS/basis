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
            <AutoComplete
              label="Default"
              getItems={() => simpleItems}
              emptyValue={""}
            />
            <AutoComplete
              label="With custom placeholder"
              placeholder="Search something!"
              getItems={() => []}
            />
            <AutoComplete
              label="Help text"
              helpText="This is for help"
              getItems={() => []}
            />

            <AutoComplete label="Optional" optional getItems={() => []} />
            <AutoComplete
              label="With value"
              getItems={() => items}
              value={items[0]}
              itemToString={itemToString}
            />

            <AutoComplete label="Focus" getItems={() => []} __internal__focus />
            <AutoComplete
              label="Loading"
              getItems={() => []}
              __internal__loading
            />
            <AutoComplete
              label="Big address"
              optional
              getItems={() => []}
              placeholder={itemToString(items[0])}
            />
            <AutoComplete
              label="With error"
              getItems={() => []}
              error="Required"
            />

            <AutoComplete
              label="Simple Items Open"
              getItems={() => simpleItems}
              __internal__open
            />

            <Container margin="14 0" padding="14 0">
              <AutoComplete
                label="Address Items Open"
                itemToString={itemToString}
                getItems={() => items}
                __internal__open
                __internal__highlightedIndex={1}
              />
            </Container>
          </Stack>
        </Container>
      ))}
    </KitchenSinkLayout>
  );
}

export default KitchenSinkAccordion;
