import React from "react";
import "../index.css";
import DeleteIcon from "@material-ui/icons/Delete";
import { convertServerToShortDate } from "../utils/utils";
import ArrowBackIos from "@material-ui/icons/ArrowBackIos";
import ArrowForwardIosIcon from "@material-ui/icons/ArrowForwardIos";

const Task = ({ task, editTask, removeTask, updateTask }) => {
  const handleEdit = () => {
    editTask(task);
  };

  return (
    <div className="card-container" onDoubleClick={handleEdit}>
      <div className={"task-desc"}>{task.description}</div>
      <div className={"task-details"}>
        {task.date && convertServerToShortDate(task.date)}
      </div>
      <div className={"task-details"}>{task.email}</div>
      <div className={"task-buttons"}>
        {task.status > 0 ? (
          <ArrowBackIos
            fontSize="small"
            onClick={() => updateTask({id: task.id, status: task.status - 1})}
          />
        ) : (
          <div />
        )}

        <DeleteIcon fontSize="small" onClick={() => removeTask(task.id)} />

        {task.status < 3 ? (
          <ArrowForwardIosIcon
            fontSize="small"
            onClick={() => updateTask({id: task.id, status: task.status + 1})}
          />
        ) : (
          <div />
        )}
      </div>
    </div>
  );
};

export default Task;
