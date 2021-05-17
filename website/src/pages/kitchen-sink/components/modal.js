import React from "react";
import { LiveProvider } from "react-live";
import * as allDesignSystem from "basis";
import KitchenSinkLayout from "../../../components/kitchen-sink/KitchenSinkLayout";
import ComponentPreview from "../../../components/ComponentPreview";

const scope = allDesignSystem;
const { Container } = allDesignSystem;

function KitchenSinkModal() {
  const code = `
    <Modal open={true} title="Cancel application">
      <Text>Are you sure you want to cancel this application?</Text>
      <Modal.Footer>
        <Button>OK</Button>
      </Modal.Footer>
    </Modal>
  `;

  return (
    <KitchenSinkLayout name="Modal">
      <Container width="800" height="300" margin="8 auto">
        <LiveProvider code={code} scope={scope}>
          <ComponentPreview />
        </LiveProvider>
      </Container>
      <Container width="400" height="300" margin="8 auto">
        <LiveProvider code={code} scope={scope}>
          <ComponentPreview />
        </LiveProvider>
      </Container>
    </KitchenSinkLayout>
  );
}

export default KitchenSinkModal;
