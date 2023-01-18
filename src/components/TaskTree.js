import { useEffect, useState } from "react";
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

// const deleteGoalAPI = () => {};

// const updateGoalCompleteAPI = () => {};

// needs to know the parent goal id to know which goal tree to display
// so maybe this component needs to take in tree?
function TaskTree() {
  const [tree, setTree] = useState({});
  const [node, setNode] = useState(undefined);

  const getGoalTree = (id) => {
    return getGoalTreeAPI(id).then((data) => {
      setTree(data);
    });
  };

  useEffect(() => {
    getGoalTree(2); //hard-coded
  }, []);

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
    getGoalTree(2);
  };

  // const handleCatSubmit = (data) => {
  //   // call api, with data that comes back, update cat data with cat
  //   addNewCatApi(data)
  //     .then((newCat) => {
  //       setCatData([newCat, ...catData]);
  //     })
  //     .catch((e) => console.log(e));
  // };

  // in actual function, just add to database
  // the get taskData again

  return (
    <Box w="100vw" h="100vh">
      <Tree
        data={tree}
        onNodeClick={(datum) => setNode(datum)}
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
