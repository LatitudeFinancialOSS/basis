import React from "react";
import { Container, AutoComplete, Stack } from "basis";
import PropTypes from "prop-types";
import KitchenSinkLayout from "../../../components/kitchen-sink/KitchenSinkLayout";
import KitchenSinkForm from "../../../components/kitchen-sink/KitchenSinkForm";
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

function FormWithAutoComplete({
  initialValue = "",
  label,
  placeholder,
  disabled,
  helpText,
  optional,
  itemToString,
  __internal__loading,
  items = [],
  __internal__open,
  submitOnMount,
  __internal__highlightedIndex,
  __internal__focus,
}) {
  return (
    <KitchenSinkForm
      initialValues={{ status: initialValue }}
      submitOnMount={submitOnMount}
    >
      {/* <Select
        name="status"
        label={label}
        placeholder={placeholder}
        options={options}
        disabled={disabled}
        helpText={helpText}
        optional={optional}
        fullWidth={fullWidth}
        __internal__focus={__internal__focus}
      /> */}
      <AutoComplete
        label={label}
        items={items}
        placeholder={placeholder}
        disabled={disabled}
        helpText={helpText}
        optional={optional}
        itemToString={itemToString}
        __internal__open={__internal__open}
        __internal__loading={__internal__loading}
        __internal__highlightedIndex={__internal__highlightedIndex}
        __internal__focus={__internal__focus}
      />
    </KitchenSinkForm>
  );
}

FormWithAutoComplete.propTypes = {
  initialValue: PropTypes.string,
  label: PropTypes.string.isRequired,
  itemToString: PropTypes.func,
  placeholder: PropTypes.string,
  disabled: PropTypes.bool,
  helpText: PropTypes.string,
  items: PropTypes.arrayOf(
    PropTypes.oneOfType([PropTypes.object, PropTypes.string])
  ),
  optional: PropTypes.bool,
  __internal__focus: PropTypes.bool,
  __internal__open: PropTypes.bool,
  __internal__loading: PropTypes.bool,
  __internal__highlightedIndex: PropTypes.number,
  submitOnMount: PropTypes.bool,
};

function KitchenSinkAccordion() {
  return (
    <KitchenSinkLayout name="AutoComplete">
      {["transparent", "grey.t05"].map((bg) => (
        <Container bg={bg} padding="4" key={bg}>
          <Stack width="360" gap="8">
            <FormWithAutoComplete label="Default" items={simpleItems} />
            <FormWithAutoComplete
              label="With custom placeholder"
              placeholder="Search something!"
            />
            <FormWithAutoComplete
              label="Help text"
              helpText="This is for help"
            />

            <FormWithAutoComplete label="Optional" optional />
            <FormWithAutoComplete label="Focus" __internal__focus />
            <FormWithAutoComplete label="Loading" __internal__loading />
            <FormWithAutoComplete label="With error" submitOnMount />

            <FormWithAutoComplete
              label="Simple Items Open"
              items={simpleItems}
              __internal__open
            />

            <Container margin="14 0 0 0 " padding="14 0 0 0 ">
              <FormWithAutoComplete
                label="Address Items Open"
                itemToString={itemToString}
                items={items}
                __internal__open
                __internal__highlightedIndex={1}
              />
            </Container>

            <Container margin="14 0" padding="14 0">
              <FormWithAutoComplete
                label="Loading Open"
                itemToString={itemToString}
                items={items}
                __internal__open
                __internal__loading
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
