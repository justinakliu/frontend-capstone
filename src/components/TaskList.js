import PropTypes from "prop-types";
import Task from "./Task";
import { VStack, StackDivider } from "@chakra-ui/react";
import { useEffect, useState, useCallback } from "react";

import axios from "axios";

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

function TaskList({ goalId, updateGoalComplete }) {
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

  return (
    <>
      <VStack
        divider={<StackDivider borderColor="gray.300" />}
        spacing={4}
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
          />
        ))}
      </VStack>
    </>
  );
}

TaskList.propTypes = {
  goalId: PropTypes.string.isRequired,
  handleUpdateGoalComplete: PropTypes.func.isRequired,
};

export default TaskList;
