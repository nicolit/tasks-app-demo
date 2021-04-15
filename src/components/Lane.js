import React from "react";
import Card from "./Task";
import "../index.css";
import Button from "@material-ui/core/Button";

const Lane = ({ dbTasksRef, type, tasks, user, addTask, removeTask }) => {
  const updateTask = (taskId, description) => {
    if (description !== "") {
      let now = new Date();
      let taskRef = dbTasksRef.child(taskId);
      taskRef.update({ description, date: now.toTimeString() });
    }
  };

  const renderTasks = () => {
    return Object.keys(tasks).map((item) => (
      <Card
        key={item}
        id={item}
        task={tasks[item]}
        updateTask={updateTask}
        removeTask={removeTask}
      />
    ));
  };

  return (
    <div className="lane-container">
      <div className="lane-title">
        <span>{type.key}</span>
      </div>
      <div className={"lane-tasks-container"}>{tasks && renderTasks()}</div>
      <div className={"lane-bottom"}>
        <Button
          onClick={() => addTask(type, "bla bla")}
          variant="contained"
          color="primary"
          className={"button"}
        >
          + Add task
        </Button>
      </div>
    </div>
  );
};

export default Lane;
