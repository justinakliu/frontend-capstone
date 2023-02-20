import { useEffect, useState, useCallback } from "react";
import PropTypes from "prop-types";
import { VStack, StackDivider } from "@chakra-ui/react";
import axios from "axios";
import Task from "./Task";

const getLeafGoalsAPI = (id) => {
  return axios
    .get(`${process.env.REACT_APP_BACKEND_URL}/goals/${id}/leaves`)
    .then((response) => {
      return response.data;
    })
    .catch((err) => {
      console.log(err);
    });
};

function TaskList({ goalId, updateGoalComplete, updateGoalPriority }) {
  const [list, setList] = useState([]);

  const getList = useCallback(() => {
    return getLeafGoalsAPI(goalId).then((data) => {
      setList(data);
    });
  }, [goalId]);

  useEffect(() => {
    getList();
  }, [getList]);

  const handleUpdateGoalComplete = (nodeData) => {
    return updateGoalComplete(nodeData).then((result) => {
      return getList();
    });
  };

  const handleUpdateGoalPriority = (nodeData) => {
    return updateGoalPriority(nodeData).then((result) => {
      return getList();
    });
  };

  return (
    <VStack
      divider={<StackDivider borderColor="gray.200" />}
      spacing={2}
      align="stretch"
      ml={20}
      mr={20}
      mt={5}
      mb={10}
    >
      {list.map((subgoal) => (
        <Task
          subgoal={subgoal}
          handleUpdateGoalComplete={handleUpdateGoalComplete}
          handleUpdateGoalPriority={handleUpdateGoalPriority}
        />
      ))}
    </VStack>
  );
}

TaskList.propTypes = {
  goalId: PropTypes.string.isRequired,
  updateGoalComplete: PropTypes.func.isRequired,
  updateGoalPriority: PropTypes.func.isRequired,
};

export default TaskList;
