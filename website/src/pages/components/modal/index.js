import React from "react";
import * as allDesignSystem from "basis";
import ComponentContainer from "../../../components/ComponentContainer";
import { formatCode } from "../../../utils/formatting";

const scope = allDesignSystem;

function ModalPage() {
  const code = formatCode(`
    function App() {
      const [isOpen, setIsOpen] = React.useState(false);
      const openModal = () => { setIsOpen(true); };
      const closeModal = () => { setIsOpen(false); };

      return (
        <div>
          <Button onClick={openModal}>Open modal</Button>
          <Modal title="Cancel application" open={isOpen} onClose={closeModal}>
            <Text>Are you sure you want to cancel this application?</Text>
            <Modal.Footer>
              <Button width="160">Yes</Button>
              <Button variant="secondary" width="160" margin="0 0 0 8" onClick={closeModal}>No</Button>
            </Modal.Footer>
          </Modal>
        </div>
      );
    }
  `);

  return <ComponentContainer code={code} scope={scope} width="md" />;
}

export default ModalPage;
