import { useState, useEffect, useCallback } from "react";
import { ChakraProvider, Spacer } from "@chakra-ui/react";
import { Select, Menu, Box, Flex, Button, Heading } from "@chakra-ui/react";
import TaskTree from "../components/TaskTree.js";
import TaskList from "../components/TaskList.js";
import AddRootGoalModal from "../components/AddRootGoalModal.js";
import NavBar from "../components/NavBar.js";
import { useParams } from "react-router-dom";

import axios from "axios";

// getGoal
const getGoalAPI = (id) => {
  return axios
    .get(`${process.env.REACT_APP_BACKEND_URL}/goals/${id}`)
    .then((response) => {
      console.log(response.data);
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

// same as in TaskTree file
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

// rename
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

function ViewGoal() {
  const { goalId, view } = useParams();

  const [listView, setListView] = useState(view === "list" ? true : false);
  // const [goalId2, setGoalId2] = useState(goalId);

  const [goalName, setGoalName] = useState("");

  const getGoalName = useCallback(() => {
    getGoalAPI(goalId).then((result) => {
      console.log(result.name);
      setGoalName(result.name);
    });
  }, [goalId]);

  useEffect(() => {
    getGoalName();
  }, [getGoalName]);

  const addSubgoal = (title, parentId) => {
    const requestBody = {
      parent_id: parentId,
      title: title,
    };
    return createGoalAPI(requestBody).then((result) => {
      return result;
    });
  };

  const deleteGoal = (goalId) => {
    return deleteGoalAPI(goalId).then((result) => {
      return result;
    });
  };

  const updateGoalComplete = (goalData) => {
    return updateGoalCompleteAPI(goalData).then((result) => {
      return result;
    });
  };

  return (
    <ChakraProvider>
      <Flex align="center" justify="space-between" padding={6} ml={20} mr={20}>
        <Flex align="center">
          <Heading size="md">{goalName}</Heading>
        </Flex>
        <Spacer />
        <Flex align="center" justify="space-between" gap="2">
          <Button
            onClick={() => {
              setListView(!listView);
            }}
          >
            Toggle View
          </Button>{" "}
        </Flex>
      </Flex>
      {!listView && (
        <TaskTree
          goalId={goalId}
          addGoal={addSubgoal}
          deleteGoal={deleteGoal}
          updateGoalComplete={updateGoalComplete}
        />
      )}
      {listView && (
        <TaskList goalId={goalId} updateGoalComplete={updateGoalComplete} />
      )}
      {/* <AddRootGoalModal
        isOpen={isRootModalOpen}
        onClose={() => setIsRootModalOpen(false)}
        onSubmit={addRootGoal}
      /> */}
    </ChakraProvider>
  );
}
export default ViewGoal;

// TO DO: Add name of selected Goal
// Add Icons to Toggle View Button
// Add Instructions Text
