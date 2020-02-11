import React from "react";
import { Container, Grid } from "basis";
import Layout from "./Layout";
import { Select } from "../optionally-controlled";

function KitchenSinkSelect() {
  return (
    <Layout name="Select">
      <Container padding="4">
        <Container width="320">
          <Grid rowsGutter="8">
            <Select label="Grey" color="grey.t05" />

            <Select
              label="Grey focus"
              color="grey.t05"
              data={{ value: "option-2" }}
              __internal__focus={true}
            />
          </Grid>
        </Container>
      </Container>

      <Container padding="4" bg="grey.t05">
        <Container width="320">
          <Grid rowsGutter="8">
            <Select
              label="Disabled with help text"
              helpText="Help text goes here"
              isDisabled={true}
            />

            <Select
              label="Optional with custom placeholder"
              placeholder="Select one..."
              optional={true}
            />

            <Select label="Natural width" fullWidth={false} />

            <Select
              label="With error"
              data={{ value: "", errors: ["Please make a selection."] }}
            />
          </Grid>
        </Container>
      </Container>
    </Layout>
  );
}

export default KitchenSinkSelect;
