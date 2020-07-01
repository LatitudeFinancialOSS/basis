import React from "react";
import PropTypes from "prop-types";
import { Container, Grid, TimeSpan } from "basis";
import KitchenSinkLayout from "../../../components/kitchen-sink/KitchenSinkLayout";
import KitchenSinkForm from "../../../components/kitchen-sink/KitchenSinkForm";

function FormWithTimeSpan({
  label,
  initialValue = {
    years: "",
    months: "",
  },
  disabled,
  helpText,
  optional,
  __internal__yearsFocus,
  __internal__monthsFocus,
  submitOnMount,
}) {
  return (
    <KitchenSinkForm
      initialValues={{ liveInCurrentAddress: initialValue }}
      submitOnMount={submitOnMount}
    >
      <TimeSpan
        name="liveInCurrentAddress"
        label={label}
        disabled={disabled}
        helpText={helpText}
        optional={optional}
        __internal__yearsFocus={__internal__yearsFocus}
        __internal__monthsFocus={__internal__monthsFocus}
      />
    </KitchenSinkForm>
  );
}

FormWithTimeSpan.propTypes = {
  label: PropTypes.string.isRequired,
  initialValue: PropTypes.shape({
    years: PropTypes.string.isRequired,
    months: PropTypes.string.isRequired,
  }),
  disabled: PropTypes.bool,
  helpText: PropTypes.string,
  optional: PropTypes.bool,
  __internal__yearsFocus: PropTypes.bool,
  __internal__monthsFocus: PropTypes.bool,
  submitOnMount: PropTypes.bool,
};

function KitchenSinkTimeSpan() {
  return (
    <KitchenSinkLayout name="TimeSpan">
      <Container width="320" padding="4" bg="white">
        <Grid rowsGap="8">
          <FormWithTimeSpan label="Grey" />

          <FormWithTimeSpan label="Optional" optional />

          <FormWithTimeSpan
            label="Years"
            initialValue={{
              years: "2",
              months: "",
            }}
          />

          <FormWithTimeSpan
            label="Months"
            initialValue={{
              years: "",
              months: "3",
            }}
          />

          <FormWithTimeSpan
            label="Years and months"
            initialValue={{
              years: "1",
              months: "1",
            }}
          />

          <FormWithTimeSpan label="With errors" submitOnMount />
        </Grid>
      </Container>

      <Container width="320" padding="4" bg="grey.t05">
        <Grid rowsGap="8">
          <FormWithTimeSpan label="Years focus" __internal__yearsFocus />

          <FormWithTimeSpan label="Months focus" __internal__monthsFocus />

          <FormWithTimeSpan
            label="Disabled with help text"
            helpText="Help text goes here"
            disabled
          />
        </Grid>
      </Container>
    </KitchenSinkLayout>
  );
}

export default KitchenSinkTimeSpan;
