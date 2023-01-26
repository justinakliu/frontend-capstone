import React from "react";
import PropTypes from "prop-types";
import { Flex, Box, Spacer, Button, Heading } from "@chakra-ui/react";

const Task = ({ subgoal, handleUpdateGoalComplete }) => {
  return (
    <Flex
      minWidth="max-content"
      alignItems="center"
      gap="2"
      textDecoration={subgoal.complete ? "line-through" : ""}
    >
      <Box p="2">{subgoal.name}</Box>
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
