import React, { useState } from "react";
import Task from "./Task";
import "../index.css";
import Button from "@material-ui/core/Button";
import TaskForm from "../components/TaskForm";
import CircularProgress from "@material-ui/core/CircularProgress";
import {
  removeTask,
  addTask,
  updateTask,
} from "../utils/TaskFunctions";

const Lane = ({ type, tasks, user, board, setTasks }) => {
  const [show, setShow] = useState(false);
  const [task, setTask] = useState(null);
  const [error, setError] = React.useState("");
  const [loading, setLoading] = React.useState(false);

  const handleClose = () => setShow(false);

  const handleShow = (task = null) => {
    setTask(task);
    setShow(true);
  };

  const _addTask = (type, description) => {
    addTask(setError, setLoading, setTasks, {
      description,
      user,
      board,
      status: type.status,
    });
  };

  const _updateTask = (item) => {
    updateTask(setError, setLoading, setTasks, { item, board });
  };

  const _removeTask = (id) => {
    removeTask(setError, setLoading, setTasks, { board, id });
  };

  const renderTasks = () => {
    return tasks.map((item) => (
      <Task
        key={item.id}
        task={item}
        type={type}
        editTask={handleShow}
        removeTask={_removeTask}
        updateTask={_updateTask}
      />
    ));
  };

  return (
    <div className="lane-container">
      <div className="lane-title">
        <span>{type.key}</span>
      </div>
      <div className={"lane-task-form"}>
        <Button
          onClick={() => handleShow()}
          variant="contained"
          color="primary"
          className={"button"}
        >
          + Add task
        </Button>
      </div>
      <div className={"lane-tasks-container"}>{tasks && renderTasks()}</div>
      {loading && (
        <div>
          <CircularProgress color="secondary" />
        </div>
      )}

      {error && (
        <div className="board-error-container">
          <span>Error: {error.message}</span>
        </div>
      )}

      <TaskForm
        isVisible={show}
        handleClose={handleClose}
        task={task}
        addTask={_addTask}
        updateTask={_updateTask}
        type={type}
      />
    </div>
  );
};

export default Lane;
