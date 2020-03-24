import React from "react";
import PropTypes from "prop-types";
import { Container, Grid, Frequency } from "basis";
import KitchenSinkLayout from "./KitchenSinkLayout";
import KitchenSinkForm from "./KitchenSinkForm";

function FormWithFrequency({
  label,
  optional,
  annually,
  quarterly,
  monthly,
  fortnightly,
  weekly,
  initialValue = {
    amount: "",
    frequency: "",
  },
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
        annually={annually}
        quarterly={quarterly}
        monthly={monthly}
        fortnightly={fortnightly}
        weekly={weekly}
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
            label="Custom placeholders"
            mode="select"
            quarterly={false}
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
