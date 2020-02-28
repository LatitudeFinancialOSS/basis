import React from "react";
import PropTypes from "prop-types";
import { Container, Grid, DatePicker } from "basis";
import KitchenSinkLayout from "./KitchenSinkLayout";
import KitchenSinkForm from "./KitchenSinkForm";

function FormWithDatePicker({
  label,
  day,
  initialValue = {
    day: "",
    month: "",
    year: ""
  },
  submitOnMount
}) {
  return (
    <KitchenSinkForm
      initialValues={{ birthDate: initialValue }}
      submitOnMount={submitOnMount}
    >
      <DatePicker name="birthDate" label={label} day={day} />
    </KitchenSinkForm>
  );
}

FormWithDatePicker.propTypes = {
  label: PropTypes.string,
  day: PropTypes.bool,
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

          <FormWithDatePicker label="Without day" day={false} />

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

          <FormWithDatePicker
            label="Without day"
            day={false}
            initialValue={{
              month: "2",
              year: "1999"
            }}
          />

          <FormWithDatePicker label="Multiple errors" submitOnMount />
        </Grid>
      </Container>
    </KitchenSinkLayout>
  );
}

export default KitchenSinkDatePicker;
