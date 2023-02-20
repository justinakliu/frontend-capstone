import PropTypes from "prop-types";
import { VStack } from "@chakra-ui/react";
import PriorityTask from "./PriorityTask";

function PriorityTaskList({
  priorityTasks,
  updateGoalComplete,
  updateGoalPriority,
}) {
  return (
    <>
      <VStack
        spacing={4}
        align="stretch"
        ml={20}
        mr={20}
        mt={5}
        mb={10}
        padding={4}
        height="60vh"
        overflow="auto"
        borderWidth="1px"
        bg="orange.50"
        borderRadius="10px"
        borderColor="orange.200"
      >
        {priorityTasks.map((subgoal) => (
          <PriorityTask
            subgoal={subgoal}
            key={subgoal.id}
            updateGoalComplete={updateGoalComplete}
            updateGoalPriority={updateGoalPriority}
          />
        ))}
      </VStack>
    </>
  );
}

PriorityTaskList.propTypes = {
  priorityTasks: PropTypes.array.isRequired,
  updateGoalComplete: PropTypes.func.isRequired,
  updateGoalPriority: PropTypes.func.isRequired,
};

export default PriorityTaskList;
