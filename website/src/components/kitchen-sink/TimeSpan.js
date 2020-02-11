import React from "react";
import { Container, Grid } from "basis";
import Layout from "./Layout";
import { TimeSpan } from "../optionally-controlled";

function KitchenSinkTimeSpan() {
  return (
    <Layout name="TimeSpan">
      <Container padding="4" bg="white">
        <Grid rowsGutter="8">
          <TimeSpan label="Grey" />

          <TimeSpan
            label="Optional with errors"
            optional={true}
            data={{
              value: {
                years: "100",
                months: "12"
              },
              errors: [
                "Years must be within 0-99.",
                "Months must be within 0-11."
              ]
            }}
          />
        </Grid>
      </Container>

      <Container padding="4" bg="grey.t05">
        <Grid rowsGutter="8">
          <TimeSpan label="Years focus" __internal__yearsFocus={true} />

          <TimeSpan label="Months focus" __internal__monthsFocus={true} />

          <TimeSpan
            label="Disabled with help text"
            isDisabled={true}
            helpText="Help text goes here"
          />
        </Grid>
      </Container>
    </Layout>
  );
}

export default KitchenSinkTimeSpan;
