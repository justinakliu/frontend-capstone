import React from "react";
// import PropTypes from "prop-types";
import { Flex, Box, Spacer, Button, Heading } from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";

const Goal = ({ goal, handleUpdateGoalComplete }) => {
  const navigate = useNavigate();

  return (
    <Flex minWidth="max-content" alignItems="center" gap="2">
      <Box p="2" textDecoration={goal.complete ? "line-through" : ""}>
        {goal.name}
      </Box>
      <Spacer />
      <Button onClick={() => navigate(`/goal/${goal.id}`)}>View Goal</Button>
      <Button onClick={() => handleUpdateGoalComplete(goal)}>
        Mark {goal.complete ? "Incomplete" : "Complete"}
      </Button>
    </Flex>
  );
};

export default Goal;

// Task.propTypes = {
//   goal: PropTypes.number.isRequired,
//   handleUpdateGoalComplete: PropTypes.func.isRequired,
// };
