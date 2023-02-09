import React from "react";
import PropTypes from "prop-types";
import { Flex, Box, Spacer, Button, Heading } from "@chakra-ui/react";

const Task = ({ subgoal, handleUpdateGoalComplete }) => {
  return (
    <Flex minWidth="max-content" alignItems="center" gap="2">
      <Box textDecoration={subgoal.complete ? "line-through" : ""} p="2">
        {subgoal.name}
      </Box>
      <Spacer />
      <Button
        onClick={() => handleUpdateGoalComplete(subgoal)}
        bg={subgoal.complete ? "green.200" : "gray.200"}
      >
        ✓
      </Button>
    </Flex>
  );
};

export default Task;

Task.propTypes = {
  id: PropTypes.number.isRequired,
  handleUpdateGoalComplete: PropTypes.func.isRequired,
};
