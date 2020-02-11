import React from "react";
import { Container, Grid } from "basis";
import Layout from "./Layout";
import { RadioGroup } from "../optionally-controlled";

function KitchenSinkRadioGroup() {
  return (
    <Layout name="RadioGroup">
      <Container padding="4" bg="white">
        <Grid rowsGutter="8">
          <RadioGroup
            label="Grey disabled"
            disabled
            data={{ value: "option-2" }}
          />

          <RadioGroup
            label="Optional with error"
            optional
            data={{
              value: "",
              errors: ["Please make a selection."]
            }}
          />
        </Grid>
      </Container>

      <Container padding="4" bg="grey.t05">
        <Grid rowsGutter="8">
          <RadioGroup
            label="White one column with help text"
            columns={1}
            data={{ value: "option-1" }}
            helpText="Help text goes here."
          />

          <RadioGroup
            label="No circles centered"
            showCircles={false}
            columns={3}
            data={{ value: "option-3" }}
          />

          <RadioGroup
            label="No circles not centered with multiple errors"
            showCircles={false}
            columns={2}
            data={{
              value: "",
              errors: ["Please make a selection.", "Another error goes here."]
            }}
          />
        </Grid>
      </Container>
    </Layout>
  );
}

export default KitchenSinkRadioGroup;
