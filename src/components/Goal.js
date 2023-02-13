import React from "react";
// import PropTypes from "prop-types";
import { Flex, Box, Spacer, Button, Icon, IconButton } from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";
import { ImTree } from "react-icons/im";
import { AiOutlineUnorderedList } from "react-icons/ai";

const Goal = ({ goal, handleUpdateGoalComplete }) => {
  const navigate = useNavigate();

  return (
    <Flex
      minWidth="max-content"
      alignItems="center"
      gap="2"
      padding={3}
      backgroundColor={goal.complete ? "green.50" : "orange.100"}
      borderRadius="10px"
      borderColor={goal.complete ? "green.100" : "orange.200"}
      borderWidth="2px"
    >
      <Box
        p="2"
        fontSize="sm"
        textDecoration={goal.complete ? "line-through" : ""}
      >
        {goal.name}
      </Box>
      <Spacer />
      <IconButton
        size="sm"
        icon={<Icon as={ImTree} />}
        onClick={() => navigate(`/goal/${goal.id}/tree`)}
      ></IconButton>
      <IconButton
        size="sm"
        icon={<Icon as={AiOutlineUnorderedList} />}
        onClick={() => navigate(`/goal/${goal.id}/list`)}
      ></IconButton>
      <Button size="sm" onClick={() => handleUpdateGoalComplete(goal)}>
        ✓
      </Button>
    </Flex>
  );
};

export default Goal;

// Task.propTypes = {
//   goal: PropTypes.number.isRequired,
//   handleUpdateGoalComplete: PropTypes.func.isRequired,
// };
