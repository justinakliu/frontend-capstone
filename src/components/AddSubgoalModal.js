import { useState } from "react";
import PropTypes from "prop-types";
import {
  Button,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalOverlay,
  FormControl,
  FormLabel,
  Input,
  Flex,
} from "@chakra-ui/react";

function AddSubgoalModal({ isOpen, closeAddSubgoalModal, handleAddSubgoal }) {
  const [name, setName] = useState("");

  const handleAddSubgoalSubmit = (event) => {
    event.preventDefault();
    handleAddSubgoal(name);
    setName("");
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={closeAddSubgoalModal}
      onSubmit={handleAddSubgoalSubmit}
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
              onClick={handleAddSubgoalSubmit}
              disabled={!name}
              bg="orange.200"
            >
              Add Subgoal
            </Button>
          </Flex>
        </ModalBody>
      </ModalContent>
    </Modal>
  );
}

AddSubgoalModal.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  closeAddSubgoalModal: PropTypes.func.isRequired,
  handleAddSubgoal: PropTypes.func.isRequired,
};

export default AddSubgoalModal;
