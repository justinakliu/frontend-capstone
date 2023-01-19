// get leaf nodes
import PropTypes from "prop-types";

function Task(props) {
  return (
    <li>
      <h3>{props.name}</h3>
      <button>Is Complete = {props.complete}</button>
    </li>
  );
}

export default Task;

Task.propTypes = {
  name: PropTypes.string.isRequired,
  complete: PropTypes.bool.isRequired,
};
