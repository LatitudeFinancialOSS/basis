import React from "react";
import PropTypes from "prop-types";
import { Container, Grid, DateInput } from "basis";
import KitchenSinkLayout from "../../../components/kitchen-sink/KitchenSinkLayout";
import KitchenSinkForm from "../../../components/kitchen-sink/KitchenSinkForm";

function FormWithDateInput({
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
      <DateInput name="birthDate" {...rest} />
    </KitchenSinkForm>
  );
}

FormWithDateInput.propTypes = {
  label: PropTypes.string.isRequired,
  dayMode: PropTypes.oneOf(DateInput.DAY_MODES),
  yearMode: PropTypes.oneOf(DateInput.YEAR_MODES),
  initialValue: PropTypes.shape({
    day: PropTypes.string,
    month: PropTypes.string.isRequired,
    year: PropTypes.string.isRequired,
  }),
  submitOnMount: PropTypes.bool,
};

function KitchenSinkDateInput() {
  return (
    <KitchenSinkLayout name="DateInput">
      <Container padding="4" width="320" bg="white">
        <Grid rowsGap="8">
          <FormWithDateInput label="Default" />

          <FormWithDateInput label="2 digits year" yearMode="2-digits" />

          <FormWithDateInput label="No day" dayMode="none" />

          <FormWithDateInput
            label="No day and 2 digits year"
            dayMode="none"
            yearMode="2-digits"
          />

          <FormWithDateInput
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
          <FormWithDateInput
            label="White"
            initialValue={{
              day: "1",
              month: "01",
              year: "2023",
            }}
          />

          <FormWithDateInput
            label="No day"
            dayMode="none"
            initialValue={{
              month: "2",
              year: "1999",
            }}
          />

          <FormWithDateInput
            label="No day and 2 digits year"
            dayMode="none"
            yearMode="2-digits"
            initialValue={{
              month: "03",
              year: "00",
            }}
          />

          <FormWithDateInput label="Required" submitOnMount />

          <FormWithDateInput
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

export default KitchenSinkDateInput;
