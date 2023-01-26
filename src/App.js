import { useState, useEffect } from "react";
import { ChakraProvider, Spacer } from "@chakra-ui/react";
import { Select, Menu, Box, Flex, Button, Heading } from "@chakra-ui/react";
import TaskTree from "./components/TaskTree.js";
import TaskList from "./components/TaskList.js";
import AddRootGoalModal from "./components/AddRootGoalModal.js";
import NavBar from "./components/NavBar.js";

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

function App() {
  const [rootGoals, setRootGoals] = useState([]);
  const [selectedRootGoalId, setSelectedRootGoalId] = useState(undefined);
  const [listView, setListView] = useState(false);
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
    setSelectedRootGoalId(undefined);
    return getRootGoals();
  };

  const addRootGoal = (name) => {
    const requestBody = { title: name };
    return createGoalAPI(requestBody).then((result) => {
      setIsRootModalOpen(false);
      setSelectedRootGoalId(result.data.id);
      return getRootGoals();
    });
  };

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
      <NavBar />
      <Flex
        w="100vw"
        h="60px"
        align="center"
        justify="space-between"
        padding={6}
        bg="blue.100"
      >
        <Select
          bg="gray.100"
          maxW="lg"
          placeholder="Select a Goal"
          onChange={(event) => {
            setSelectedRootGoalId(event.target.value);
          }}
        >
          {rootGoals.map((rootGoal) => {
            return <option value={rootGoal.id}>{rootGoal.name}</option>;
          })}
        </Select>
        <Spacer />
        <Flex align="center" justify="space-between" gap="2">
          <Button onClick={() => setIsRootModalOpen(true)}>
            Create New Goal Tree
          </Button>
          <Button onClick={() => {}}>Delete Goal</Button>
          <Button
            onClick={() => {
              setListView(!listView);
            }}
          >
            Toggle View
          </Button>
        </Flex>
      </Flex>
      {!listView && Boolean(selectedRootGoalId) && (
        <TaskTree
          goalId={selectedRootGoalId}
          addGoal={addSubgoal}
          deleteGoal={deleteGoal}
          updateGoalComplete={updateGoalComplete}
        />
      )}
      {listView && Boolean(selectedRootGoalId) && (
        <TaskList
          goalId={selectedRootGoalId}
          updateGoalComplete={updateGoalComplete}
        />
      )}
      <AddRootGoalModal
        isOpen={isRootModalOpen}
        onClose={() => setIsRootModalOpen(false)}
        onSubmit={addRootGoal}
      />
    </ChakraProvider>
  );
}
export default App;

// TO DO: Add "Create New Goal Tree Modal"
// After creating new root goal, should set Selected Goal to that Goal
// Change Text Depending on
// Lift Up State for Task Tree
