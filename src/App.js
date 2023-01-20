import { useState, useEffect } from "react";
import { ChakraProvider } from "@chakra-ui/react";
import { Select } from "@chakra-ui/react";
import TaskTree from "./components/TaskTree.js";
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

function App() {
  const [rootGoals, setRootGoals] = useState([]);
  const [selectedRootGoalId, setSelectedRootGoalId] = useState(undefined);

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

  return (
    <ChakraProvider>
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
      <button>Add Goal</button>
      <button>Tree / List</button>
      {selectedRootGoalId ? (
        <TaskTree
          goalTreeId={selectedRootGoalId}
          handleDeleteRootNode={handleDeleteRootNode}
        />
      ) : (
        ""
      )}
    </ChakraProvider>
  );
}
export default App;
