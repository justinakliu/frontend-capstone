import React from "react";
import PropTypes from "prop-types";
import { Flex, Box, Heading, Spacer, Button } from "@chakra-ui/react";

const Task = ({ subgoal, handleUpdateGoalComplete }) => {
  return (
    <Flex minWidth="max-content" alignItems="center" gap="2">
      <Box p="2">
        <Heading size="md">
          {" "}
          <h2>{subgoal.name}</h2>
        </Heading>
      </Box>
      <Spacer />
      <Button onClick={() => {}}>
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
