import React from "react";
import PropTypes from "prop-types";
import { Container, Grid, Dropdown, Placeholder, Text } from "basis";
import KitchenSinkLayout from "../../../components/kitchen-sink/KitchenSinkLayout";
import KitchenSinkForm from "../../../components/kitchen-sink/KitchenSinkForm";

const accountOptions = [
  {
    data: {
      name: "28 Degrees Platinum Mastercard",
      description: "Shop with less obstacles.",
    },
    value: "28-degrees-platinum-mastercard",
  },
  {
    data: {
      name: "Latitude Mastercard",
      description: "Choose what you want, when you want it.",
    },
    value: "latitude-mastercard",
  },
  {
    data: {
      name: "Gem Visa",
      description: "6 months interest free shopping.",
    },
    value: "gem-visa",
  },
  {
    data: {
      name: "GO Mastercard",
      description: "Flexible repayment options to suit your budget.",
    },
    value: "go-mastercard",
  },
];

function accountOptionToString({ data }) {
  return data.name;
}

function AccountOption({ data }) {
  const { name, description } = data;

  return (
    <Grid cols="100px 1fr" colsGap="5">
      <Grid.Item colSpan="0" rowSpan="0-1">
        <Placeholder label="Image" width="100%" height="100%" />
      </Grid.Item>
      <Grid.Item colSpan="1" rowSpan="0">
        <Text>
          <strong>{name}</strong>
        </Text>
      </Grid.Item>
      <Grid.Item colSpan="1" rowSpan="1">
        <Text textStyle="body2" color="grey.t75">
          {description}
        </Text>
      </Grid.Item>
    </Grid>
  );
}

AccountOption.propTypes = {
  data: PropTypes.object.isRequired,
};

function FormWithDropdown({
  initialValue = "",
  label,
  placeholderComponent,
  disabled,
  helpText,
  __internal__focus,
  __internal__open,
  __internal__highlightedIndex,
  submitOnMount,
}) {
  return (
    <KitchenSinkForm
      initialValues={{ account: initialValue }}
      submitOnMount={submitOnMount}
    >
      <Dropdown
        name="account"
        label={label}
        placeholderComponent={placeholderComponent}
        disabled={disabled}
        helpText={helpText}
        options={accountOptions}
        optionToString={accountOptionToString}
        optionComponent={AccountOption}
        __internal__focus={__internal__focus}
        __internal__open={__internal__open}
        __internal__highlightedIndex={__internal__highlightedIndex}
      />
    </KitchenSinkForm>
  );
}

FormWithDropdown.propTypes = {
  initialValue: PropTypes.string,
  label: PropTypes.string.isRequired,
  placeholderComponent: PropTypes.func,
  disabled: PropTypes.bool,
  helpText: PropTypes.string,
  __internal__focus: PropTypes.bool,
  __internal__open: PropTypes.bool,
  __internal__highlightedIndex: PropTypes.number,
  submitOnMount: PropTypes.bool,
};

function KitchenSinkDropdown() {
  return (
    <KitchenSinkLayout name="Dropdown">
      {["transparent", "grey.t05"].map((bg) => (
        <Container bg={bg} padding="4" key={bg}>
          <Container width="360">
            <Grid rowsGap="8">
              <FormWithDropdown label="Default" />

              <FormWithDropdown label="Disabled" disabled />

              <FormWithDropdown
                label="With help text"
                helpText="Help text goes here"
              />

              <FormWithDropdown
                label="With custom placeholder"
                placeholderComponent={() => <Text>Select something</Text>}
              />

              <FormWithDropdown label="With error" submitOnMount />

              <FormWithDropdown label="Focused" __internal__focus />

              <FormWithDropdown
                label="Selected focused"
                initialValue="latitude-mastercard"
                __internal__focus
              />

              <Container height="452">
                <FormWithDropdown label="Open" __internal__open />
              </Container>

              <Container height="452">
                <FormWithDropdown
                  label="Highlighted index"
                  __internal__open
                  __internal__highlightedIndex={2}
                />
              </Container>
            </Grid>
          </Container>
        </Container>
      ))}
    </KitchenSinkLayout>
  );
}

export default KitchenSinkDropdown;
