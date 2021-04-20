import React from "react";
import { LANE_TYPE } from "../utils/constans";
import Lane from "./Lane";
import "../index.css";
import { getTasks, removeTask, addTask, updateTask } from "../utils/TaskFunctions";

const Board = ({ board, user }) => {
  const [loading, setLoading] = React.useState(true);
  const [tasks, setTasks] = React.useState([]);
  const [error, setError] = React.useState("");
  
  React.useEffect(() => {
    getTasks(setError, setLoading, setTasks, { board});
  }, []);

  const _addTask = (type, description) => {
    addTask(setError, setLoading, setTasks, { description, user, board, status: type.status});
  };

  const _updateTask = (item) => {
    updateTask(setError, setLoading, setTasks, { item, board });
  };

  const _removeTask = (id) => {
    removeTask(setError, setLoading, setTasks, { board, id});
  };

  const filterTasks = (status) => {
    const laneTasks = [];
    for (let i = 0; i < tasks.length; i++) {
      if (tasks[i].status === status) {
        laneTasks.push(tasks[i]);
      }
    }
    return laneTasks;
  };

  if (loading)
    return (
      <div>
        <span>Loading...</span>
      </div>
    );

  const getLanes = () => {
    return Object.keys(LANE_TYPE).map((key) => (
      <Lane
        key={key}
        type={LANE_TYPE[key]}
        tasks={filterTasks(LANE_TYPE[key].status)}
        addTask={_addTask}
        removeTask={_removeTask}
        updateTask={_updateTask}
      />
    ));
  };

  return (
    <div className="board-container">
      <div className="board-title-container">
        <span className={"board-title"}>{board}</span>
      </div>

      <div className="board-lanes-container">
        {error ? (
          <div className="board-error-container">
            <span>Error: {error.message}</span>
          </div>
        ) : (
          getLanes()
        )}
      </div>
    </div>
  );
};

export default Board;
