import React from "react";
import PropTypes from "prop-types";
import { Container, Grid, RadioGroup } from "basis";
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

function FormWithRadioGroup({
  label,
  initialValue = "",
  disabled,
  helpText,
  optional,
  columns,
  showCircles,
  submitOnMount,
}) {
  return (
    <KitchenSinkForm
      initialValues={{ hungry: initialValue }}
      submitOnMount={submitOnMount}
    >
      <RadioGroup
        name="hungry"
        options={options}
        label={label}
        disabled={disabled}
        helpText={helpText}
        optional={optional}
        columns={columns}
        showCircles={showCircles}
      />
    </KitchenSinkForm>
  );
}

FormWithRadioGroup.propTypes = {
  label: PropTypes.string.isRequired,
  initialValue: PropTypes.string,
  disabled: PropTypes.bool,
  helpText: PropTypes.string,
  optional: PropTypes.bool,
  columns: PropTypes.number,
  showCircles: PropTypes.bool,
  submitOnMount: PropTypes.bool,
};

function KitchenSinkRadioGroup() {
  return (
    <KitchenSinkLayout name="RadioGroup">
      <Container padding="4" bg="white">
        <Grid rowsGap="8">
          <FormWithRadioGroup
            label="Grey disabled"
            initialValue="option-2"
            disabled
          />

          <FormWithRadioGroup label="Optional" optional />

          <FormWithRadioGroup label="With error" submitOnMount />
        </Grid>
      </Container>

      <Container padding="4" bg="grey.t05">
        <Grid rowsGap="8">
          <FormWithRadioGroup
            label="White one column with help text"
            initialValue="option-1"
            columns={1}
            helpText="Help text goes here."
          />

          <FormWithRadioGroup
            label="No circles centered"
            initialValue="option-3"
            columns={3}
            showCircles={false}
          />

          <FormWithRadioGroup
            label="No circles, 2 columns, with error"
            columns={2}
            showCircles={false}
            submitOnMount
          />
        </Grid>
      </Container>
    </KitchenSinkLayout>
  );
}

export default KitchenSinkRadioGroup;
