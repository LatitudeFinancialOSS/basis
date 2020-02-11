import React from "react";
import { Container, Grid } from "basis";
import Layout from "./Layout";
import { Input } from "../optionally-controlled";

function KitchenSinkInput() {
  return (
    <Layout name="Input">
      <Container padding="4">
        <Container width="320">
          <Grid rowsGutter="8">
            <Input placeholder="Grey" color="grey.t05" />

            <Input
              placeholder="Grey focus"
              color="grey.t05"
              __internal__focus
            />
          </Grid>
        </Container>
      </Container>

      <Container padding="4" bg="grey.t05">
        <Container width="320">
          <Grid rowsGutter="8">
            <Input placeholder="White" />

            <Input placeholder="White focus" __internal__focus />

            <Input placeholder="With label" label="First name" />

            <Input
              placeholder="With value"
              label="First name"
              data={{ value: "With value" }}
            />

            <Input placeholder="Optional" label="First name" optional />

            <Input
              placeholder="With help text"
              label="First name"
              helpText="Please enter your name exactly as it appears in your passport."
            />

            <Input
              placeholder="Disabled"
              label="First name"
              helpText="Nickname is not allowed."
              disabled
            />

            <Input
              placeholder="Single error"
              label="First name"
              data={{ value: "", errors: ["Something is wrong"] }}
            />

            <Input
              placeholder="Very long error"
              label="First name"
              data={{
                value: "",
                errors: [
                  "Something is wrong and it's easy to fix, but I won't bother for now."
                ]
              }}
            />

            <Input
              placeholder="Multiple errors"
              label="First name"
              data={{
                value: "",
                errors: [
                  "Something is wrong and it's easy to fix, but I won't bother for now.",
                  "Another thing seems invalid here and you should be able to fix it easily without any help.",
                  "Error 3"
                ]
              }}
            />

            <Input placeholder='type="number"' type="number" />

            <Input
              label="With number value"
              type="number"
              data={{ value: "10" }}
            />
          </Grid>
        </Container>
      </Container>
    </Layout>
  );
}

export default KitchenSinkInput;
