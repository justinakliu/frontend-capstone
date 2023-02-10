import { useState, useEffect } from "react";
import { ChakraProvider, Spacer } from "@chakra-ui/react";
import { Flex, Button, Heading } from "@chakra-ui/react";
import GoalList from "../components/GoalList.js";
import AddRootGoalModal from "../components/AddRootGoalModal.js";

import axios from "axios";

const getRootGoalsAPI = () => {
  return axios
    .get(`${process.env.REACT_APP_BACKEND_URL}/goals/roots`)
    .then((response) => {
      return response.data;
    })
    .catch((err) => {
      console.log(err);
    });
};

const createGoalAPI = (goalData) => {
  console.log(goalData);
  return axios
    .post(`${process.env.REACT_APP_BACKEND_URL}/goals`, goalData)
    .catch((err) => {
      console.log(err);
    });
};

const deleteGoalAPI = (id) => {
  return axios
    .delete(`${process.env.REACT_APP_BACKEND_URL}/goals/${id}`)
    .catch((error) => {
      console.log(error);
    });
};

const updateGoalCompleteAPI = (goal) => {
  const requested_change = goal.complete ? "mark_incomplete" : "mark_complete";
  return axios
    .patch(
      `${process.env.REACT_APP_BACKEND_URL}/goals/${goal.id}/${requested_change}`
    )
    .catch((error) => {
      console.log(error);
    });
};

function MyGoals() {
  const [rootGoals, setRootGoals] = useState([]);
  const [isRootModalOpen, setIsRootModalOpen] = useState(false);

  const getRootGoals = () => {
    getRootGoalsAPI().then((data) => {
      setRootGoals(data);
    });
  };

  useEffect(() => {
    getRootGoals();
  }, []);

  const handleDeleteRootNode = () => {
    return getRootGoals();
  };

  const addRootGoal = (name) => {
    const requestBody = { title: name };
    return createGoalAPI(requestBody).then((result) => {
      setIsRootModalOpen(false);
      return getRootGoals();
    });
  };

  const deleteGoal = (goalId) => {
    return deleteGoalAPI(goalId).then((result) => {
      return getRootGoals();
    });
  };

  const updateGoalComplete = (goalData) => {
    return updateGoalCompleteAPI(goalData).then((result) => {
      return getRootGoals();
    });
  };

  return (
    <ChakraProvider>
      <Flex align="center" justifyContent="center" margin={3} gap={2}>
        <Flex
          backgroundColor="orange.200"
          mt={4}
          padding={2}
          borderRadius="10px"
          gap={4}
        >
          <Flex align="center" justifyContent="space-between">
            <Flex margin={2}>
              <Heading size="md" color="gray.700">
                My Goals
              </Heading>
            </Flex>
            <Spacer />
            <Button size="sm" onClick={() => setIsRootModalOpen(true)}>
              +
            </Button>
          </Flex>
        </Flex>
      </Flex>
      <GoalList rootGoals={rootGoals} updateGoalComplete={updateGoalComplete} />
      <AddRootGoalModal
        isOpen={isRootModalOpen}
        onClose={() => setIsRootModalOpen(false)}
        onSubmit={addRootGoal}
      />
    </ChakraProvider>
  );
}
export default MyGoals;

// My Goals: completion status bar, delete button for goal
// Nav Bar: Log Out
// UI: Styling, Make Goal Page look different than To DO List
// Add Text to UI like TO DO LIST or something
// In Demo seed file, add emoji stuff
// Sort My Goals by alphabetical? Or by completion?
// Write Tests
