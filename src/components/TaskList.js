import PropTypes from "prop-types";
import axios from "axios";
import Task from "./Task";
import { VStack, StackDivider } from "@chakra-ui/react";

// get leaf nodes
// Props will be a hierarchical data structure

const LEAVES = [
  { name: "write resume", complete: false },
  { name: "apply to job", complete: false },
];

function TaskList() {
  return (
    <VStack
      divider={<StackDivider borderColor="gray.200" />}
      spacing={4}
      align="stretch"
    >
      {LEAVES.map((subgoal) => (
        <Task name={subgoal.name} complete={subgoal.complete} />
      ))}
    </VStack>
  );
}

TaskList.propTypes = {
  tasks: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number.isRequired,
      name: PropTypes.string.isRequired,
      complete: PropTypes.bool.isRequired,
    })
  ).isRequired,
  onSetComplete: PropTypes.func.isRequired,
};

export default TaskList;
