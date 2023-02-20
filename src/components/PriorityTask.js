import PropTypes from "prop-types";
import { Flex, Box, Spacer, Button } from "@chakra-ui/react";

const PriorityTask = ({ subgoal, updateGoalComplete, updateGoalPriority }) => {
  return (
    <Flex
      minWidth="max-content"
      alignItems="center"
      gap="2"
      backgroundColor="orange.100"
      borderRadius="10px"
      borderColor="orange.200"
      borderWidth="2px"
    >
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
        onClick={() => updateGoalPriority(subgoal)}
      >
        ★
      </Button>
      <Button size="sm" onClick={() => updateGoalComplete(subgoal)}>
        ✓
      </Button>
    </Flex>
  );
};

export default PriorityTask;

PriorityTask.propTypes = {
  subgoal: PropTypes.shape({
    name: PropTypes.string.isRequired,
    id: PropTypes.number.isRequired,
    parent_id: PropTypes.number,
    complete: PropTypes.bool,
    description: PropTypes.string,
    priority: PropTypes.bool,
  }),
  updateGoalComplete: PropTypes.func.isRequired,
  updateGoalPriority: PropTypes.func.isRequired,
};
