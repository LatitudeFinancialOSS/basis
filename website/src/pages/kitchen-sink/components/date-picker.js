import React from "react";
import PropTypes from "prop-types";
import { Container, Grid, DatePicker } from "basis";
import KitchenSinkLayout from "../../../components/kitchen-sink/KitchenSinkLayout";
import KitchenSinkForm from "../../../components/kitchen-sink/KitchenSinkForm";

function FormWithDatePicker({
  initialValue = {
    day: "",
    month: "",
    year: "",
  },
  submitOnMount,
  ...rest
}) {
  return (
    <KitchenSinkForm
      initialValues={{ birthDate: initialValue }}
      submitOnMount={submitOnMount}
    >
      <DatePicker name="birthDate" {...rest} />
    </KitchenSinkForm>
  );
}

FormWithDatePicker.propTypes = {
  label: PropTypes.string.isRequired,
  dayMode: PropTypes.oneOf(DatePicker.DAY_MODES),
  yearMode: PropTypes.oneOf(DatePicker.YEAR_MODES),
  initialValue: PropTypes.shape({
    day: PropTypes.string,
    month: PropTypes.string.isRequired,
    year: PropTypes.string.isRequired,
  }),
  submitOnMount: PropTypes.bool,
};

function KitchenSinkDatePicker() {
  return (
    <KitchenSinkLayout name="DatePicker">
      <Container padding="4" width="320" bg="white">
        <Grid rowsGap="8">
          <FormWithDatePicker label="Default" />

          <FormWithDatePicker label="2 digits year" yearMode="2-digits" />

          <FormWithDatePicker label="No day" dayMode="none" />

          <FormWithDatePicker
            label="No day and 2 digits year"
            dayMode="none"
            yearMode="2-digits"
          />

          <FormWithDatePicker
            label="With error"
            initialValue={{
              day: "17",
              month: "13",
              year: "1934",
            }}
            submitOnMount
          />
        </Grid>
      </Container>

      <Container padding="4" width="320" bg="grey.t05">
        <Grid rowsGap="8">
          <FormWithDatePicker
            label="White"
            initialValue={{
              day: "1",
              month: "01",
              year: "2023",
            }}
          />

          <FormWithDatePicker
            label="No day"
            dayMode="none"
            initialValue={{
              month: "2",
              year: "1999",
            }}
          />

          <FormWithDatePicker
            label="No day and 2 digits year"
            dayMode="none"
            yearMode="2-digits"
            initialValue={{
              month: "03",
              year: "00",
            }}
          />

          <FormWithDatePicker label="Required" submitOnMount />

          <FormWithDatePicker
            label="Multiple errors"
            initialValue={{
              day: "34",
              month: "56",
              year: "7890",
            }}
            submitOnMount
          />
        </Grid>
      </Container>
    </KitchenSinkLayout>
  );
}

export default KitchenSinkDatePicker;
