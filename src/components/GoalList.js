import PropTypes from "prop-types";
import { VStack } from "@chakra-ui/react";
import Goal from "./Goal";

function GoalList({ rootGoals, updateGoalComplete, deleteGoal }) {
  const handleUpdateGoalComplete = (nodeData) => {
    return updateGoalComplete(nodeData);
  };

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
        {rootGoals.map((goal) => (
          <Goal
            goal={goal}
            key={goal.id}
            handleUpdateGoalComplete={handleUpdateGoalComplete}
            deleteGoal={deleteGoal}
          />
        ))}
      </VStack>
    </>
  );
}

GoalList.propTypes = {
  rootGoals: PropTypes.array.isRequired,
  updateGoalComplete: PropTypes.func.isRequired,
  deleteGoal: PropTypes.func.isRequired,
};

export default GoalList;
