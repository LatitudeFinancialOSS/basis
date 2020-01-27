import React from "react";
import { Container, Grid } from "basis";
import Layout from "./Layout";
import { DatePicker } from "../optionally-controlled";

function KitchenSinkDatePicker() {
  return (
    <Layout name="DatePicker">
      <Container padding="4" width="20" bg="white">
        <Grid rowsGutter="8">
          <DatePicker label="Grey" />

          <DatePicker
            label="With error"
            data={{
              value: {
                day: "17",
                month: "13",
                year: "1934"
              },
              errors: ["Month must be within 1-12."]
            }}
          />
        </Grid>
      </Container>

      <Container padding="4" width="20" bg="grey.t05">
        <Grid rowsGutter="8">
          <DatePicker
            label="White"
            data={{
              value: {
                day: "1",
                month: "01",
                year: "2023"
              }
            }}
          />

          <DatePicker
            label="Multiple errors"
            data={{
              value: {
                day: "",
                month: "",
                year: ""
              },
              errors: [
                "Day must be within 1-31.",
                "Month must be within 1-12.",
                "Year must be within 1800-2200."
              ]
            }}
          />
        </Grid>
      </Container>
    </Layout>
  );
}

export default KitchenSinkDatePicker;
