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
  clickedNode,
  closeClickedGoalModal,
  handleAddSubgoal,
  handleDeleteGoal,
  handleUpdateGoalComplete,
}) {
  const [name, setName] = useState("");

  const handleAddSubgoalSubmit = (event) => {
    event.preventDefault();
    handleAddSubgoal(name);
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
    <Modal
      isOpen={isOpen}
      onClose={closeClickedGoalModal}
      onSubmit={handleAddSubgoal}
    >
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
          <Button
            colorScheme="blue"
            onClick={handleAddSubgoalSubmit}
            disabled={!name}
          >
            Add Subgoal to Node
          </Button>
        </ModalBody>
        <ModalFooter>
          <Button
            colorScheme="orange"
            onClick={() => handleUpdateGoalComplete()}
          >
            {getUpdateButtonText()}
          </Button>

          <Button colorScheme="red" onClick={() => handleDeleteGoal()}>
            Delete Node
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
}

ClickedNodeModal.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  // how to add clickedNode data type? shapeof?
  closeClickedGoalModal: PropTypes.func.isRequired,
  handleAddSubgoal: PropTypes.func.isRequired,
  handleDeleteGoal: PropTypes.func.isRequired,
  handleUpdateGoalComplete: PropTypes.func.isRequired,
};

export default ClickedNodeModal;
