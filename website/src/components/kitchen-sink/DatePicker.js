import React from "react";
import PropTypes from "prop-types";
import { Container, Grid, DatePicker } from "basis";
import KitchenSinkLayout from "./KitchenSinkLayout";
import KitchenSinkForm from "./KitchenSinkForm";

function FormWithDatePicker({
  label,
  initialValue = {
    day: "",
    month: "",
    year: ""
  },
  submitOnMount
}) {
  return (
    <KitchenSinkForm
      initialValues={{ weddingDate: initialValue }}
      submitOnMount={submitOnMount}
    >
      <DatePicker name="weddingDate" label={label} />
    </KitchenSinkForm>
  );
}

FormWithDatePicker.propTypes = {
  label: PropTypes.string,
  initialValue: PropTypes.shape({
    day: PropTypes.string.isRequired,
    month: PropTypes.string.isRequired,
    year: PropTypes.string.isRequired
  }),
  submitOnMount: PropTypes.bool
};

function KitchenSinkDatePicker() {
  return (
    <KitchenSinkLayout name="DatePicker">
      <Container padding="4" width="320" bg="white">
        <Grid rowsGutter="8">
          <FormWithDatePicker label="Grey" />

          <FormWithDatePicker
            label="With error"
            initialValue={{
              day: "17",
              month: "13",
              year: "1934"
            }}
            submitOnMount
          />
        </Grid>
      </Container>

      <Container padding="4" width="320" bg="grey.t05">
        <Grid rowsGutter="8">
          <FormWithDatePicker
            label="White"
            initialValue={{
              day: "1",
              month: "01",
              year: "2023"
            }}
          />

          <FormWithDatePicker label="Multiple errors" submitOnMount />
        </Grid>
      </Container>
    </KitchenSinkLayout>
  );
}

export default KitchenSinkDatePicker;
