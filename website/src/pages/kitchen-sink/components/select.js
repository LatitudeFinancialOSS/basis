import React from "react";
import PropTypes from "prop-types";
import { Container, Grid, Select } from "basis";
import KitchenSinkLayout from "../../../components/kitchen-sink/KitchenSinkLayout";
import KitchenSinkForm from "../../../components/kitchen-sink/KitchenSinkForm";

const options = [
  {
    label: "Option 1",
    value: "option-1",
  },
  {
    label: "Option 2",
    value: "option-2",
  },
  {
    label: "Option 3",
    value: "option-3",
  },
];

function FormWithSelect({
  initialValue = "",
  label,
  placeholder,
  disabled,
  helpText,
  optional,
  fullWidth,
  __internal__focus,
  submitOnMount,
}) {
  return (
    <KitchenSinkForm
      initialValues={{ status: initialValue }}
      submitOnMount={submitOnMount}
    >
      <Select
        name="status"
        label={label}
        placeholder={placeholder}
        options={options}
        disabled={disabled}
        helpText={helpText}
        optional={optional}
        fullWidth={fullWidth}
        __internal__focus={__internal__focus}
      />
    </KitchenSinkForm>
  );
}

FormWithSelect.propTypes = {
  initialValue: PropTypes.string,
  label: PropTypes.string.isRequired,
  placeholder: PropTypes.string,
  disabled: PropTypes.bool,
  helpText: PropTypes.string,
  optional: PropTypes.bool,
  fullWidth: PropTypes.bool,
  __internal__focus: PropTypes.bool,
  submitOnMount: PropTypes.bool,
};

function KitchenSinkSelect() {
  return (
    <KitchenSinkLayout name="Select">
      <Container padding="4">
        <Container width="320" bg="white">
          <Grid rowsGap="8">
            <FormWithSelect label="Grey" />

            <FormWithSelect
              label="Grey focus"
              initialValue="option-2"
              __internal__focus
            />
          </Grid>
        </Container>
      </Container>

      <Container padding="4" bg="grey.t05">
        <Container width="320">
          <Grid rowsGap="8">
            <FormWithSelect
              label="Disabled with help text"
              helpText="Help text goes here"
              disabled
            />

            <FormWithSelect
              label="Optional with custom placeholder"
              placeholder="Select one..."
              optional
            />

            <FormWithSelect label="Natural width" fullWidth={false} />

            <FormWithSelect label="With error" submitOnMount />
          </Grid>
        </Container>
      </Container>
    </KitchenSinkLayout>
  );
}

export default KitchenSinkSelect;
