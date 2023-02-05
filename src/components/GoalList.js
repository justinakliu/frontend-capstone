import PropTypes from "prop-types";
import Goal from "./Goal";
import { VStack, StackDivider } from "@chakra-ui/react";
import { useEffect, useState, useCallback } from "react";

import axios from "axios";

function GoalList({ rootGoals, updateGoalComplete }) {
  const handleUpdateGoalComplete = (nodeData) => {
    return updateGoalComplete(nodeData);
  };

  return (
    <>
      <VStack
        divider={<StackDivider borderColor="gray.200" />}
        spacing={4}
        align="stretch"
        ml={20}
        mr={20}
        mt={10}
        mb={10}
        // ml="15%"
        // mr="15%"
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
