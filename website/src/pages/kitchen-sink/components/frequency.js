import React from "react";
import PropTypes from "prop-types";
import { Container, Grid, Frequency } from "basis";
import KitchenSinkLayout from "../../../components/kitchen-sink/KitchenSinkLayout";
import KitchenSinkForm from "../../../components/kitchen-sink/KitchenSinkForm";

function FormWithFrequency({
  label,
  optional,
  mode,
  annually,
  quarterly,
  monthly,
  fortnightly,
  weekly,
  initialValue = {
    amount: "",
    frequency: "",
  },
  amountPrefix,
  amountPlaceholder,
  selectPlaceholder,
  disabled,
  submitOnMount,
}) {
  return (
    <KitchenSinkForm
      initialValues={{ salary: initialValue }}
      submitOnMount={submitOnMount}
    >
      <Frequency
        name="salary"
        label={label}
        optional={optional}
        mode={mode}
        annually={annually}
        quarterly={quarterly}
        monthly={monthly}
        fortnightly={fortnightly}
        weekly={weekly}
        amountPrefix={amountPrefix}
        amountPlaceholder={amountPlaceholder}
        selectPlaceholder={selectPlaceholder}
        disabled={disabled}
      />
    </KitchenSinkForm>
  );
}

FormWithFrequency.propTypes = {
  label: PropTypes.string.isRequired,
  optional: PropTypes.bool,
  mode: PropTypes.oneOf(Frequency.MODES),
  annually: PropTypes.bool,
  quarterly: PropTypes.bool,
  monthly: PropTypes.bool,
  fortnightly: PropTypes.bool,
  weekly: PropTypes.bool,
  initialValue: PropTypes.shape({
    amount: PropTypes.string.isRequired,
    frequency: PropTypes.string.isRequired,
  }),
  amountPrefix: PropTypes.string,
  amountPlaceholder: PropTypes.string,
  selectPlaceholder: PropTypes.string,
  disabled: PropTypes.bool,
  submitOnMount: PropTypes.bool,
};

function KitchenSinkFrequency() {
  return (
    <KitchenSinkLayout name="Frequency">
      <Container padding="4" bg="white">
        <Grid rowsGap="8">
          <FormWithFrequency
            label="Grey disabled"
            quarterly={false}
            disabled
            initialValue={{
              amount: "726",
              frequency: "monthly",
            }}
          />

          <FormWithFrequency
            label="Optional with error"
            optional
            quarterly={false}
            initialValue={{
              amount: "",
              frequency: "annually",
            }}
            submitOnMount
          />
        </Grid>
      </Container>

      <Container padding="4" bg="grey.t05">
        <Grid rowsGap="8">
          <FormWithFrequency
            label="White"
            initialValue={{
              amount: "9822",
              frequency: "weekly",
            }}
          />

          <FormWithFrequency
            label="Select with multiple errors"
            mode="select"
            quarterly={false}
            initialValue={{
              amount: "",
              frequency: "",
            }}
            submitOnMount
          />

          <FormWithFrequency
            label="Amount prefix"
            mode="select"
            quarterly={false}
            amountPrefix="$"
            initialValue={{
              amount: "80000",
              frequency: "",
            }}
          />

          <FormWithFrequency
            label="Custom placeholders"
            mode="select"
            quarterly={false}
            amountPrefix="$"
            amountPlaceholder="Type something"
            selectPlaceholder="Select something"
            initialValue={{
              amount: "",
              frequency: "",
            }}
          />
        </Grid>
      </Container>
    </KitchenSinkLayout>
  );
}

export default KitchenSinkFrequency;
