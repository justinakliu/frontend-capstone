import { useEffect, useState, useCallback } from "react";
import Tree from "react-d3-tree";
import { Box } from "@chakra-ui/react";
import axios from "axios";
import ClickedNodeModal from "./ClickedNodeModal";
import "./Tree.css";

// lift up ???
const getGoalTreeAPI = (id) => {
  return axios
    .get(`${process.env.REACT_APP_BACKEND_URL}/goals/${id}/tree`)
    .then((response) => {
      return response.data;
    })
    .catch((err) => {
      console.log(err);
    });
};

// lift up
const createGoalAPI = (goalData) => {
  console.log(goalData);
  return axios
    .post(`${process.env.REACT_APP_BACKEND_URL}/goals`, goalData)
    .catch((err) => {
      console.log(err);
    });
};

// lift up
const deleteGoalAPI = (id) => {
  return axios
    .delete(`${process.env.REACT_APP_BACKEND_URL}/goals/${id}`)
    .catch((error) => {
      console.log(error);
    });
};

// lift up
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

// needs to know the parent goal id to know which goal tree to display
// so maybe this component needs to take in tree?
function TaskTree({ goalTreeId }) {
  // lift up
  const [tree, setTree] = useState({});
  const [node, setNode] = useState(undefined);

  // seems like everything is getting assigned "complete" class and the

  // how do you work around this without writing a function?
  const renderSvgNode = ({ nodeDatum, onNodeClick }) => {
    const getCompleteClass = (nodeDatum) => {
      if (nodeDatum === undefined) {
        return "";
      } else {
        console.log(nodeDatum.complete);
        return nodeDatum.complete ? "complete" : "";
      }
    };
    return (
      <g>
        <circle
          r="15"
          onClick={onNodeClick}
          className={getCompleteClass(nodeDatum)}
        />
        <text fill="black" strokeWidth="1" x="20">
          {nodeDatum.name}
        </text>
      </g>
    );
  };

  const getGoalTree = useCallback(() => {
    return getGoalTreeAPI(goalTreeId).then((data) => {
      setTree(data);
    });
  }, [goalTreeId]);

  useEffect(() => {
    getGoalTree(); //hard-coded
  }, [getGoalTree]); // why underlined?

  const close = () => {
    setNode(undefined);
  };

  // lift up
  const handleCreateGoalSubmit = (name) => {
    const requestBody = {
      parent_id: node.data.id,
      title: name,
      description: "whatever",
    };
    return createGoalAPI(requestBody).then((result) => {
      close();
      console.log("closed");
      getGoalTree();
    });
  };

  // should i chain this?
  // lift up
  const deleteGoal = () => {
    return deleteGoalAPI(node.data.id).then((result) => {
      close();
      return getGoalTree();
    });
  };

  // should i chain?
  // lift up
  const updateGoalComplete = () => {
    return updateGoalCompleteAPI(node.data).then((result) => {
      close();
      return getGoalTree();
    });
  };

  return (
    <Box w="100vw" h="100vh">
      <Tree
        data={tree}
        onNodeClick={(datum) => {
          setNode(datum);
        }}
        translate={{ x: 300, y: 300 }}
        collapsible={false}
        orientation={"vertical"}
        renderCustomNodeElement={renderSvgNode}
        separation={{ nonSiblings: 2, siblings: 2 }}
      />

      <ClickedNodeModal
        isOpen={Boolean(node)}
        onClose={close}
        onSubmit={handleCreateGoalSubmit}
        clickedNode={node}
        onDelete={deleteGoal}
        onUpdateComplete={updateGoalComplete}
      />
    </Box>
  );
}

export default TaskTree;
