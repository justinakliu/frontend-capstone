import { Button } from "@chakra-ui/button";
import {
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalOverlay,
} from "@chakra-ui/modal";
import { FormControl, FormLabel, Input } from "@chakra-ui/react";
import React, { useState } from "react";
import PropTypes from "prop-types";

function ClickedNodeModal({
  isOpen,
  onClose,
  onSubmit,
  onDelete,
  onUpdateComplete,
  clickedNode,
}) {
  const [name, setName] = useState("");

  const handleSubmit = (event) => {
    event.preventDefault();
    onSubmit(name);
    setName("");
  };

  const getUpdateButtonText = () => {
    if (clickedNode !== undefined) {
      return `Mark Node ${
        Boolean(clickedNode.data.complete) ? "Incomplete" : "Complete"
      }`;
    }
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} onSubmit={onSubmit}>
      <ModalOverlay />
      <ModalContent>
        <ModalCloseButton />
        <ModalBody>
          <FormControl>
            <FormLabel>Add Subgoal</FormLabel>
            <Input
              value={name}
              onChange={(event) => setName(event.target.value)}
            />
          </FormControl>
          <Button colorScheme="blue" onClick={handleSubmit} disabled={!name}>
            Add Subgoal to Node
          </Button>
        </ModalBody>
        <ModalFooter>
          <Button colorScheme="orange" onClick={() => onUpdateComplete()}>
            {getUpdateButtonText()}
          </Button>

          <Button colorScheme="red" onClick={() => onDelete()}>
            Delete Node
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
}

ClickedNodeModal.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  onSubmit: PropTypes.func.isRequired,
};

export default ClickedNodeModal;
