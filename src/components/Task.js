import React from "react";
import "../index.css";
import Button from "@material-ui/core/Button";
import IconButton from "@material-ui/core/IconButton";
import DeleteIcon from "@material-ui/icons/Delete";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
  margin: {
    margin: theme.spacing(1),
  },
  extendedIcon: {
    marginRight: theme.spacing(1),
  },
}));

const Task = ({ id, task, updateTask, removeTask }) => {
  const handleEdit = () => {
    let desc = "new update desc";
    updateTask(id, desc);
  };

  const classes = useStyles();

  return (
    <div className="card-container" onDoubleClick={handleEdit}>
      {task.description}
      {task.date}
      {task.email}
      <IconButton
        aria-label="delete"
        className={classes.margin}
        onClick={() => removeTask(id)}
      >
        <DeleteIcon fontSize="small" />
      </IconButton>
    </div>
  );
};

export default Task;
