import PropTypes from "prop-types";
import Task from "./Task";
import { VStack, StackDivider } from "@chakra-ui/react";

function TaskList(props) {
  return (
    <VStack
      divider={<StackDivider borderColor="gray.200" />}
      spacing={4}
      align="stretch"
    >
      {props.leafGoals.map((subgoal) => (
        <Task name={subgoal.name} complete={subgoal.complete} />
      ))}
    </VStack>
  );
}

TaskList.propTypes = {
  leafGoals: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number.isRequired,
      name: PropTypes.string.isRequired,
      complete: PropTypes.bool,
      parent_id: PropTypes.number,
      children: PropTypes.array,
      description: PropTypes.string,
    })
  ).isRequired,
  onSetComplete: PropTypes.func.isRequired,
};

export default TaskList;
