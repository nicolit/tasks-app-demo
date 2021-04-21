import React from "react";
import { LANE_TYPE } from "../utils/constans";
import Lane from "./Lane";
import "../index.css";
import { getTasks } from "../utils/TaskFunctions";
import CircularProgress from "@material-ui/core/CircularProgress";

const Board = ({ board, user }) => {
  const [loading, setLoading] = React.useState(true);
  const [tasks, setTasks] = React.useState([]);
  const [error, setError] = React.useState("");
  
  React.useEffect(() => {
    getTasks(setError, setLoading, setTasks, { board});
  }, []);

  const updateTasks = (tasks) => {
    setTasks(tasks);
  }

  const filterTasks = (status) => {
    const laneTasks = [];
    for (let i = 0; i < tasks.length; i++) {
      if (tasks[i].status === status) {
        laneTasks.push(tasks[i]);
      }
    }
    return laneTasks;
  };

  if (loading) {
    return (
      <div>
        <CircularProgress color="secondary" />
      </div>
    );
  }

  const getLanes = () => {
    return Object.keys(LANE_TYPE).map((key) => (
      <Lane
        key={key}
        type={LANE_TYPE[key]}
        tasks={filterTasks(LANE_TYPE[key].status)}
        board={board}
        user={user}
        setTasks={updateTasks}
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
