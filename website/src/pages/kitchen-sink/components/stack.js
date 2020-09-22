import React from "react";
import PropTypes from "prop-types";
import { Container, Stack, Text, Placeholder } from "basis";
import KitchenSinkLayout from "../../../components/kitchen-sink/KitchenSinkLayout";

function MaybePlaceholder({ label, width, height }) {
  if (label === "2" || label === "5") {
    return null;
  }

  return <Placeholder label={label} width={width} height={height} />;
}

MaybePlaceholder.propTypes = {
  label: PropTypes.string.isRequired,
  width: PropTypes.string.isRequired,
  height: PropTypes.string.isRequired,
};

function KitchenSinkStack() {
  return (
    <KitchenSinkLayout name="Stack">
      <Container padding="4">
        <Text textStyle="heading4" margin="0 0 4 0">
          Vertical stack:
        </Text>
        <Stack direction="horizontal" gap="8">
          <Container bg="secondary.lightBlue.t25" width="280">
            <Stack gap="4">
              <Placeholder label="1" height="40" width="100" />
              <Placeholder label="2" height="40" width="40" />
              <Placeholder label="3" height="40" width="140" />
              <Placeholder label="4" height="40" width="120" />
              <Placeholder label="5" height="40" width="200" />
              <Placeholder label="6" height="40" width="80" />
            </Stack>
          </Container>

          <Container bg="secondary.lightBlue.t25" width="280">
            <Stack align="center">
              <Placeholder label="1" height="40" width="100" />
              <Placeholder label="2" height="40" width="40" />
              <Placeholder label="3" height="40" width="140" />
              <Placeholder label="4" height="40" width="120" />
              <Placeholder label="5" height="40" width="200" />
              <Placeholder label="6" height="40" width="80" />
            </Stack>
          </Container>

          <Container bg="secondary.lightBlue.t25" width="280">
            <Stack align="right" gap="8">
              <Placeholder label="1" height="40" width="100" />
              <Placeholder label="2" height="40" width="40" />
              <Placeholder label="3" height="40" width="140" />
              <Placeholder label="4" height="40" width="120" />
              <Placeholder label="5" height="40" width="200" />
              <Placeholder label="6" height="40" width="80" />
            </Stack>
          </Container>
        </Stack>
      </Container>

      <Container padding="4">
        <Text textStyle="heading4" margin="0 0 4 0">
          Horizontal stack:
        </Text>
        <Stack direction="horizontal" gap="8">
          <Container bg="secondary.lightBlue.t25" width="280">
            <Stack direction="horizontal" gap="1">
              <Placeholder label="1" height="40" width="100" />
              <Placeholder label="2" height="40" width="40" />
              <Placeholder label="3" height="40" width="140" />
              <Placeholder label="4" height="40" width="120" />
              <Placeholder label="5" height="40" width="200" />
              <Placeholder label="6" height="40" width="80" />
            </Stack>
          </Container>

          <Container bg="secondary.lightBlue.t25" width="280">
            <Stack direction="horizontal" align="center" gap="1">
              <Placeholder label="1" height="40" width="100" />
              <Placeholder label="2" height="40" width="40" />
              <Placeholder label="3" height="40" width="140" />
              <Placeholder label="4" height="40" width="120" />
              <Placeholder label="5" height="40" width="200" />
              <Placeholder label="6" height="40" width="80" />
            </Stack>
          </Container>

          <Container bg="secondary.lightBlue.t25" width="280">
            <Stack direction="horizontal" align="right" gap="1">
              <Placeholder label="1" height="40" width="100" />
              <Placeholder label="2" height="40" width="40" />
              <Placeholder label="3" height="40" width="140" />
              <Placeholder label="4" height="40" width="120" />
              <Placeholder label="5" height="40" width="200" />
              <Placeholder label="6" height="40" width="80" />
            </Stack>
          </Container>
        </Stack>

        <Container margin="8 0 0 0">
          <Stack direction="horizontal" gap="8">
            <Container bg="secondary.lightBlue.t25" width="280">
              <Stack direction="horizontal" gap="1 4">
                <Placeholder label="1" height="40" width="100" />
                <Placeholder label="2" height="40" width="40" />
                <Placeholder label="3" height="40" width="140" />
                <Placeholder label="4" height="40" width="120" />
                <Placeholder label="5" height="40" width="200" />
                <Placeholder label="6" height="40" width="80" />
              </Stack>
            </Container>

            <Container bg="secondary.lightBlue.t25" width="280">
              <Stack direction="horizontal" align="center" gap="1 4">
                <Placeholder label="1" height="40" width="100" />
                <Placeholder label="2" height="40" width="40" />
                <Placeholder label="3" height="40" width="140" />
                <Placeholder label="4" height="40" width="120" />
                <Placeholder label="5" height="40" width="200" />
                <Placeholder label="6" height="40" width="80" />
              </Stack>
            </Container>

            <Container bg="secondary.lightBlue.t25" width="280">
              <Stack direction="horizontal" align="right" gap="1 4">
                <Placeholder label="1" height="40" width="100" />
                <Placeholder label="2" height="40" width="40" />
                <Placeholder label="3" height="40" width="140" />
                <Placeholder label="4" height="40" width="120" />
                <Placeholder label="5" height="40" width="200" />
                <Placeholder label="6" height="40" width="80" />
              </Stack>
            </Container>
          </Stack>
        </Container>

        <Container margin="8 0 0 0">
          <Stack direction="horizontal" gap="8">
            <Container bg="secondary.lightBlue.t25" width="280">
              <Stack direction="horizontal" gap="4 1">
                <Placeholder label="1" height="40" width="100" />
                <Placeholder label="2" height="40" width="40" />
                <Placeholder label="3" height="40" width="140" />
                <Placeholder label="4" height="40" width="120" />
                <Placeholder label="5" height="40" width="200" />
                <Placeholder label="6" height="40" width="80" />
              </Stack>
            </Container>

            <Container bg="secondary.lightBlue.t25" width="280">
              <Stack direction="horizontal" align="center" gap="4 1">
                <Placeholder label="1" height="40" width="100" />
                <Placeholder label="2" height="40" width="40" />
                <Placeholder label="3" height="40" width="140" />
                <Placeholder label="4" height="40" width="120" />
                <Placeholder label="5" height="40" width="200" />
                <Placeholder label="6" height="40" width="80" />
              </Stack>
            </Container>

            <Container bg="secondary.lightBlue.t25" width="280">
              <Stack direction="horizontal" align="right" gap="4 1">
                <Placeholder label="1" height="40" width="100" />
                <Placeholder label="2" height="40" width="40" />
                <Placeholder label="3" height="40" width="140" />
                <Placeholder label="4" height="40" width="120" />
                <Placeholder label="5" height="40" width="200" />
                <Placeholder label="6" height="40" width="80" />
              </Stack>
            </Container>
          </Stack>
        </Container>
      </Container>

      <Container padding="4">
        <Text textStyle="heading4" margin="0 0 4 0">
          With empty children (2 and 5)
        </Text>
        <Stack direction="horizontal" gap="8">
          <Container bg="secondary.lightBlue.t25" width="280">
            <Stack gap="4">
              <MaybePlaceholder label="1" height="40" width="100" />
              <MaybePlaceholder label="2" height="40" width="100" />
              {null}
              <MaybePlaceholder label="3" height="40" width="100" />
              {undefined}
              {1 + 1 === 2 && (
                <MaybePlaceholder label="4" height="40" width="100" />
              )}
              <MaybePlaceholder label="5" height="40" width="100" />
              <MaybePlaceholder label="6" height="40" width="100" />
            </Stack>
          </Container>
          <Container bg="secondary.lightBlue.t25" width="592">
            <Stack direction="horizontal" gap="2">
              <MaybePlaceholder label="1" height="40" width="100" />
              <MaybePlaceholder label="2" height="40" width="100" />
              <MaybePlaceholder label="3" height="40" width="100" />
              {false}
              <MaybePlaceholder label="4" height="40" width="100" />
              <MaybePlaceholder label="5" height="40" width="100" />
              <MaybePlaceholder label="6" height="40" width="100" />
            </Stack>
          </Container>
        </Stack>
      </Container>
    </KitchenSinkLayout>
  );
}

export default KitchenSinkStack;
