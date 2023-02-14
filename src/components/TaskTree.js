import { useEffect, useState, useCallback } from "react";
import PropTypes from "prop-types";
import { Box } from "@chakra-ui/react";
import Tree from "react-d3-tree";
import ClickedNodeModal from "./ClickedNodeModal";
import "./Tree.css";

import axios from "axios";

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

function TaskTree({ goalId, addGoal, deleteGoal, updateGoalComplete }) {
  const [tree, setTree] = useState({});
  const [node, setNode] = useState(undefined);

  const renderSvgNode = ({ nodeDatum, onNodeClick }) => {
    const getCompleteClass = (nodeDatum) => {
      if (nodeDatum === undefined) {
        return "";
      } else {
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
    return getGoalTreeAPI(goalId).then((data) => {
      setTree(data);
    });
  }, [goalId]);

  useEffect(() => {
    getGoalTree();
  }, [getGoalTree]);

  const closeClickedGoalModal = () => {
    setNode(undefined);
  };

  const handleAddSubgoal = (subgoalTitle) => {
    const parentId = node.data.id;
    return addGoal(subgoalTitle, parentId).then((result) => {
      closeClickedGoalModal();
      return getGoalTree();
    });
  };

  const handleDeleteGoal = () => {
    return deleteGoal(node.data).then((result) => {
      closeClickedGoalModal();
      return getGoalTree();
    });
  };

  const handleUpdateGoalComplete = () => {
    return updateGoalComplete(node.data).then((result) => {
      closeClickedGoalModal();
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
        translate={{ x: 600, y: 100 }}
        collapsible={false}
        orientation={"vertical"}
        renderCustomNodeElement={renderSvgNode}
        separation={{ nonSiblings: 2, siblings: 2 }}
        zoom={0.5}
      />

      <ClickedNodeModal
        isOpen={Boolean(node)}
        clickedNode={node}
        closeClickedGoalModal={closeClickedGoalModal}
        handleAddSubgoal={handleAddSubgoal}
        handleDeleteGoal={handleDeleteGoal}
        handleUpdateGoalComplete={handleUpdateGoalComplete}
      />
    </Box>
  );
}

export default TaskTree;

TaskTree.propTypes = {
  goalId: PropTypes.string.isRequired,
  addGoal: PropTypes.func.isRequired,
  deleteGoal: PropTypes.func.isRequired,
  updateGoalComplete: PropTypes.func.isRequired,
};
