import { useState, useEffect } from "react";
import { ChakraProvider } from "@chakra-ui/react";
import { Select, Menu, Box, Flex, Button } from "@chakra-ui/react";
import TaskTree from "./components/TaskTree.js";
import TaskList from "./components/TaskTree.js";
import axios from "axios";
import AddNodeModal from "./components/AddNodeModal.js";

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

function App() {
  const [rootGoals, setRootGoals] = useState([]);
  const [selectedRootGoalId, setSelectedRootGoalId] = useState(undefined);
  const [listView, setListView] = useState(true);

  const getRootGoals = () => {
    getRootGoalsAPI().then((data) => {
      console.log(data);
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
    const requestBody = { title: name, description: "whatever" };
    return createGoalAPI(requestBody).then((result) => {
      return getRootGoals();
    });
  };

  return (
    <ChakraProvider>
      <Box pos="absolute" top="0" left="0" w="100vw" h="60px" bg="tomato">
        <Box display="flex" alignItems="center" justifyContent="space-between">
          <Select
            placeholder="Select a Goal"
            onChange={(event) => {
              setSelectedRootGoalId(event.target.value);
            }}
          >
            {rootGoals.map((rootGoal) => {
              return <option value={rootGoal.id}>{rootGoal.name}</option>;
            })}
          </Select>
          <Button onClick={addRootGoal}>Create New Goal Tree</Button>
          <Button
            onClick={() => {
              setListView(!listView);
            }}
          >
            Toggle View
          </Button>
        </Box>
      </Box>
      {!listView && Boolean(selectedRootGoalId) && (
        <TaskTree
          goalTreeId={selectedRootGoalId}
          handleDeleteRootNode={handleDeleteRootNode}
        />
      )}
      {listView && Boolean(selectedRootGoalId) && <TaskList />}
    </ChakraProvider>
  );
}
export default App;

// TO DO: Add "Create New Goal Tree Modal"
// After creating new root goal, should set Selected Goal to that Goal
// Change Text Depending on
// Lift Up State for Task Tree
