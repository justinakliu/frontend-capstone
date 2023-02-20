import {
  Button,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalOverlay,
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
      return `Mark ${
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
      <ModalContent padding="2" maxW="300px">
        <ModalCloseButton />
        <ModalBody>
          <Flex alignItems="center" gap="2" direction="column">
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
            <Button size="sm" onClick={transitionSubgoalModal} bg="orange.200">
              Add Subgoal
            </Button>
            <Spacer />
            <Button size="sm" bg="red.300" onClick={() => handleDeleteGoal()}>
              Delete Goal
            </Button>
          </Flex>
        </ModalBody>
      </ModalContent>
    </Modal>
  );
}

ClickedNodeModal.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  clickedNode: PropTypes.shape({
    name: PropTypes.string.isRequired,
    id: PropTypes.number.isRequired,
    parent_id: PropTypes.number,
    complete: PropTypes.bool,
    description: PropTypes.string,
    priority: PropTypes.bool,
  }),
  closeClickedGoalModal: PropTypes.func.isRequired,
  handleDeleteGoal: PropTypes.func.isRequired,
  handleUpdateGoalComplete: PropTypes.func.isRequired,
  transitionSubgoalModal: PropTypes.func.isRequired,
};

export default ClickedNodeModal;
