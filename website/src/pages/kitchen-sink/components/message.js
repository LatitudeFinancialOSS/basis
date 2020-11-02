import React from "react";
import { LiveProvider } from "react-live";
import * as allDesignSystem from "basis";
import KitchenSinkLayout from "../../../components/kitchen-sink/KitchenSinkLayout";
import ComponentPreview from "../../../components/ComponentPreview";

const { Container, Grid, Message, Link, Button } = allDesignSystem;
const scope = allDesignSystem;

const { SEVERITIES, BACKGROUNDS } = Message;

function KitchenSinkMessage() {
  return (
    <KitchenSinkLayout name="Message">
      {BACKGROUNDS.map((bg) => (
        <Container
          padding="6"
          bg={bg === "white" ? "grey.t05" : "white"}
          key={bg}
        >
          <Grid rowsGap="4">
            <Message
              severity="info-or-minor"
              bg={bg}
              callToAction={
                <Link appearance="secondary-button" href="#" newTab>
                  Link
                </Link>
              }
            >
              We can help you ease the financial stress of COVID-19.{" "}
              <Link href="https://www.latitudefinancial.com.au/covid-19" newTab>
                Find out how.
              </Link>
            </Message>
            <Message
              severity="info-or-minor"
              bg={bg}
              callToAction={<Button variant="secondary">Button</Button>}
            >
              We can help you ease the financial stress of COVID-19.{" "}
              <Link href="https://www.latitudefinancial.com.au/covid-19" newTab>
                Find out how.
              </Link>
            </Message>
          </Grid>
        </Container>
      ))}
      <Container padding="6">
        <Message
          severity="info-or-minor"
          bg="highlight.pink.t100"
          callToAction={<Button variant="secondary">Dismiss</Button>}
          hasBreakpointWidth-sm
        >
          We can help you ease the financial stress of COVID-19.{" "}
          <Link href="https://www.latitudefinancial.com.au/covid-19" newTab>
            Find out how.
          </Link>
        </Message>
      </Container>
      <Container margin="6" width="240" bg="grey.t05">
        <Message severity="info-or-minor" padding="0">
          We can help you ease the financial stress of COVID-19.{" "}
          <Link href="https://www.latitudefinancial.com.au/covid-19" newTab>
            Find out how.
          </Link>
        </Message>
      </Container>
      <Container width="600" height="2272">
        <LiveProvider
          code={`
            Message.BACKGROUNDS.map((bg) => (
              <Container
                padding="6"
                bg={bg === "white" ? "grey.t05" : "white"}
                key={bg}
              >
                <Message
                  severity="info-or-minor"
                  bg={bg}
                  callToAction={
                    <Link appearance="secondary-button" href="#" newTab>
                      Link
                    </Link>
                  }
                >
                  Your minimum monthly payment (including any overdue and overlimit amount) 
                  will be debited if it is greater than your fixed amount.<br /><br />
                  Your statement closing balance will be debited if it is lower than your fixed amount.
                </Message>
              </Container>
            ))
          `}
          scope={scope}
        >
          <ComponentPreview hasBodyMargin={false} />
        </LiveProvider>
      </Container>
      <Container width="400">
        {SEVERITIES.map((severity) => (
          <Container padding="6" key={severity}>
            <Message
              severity={severity}
              bg="secondary.pink.t30"
              title="Something went wrong"
            >
              We are sorry, we cannot fulfill your request. Please contact
              Latitude for more information.
            </Message>
          </Container>
        ))}
      </Container>
    </KitchenSinkLayout>
  );
}

export default KitchenSinkMessage;
