import axios from "axios";
import Task from "./Task";

// get leaf nodes
const getLeafNodesAPI = (id) => {
  return axios
    .get(`${process.env.REACT_APP_BACKEND_URL}/goals/${id}/leaves`)
    .then((response) => {
      console.log(response.data);
    });
};

const LEAVES = [
  { name: "write resume", complete: false },
  { name: "apply to job", complete: false },
];
function TaskList() {
  return (
    <>
      <ul>
        {LEAVES.map((subgoal) => (
          <Task name={subgoal.name} complete={subgoal.complete} />
        ))}
      </ul>
    </>
  );
}

export default TaskList;
