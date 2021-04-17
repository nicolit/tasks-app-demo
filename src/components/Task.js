import React from "react";
import "../index.css";
import DeleteIcon from "@material-ui/icons/Delete";
import { makeStyles } from "@material-ui/core/styles";
import { convertServerToShortDate } from "../utils/utils";
import ArrowBackIos from "@material-ui/icons/ArrowBackIos";
import ArrowForwardIosIcon from "@material-ui/icons/ArrowForwardIos";

const Task = ({ id, task, editTask, removeTask, moveTask }) => {
  const handleEdit = () => {
    editTask(task);
  };

  return (
    <div className="card-container" onDoubleClick={handleEdit}>
      <div className={"task-desc"}>{task.description}</div>
      <div className={"task-details"}>
        {convertServerToShortDate(task.date)}
      </div>
      <div className={"task-details"}>{task.email}</div>
      <div className={"task-buttons"}>
        {task.status > 0 ? (
          <ArrowBackIos
            fontSize="small"
            onClick={() => moveTask(id, task.status - 1)}
          />
        ) : (
          <div />
        )}

        <DeleteIcon fontSize="small" onClick={() => removeTask(id)} />

        {task.status < 3 ? (
          <ArrowForwardIosIcon
            fontSize="small"
            onClick={() => moveTask(id, task.status + 1)}
          />
        ) : (
          <div />
        )}
      </div>
    </div>
  );
};

export default Task;
