import PropTypes from "prop-types";
import Goal from "./Goal";
import { VStack, StackDivider } from "@chakra-ui/react";

function GoalList({ rootGoals, updateGoalComplete }) {
  const handleUpdateGoalComplete = (nodeData) => {
    return updateGoalComplete(nodeData);
  };

  return (
    <>
      <VStack
        divider={<StackDivider borderColor="orange.400" />}
        spacing={4}
        align="stretch"
        ml={20}
        mr={20}
        mt={5}
        mb={10}
      >
        {rootGoals.map((goal) => (
          <Goal
            goal={goal}
            handleUpdateGoalComplete={handleUpdateGoalComplete}
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
