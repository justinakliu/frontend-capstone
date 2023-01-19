import { useEffect, useState, useCallback } from "react";
import Tree from "react-d3-tree";
import { Box } from "@chakra-ui/react";
import axios from "axios";

import "./TaskTree.css";
import AddNodeModal from "./AddNodeModal";

// FOR ANOTHER COMPONENT -> MY GOALS PAGE
// const getAllRootGoalsAPI = () => {
//   return axios
//     .get(`${process.env.REACT_APP_BACKEND_URL}/goals`)
//     .catch((err) => {
//       console.log(err);
//     });
// };

const getGoalTreeAPI = async (id) => {
  const response = await axios.get(
    `${process.env.REACT_APP_BACKEND_URL}/goals/${id}/tree`
  );
  return response.data;
};

const createGoalAPI = (goalData) => {
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

const updateGoalCompleteAPI = () => {};

// needs to know the parent goal id to know which goal tree to display
// so maybe this component needs to take in tree?
function TaskTree({ goalTreeId }) {
  const [tree, setTree] = useState({});
  const [node, setNode] = useState(undefined);

  const getGoalTree = useCallback(() => {
    return getGoalTreeAPI(goalTreeId).then((data) => {
      console.log(data);
      setTree(data);
    });
  }, [goalTreeId]);

  useEffect(() => {
    getGoalTree(); //hard-coded
  }, [getGoalTree]); // why underlined?

  const close = () => setNode(undefined);

  const handleSubmit = (name) => {
    console.log(node);
    const requestBody = {
      parent_id: node.data.id,
      title: name,
      description: "whatever",
    };
    createGoalAPI(requestBody);
    close();
    getGoalTree(goalTreeId);
  };

  // should i chain this?
  const deleteGoal = (id) => {
    deleteGoalAPI(id);
    getGoalTree(goalTreeId);
  };

  // should i chain?
  const updateGoalComplete = (id) => {
    updateGoalCompleteAPI(id);
    getGoalTree(goalTreeId);
  };

  return (
    <Box w="100vw" h="100vh">
      <Tree
        data={tree}
        onNodeClick={(datum) => {
          setNode(datum);
          console.log(datum);
        }}
        translate={{ x: 300, y: 300 }}
        collapsible={false}
        orientation={"vertical"}
      />
      <AddNodeModal
        isOpen={Boolean(node)}
        onClose={close}
        onSubmit={handleSubmit}
        clickedNode={node}
      />
    </Box>
  );
}

export default TaskTree;
