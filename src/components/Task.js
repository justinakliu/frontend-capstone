import React from "react";
import PropTypes from "prop-types";
import { Flex, Box, Spacer, Button } from "@chakra-ui/react";

const Task = ({
  subgoal,
  handleUpdateGoalComplete,
  handleUpdateGoalPriority,
}) => {
  return (
    <Flex minWidth="max-content" alignItems="center" gap="2">
      <Box
        fontSize="sm"
        textDecoration={subgoal.complete ? "line-through" : ""}
        p="2"
      >
        {subgoal.name}
      </Box>
      <Spacer />
      <Button
        size="sm"
        color={subgoal.priority ? "orange.300" : "gray.400"}
        onClick={() => handleUpdateGoalPriority(subgoal)}
      >
        ★
      </Button>
      <Button size="sm" onClick={() => handleUpdateGoalComplete(subgoal)}>
        ✓
      </Button>
    </Flex>
  );
};

export default Task;

Task.propTypes = {
  id: PropTypes.number.isRequired,
  handleUpdateGoalComplete: PropTypes.func.isRequired,
  handleUpdateGoalPriority: PropTypes.func.isRequired,
};
