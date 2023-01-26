import React from "react";
import PropTypes from "prop-types";
import { Flex, Box, Spacer, Button, Heading } from "@chakra-ui/react";

const Task = ({ subgoal, handleUpdateGoalComplete }) => {
  return (
    <Flex
      minWidth="max-content"
      alignItems="center"
      gap="2"
      bg={subgoal.complete ? "grey" : "white"}
    >
      <Box p="2">
        <Heading size="md">{subgoal.name}</Heading>
      </Box>
      <Spacer />
      <Button onClick={() => handleUpdateGoalComplete(subgoal)}>
        Mark {subgoal.complete ? "Incomplete" : "Complete"}
      </Button>
    </Flex>
  );
};

export default Task;

Task.propTypes = {
  id: PropTypes.number.isRequired,
  handleUpdateGoalComplete: PropTypes.func.isRequired,
};
