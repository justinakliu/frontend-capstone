import {
  Button,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalOverlay,
  FormControl,
  FormLabel,
  Input,
  Flex,
  Spacer,
} from "@chakra-ui/react";
import { useState } from "react";
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
            <FormLabel>Actions</FormLabel>
            <Input
              value={name}
              onChange={(event) => setName(event.target.value)}
            />
          </FormControl>
          <Flex justifyContent="right">
            <Button
              mt={3}
              size="sm"
              colorScheme="blue"
              onClick={handleAddSubgoalSubmit}
              disabled={!name}
            >
              Add Subgoal
            </Button>
          </Flex>
        </ModalBody>
        <ModalFooter>
          <Flex alignItems="center" gap="2">
            <Button
              size="sm"
              colorScheme="orange"
              onClick={() => handleUpdateGoalComplete()}
            >
              {getUpdateButtonText()}
            </Button>
            <Spacer />
            <Button
              size="sm"
              colorScheme="red"
              onClick={() => handleDeleteGoal()}
            >
              Delete Node
            </Button>
          </Flex>
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
