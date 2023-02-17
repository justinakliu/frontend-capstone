import { useState, useEffect } from "react";
import { Grid, GridItem, Spacer, Text, Flex, Button } from "@chakra-ui/react";

import GoalList from "../components/GoalList.js";
import PriorityTaskList from "../components/PriorityTaskList";

import AddRootGoalModal from "../components/AddRootGoalModal.js";

import axios from "axios";

const getAllGoalsAPI = () => {
  return axios
    .get(`${process.env.REACT_APP_BACKEND_URL}/goals`)
    .then((response) => {
      return response.data;
    })
    .catch((err) => {
      console.log(err);
    });
};

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

const updateGoalPriorityAPI = (goal) => {
  const requested_change = goal.priority ? "unmark_priority" : "mark_priority";
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
  const [priorityTasks, setPriorityTasks] = useState([]);
  const [isRootModalOpen, setIsRootModalOpen] = useState(false);

  const getRootGoals = () => {
    getRootGoalsAPI().then((data) => {
      setRootGoals(data);
    });
  };

  const getPriorityTasks = () => {
    return getAllGoalsAPI().then((data) => {
      setPriorityTasks(
        data.filter((task) => {
          return !Boolean(task.complete) && Boolean(task.priority);
        })
      );
    });
  };

  useEffect(() => {
    getRootGoals();
  }, []);

  useEffect(() => {
    getPriorityTasks();
  }, []);

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
      getRootGoals();
      getPriorityTasks();
    });
  };

  const updateGoalPriority = (goalData) => {
    return updateGoalPriorityAPI(goalData).then((result) => {
      return getPriorityTasks();
    });
  };

  return (
    <>
      <Grid templateColumns="repeat(2, 1fr)" gap={2}>
        <GridItem w="100%">
          <Flex align="center" justifyContent="center" margin={3} gap={2}>
            <Flex padding={2} gap={4}>
              <Flex align="center" justifyContent="space-between">
                <Flex margin={2}>
                  <Text fontSize="lg" fontWeight="bold" color="gray.700">
                    Priority Tasks
                  </Text>
                </Flex>
              </Flex>
            </Flex>
          </Flex>
          <PriorityTaskList
            priorityTasks={priorityTasks}
            updateGoalComplete={updateGoalComplete}
            updateGoalPriority={updateGoalPriority}
          />
        </GridItem>

        <GridItem w="100%">
          <Flex align="center" justifyContent="center" margin={3} gap={2}>
            <Flex padding={2} gap={4}>
              <Flex align="center" justifyContent="space-between">
                <Flex margin={2}>
                  <Text fontSize="lg" fontWeight="bold" color="gray.700">
                    Goals
                  </Text>
                </Flex>
                <Spacer />
                <Button size="sm" onClick={() => setIsRootModalOpen(true)}>
                  +
                </Button>
              </Flex>
            </Flex>
          </Flex>
          <GoalList
            rootGoals={rootGoals}
            updateGoalComplete={updateGoalComplete}
            deleteGoal={deleteGoal}
          />
        </GridItem>
      </Grid>
      <AddRootGoalModal
        isOpen={isRootModalOpen}
        onClose={() => setIsRootModalOpen(false)}
        onSubmit={addRootGoal}
      />
    </>
  );
}
export default MyGoals;
