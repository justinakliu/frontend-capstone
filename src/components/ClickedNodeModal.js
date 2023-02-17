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
  Flex,
  Spacer,
} from "@chakra-ui/react";
import PropTypes from "prop-types";

function ClickedNodeModal({
  isOpen,
  clickedNode,
  closeClickedGoalModal,
  transitionSubgoalModal,
  handleDeleteGoal,
  handleUpdateGoalComplete,
}) {
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
      onSubmit={transitionSubgoalModal}
    >
      <ModalOverlay />
      <ModalContent>
        <ModalCloseButton />
        <ModalBody>
          <FormControl>
            <FormLabel>Actions</FormLabel>
          </FormControl>
        </ModalBody>
        <ModalFooter>
          <Flex alignItems="center" gap="2" direction="column">
            <Button size="sm" onClick={transitionSubgoalModal} bg="orange.200">
              Add Subgoal
            </Button>
            <Spacer />
            <Button
              size="sm"
              bg={
                getUpdateButtonText() === "Mark Node Incomplete"
                  ? "orange.100"
                  : "green.100"
              }
              onClick={() => handleUpdateGoalComplete()}
            >
              {getUpdateButtonText()}
            </Button>
            <Spacer />
            <Button size="sm" bg="red.300" onClick={() => handleDeleteGoal()}>
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
  handleDeleteGoal: PropTypes.func.isRequired,
  handleUpdateGoalComplete: PropTypes.func.isRequired,
};

export default ClickedNodeModal;
