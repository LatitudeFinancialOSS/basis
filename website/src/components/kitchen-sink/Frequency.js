import React from "react";
import { Container, Grid } from "basis";
import Layout from "./Layout";
import { Frequency } from "../optionally-controlled";

function KitchenSinkFrequency() {
  return (
    <Layout name="Frequency">
      <Container padding="4" bg="white">
        <Grid rowsGutter="8">
          <Frequency label="Grey disabled" isDisabled={true} />

          <Frequency
            label="Optional with error"
            isOptional={true}
            data={{
              value: {
                input: "",
                frequency: ""
              },
              errors: ["Please enter a valid amount."]
            }}
          />
        </Grid>
      </Container>

      <Container padding="4" bg="grey.t05">
        <Grid rowsGutter="8">
          <Frequency label="White" quarterly={true} />

          <Frequency
            label="Select with multiple errors"
            mode="select"
            data={{
              value: {
                input: "",
                frequency: ""
              },
              errors: [
                "Please enter a valid amount.",
                "Please select a frequency."
              ]
            }}
          />
        </Grid>
      </Container>
    </Layout>
  );
}

export default KitchenSinkFrequency;
