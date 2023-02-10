import { useState, useEffect, useCallback } from "react";
import { Flex, Heading, Icon, IconButton } from "@chakra-ui/react";
import TaskTree from "../components/TaskTree.js";
import TaskList from "../components/TaskList.js";
import { useParams } from "react-router-dom";
import { ImTree } from "react-icons/im";
import { AiOutlineUnorderedList } from "react-icons/ai";

import axios from "axios";

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
    <>
      <Flex align="center" justify="center">
        <Flex
          backgroundColor="orange.200"
          mt={4}
          padding={2}
          borderRadius="10px"
          gap={4}
        >
          <Flex align="center" margin={1}>
            <Heading size="md" color="gray.700">
              {goalName}
            </Heading>
          </Flex>
          <Flex align="center" justify="space-between" gap="2">
            <IconButton
              size="sm"
              icon={<Icon as={listView ? ImTree : AiOutlineUnorderedList} />}
              onClick={() => {
                setListView(!listView);
              }}
            ></IconButton>
          </Flex>
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
    </>
  );
}
export default ViewGoal;
