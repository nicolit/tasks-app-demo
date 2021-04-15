import React, {useState} from "react";
import Task from "./Task";
import "../index.css";
import Button from "@material-ui/core/Button";
import TaskForm from "../components/TaskForm";

const Lane = ({ dbTasksRef, type, tasks, addTask, removeTask, updateTask, moveTask }) => {
  const [show, setShow] = useState(false);
  const [task, setTask] = useState(null);

  const handleClose = () => setShow(false);

  const handleShow = (task=null) => {
    setTask(task);
    setShow(true);
  }


  const renderTasks = () => {
    return Object.keys(tasks).map((item) => (
      <Task
        key={item}
        id={item}
        task={tasks[item]}
        editTask={handleShow}
        removeTask={removeTask}
        moveTask={moveTask}
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
        className={'button'}
      >
          + Add task
      </Button>
      </div>
      <div className={"lane-tasks-container"}>{tasks && renderTasks()}</div>

      <TaskForm isVisible={show} handleClose={handleClose} task={task}
       addTask={addTask} updateTask={updateTask} type={type}/>
    </div>
  );
};

export default Lane;
