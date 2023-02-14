import PropTypes from "prop-types";
import { VStack } from "@chakra-ui/react";
import Goal from "./Goal";

function GoalList({ rootGoals, updateGoalComplete, deleteGoal }) {
  const handleUpdateGoalComplete = (nodeData) => {
    return updateGoalComplete(nodeData);
  };

  return (
    <>
      <VStack spacing={4} align="stretch" ml={20} mr={20} mt={5} mb={10}>
        {rootGoals.map((goal) => (
          <Goal
            goal={goal}
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
  handleUpdateGoalComplete: PropTypes.func.isRequired,
};

export default GoalList;
