import React from "react";

import { database } from "../firebase";
import { LANE_TYPE } from "../utils/constans";
import Lane from "./Lane";
import "../index.css";
import { getNowServerFormat } from "../utils/utils";

const Board = ({ title, user }) => {
  const [loading, setLoading] = React.useState(true);
  const dbRef = database.ref(`/boards/boards/${title}`);
  const dbTasksRef = dbRef.child("tasks");
  const [tasks, setTasks] = React.useState({});

  React.useEffect(() => {
    dbRef.once("value").then((snapshot) => {
      setLoading(false);
      if (snapshot.exists()) {
        dbTasksRef.once("value").then((snapshot) => {
          if (snapshot.exists()) {
            console.log(snapshot.val());
            setTasks(snapshot.val());
          }
        });
      }
    });
  }, []);

  const removeTask = (id) => {
    dbTasksRef
      .child(id)
      .remove()
      .then(() => {
        console.log("Remove succeeded.");
        setTasks((prevTasks) => {
          let newTasks = { ...prevTasks };
          delete newTasks[id];
          return newTasks;
        });
      })
      .catch((error) => {
        console.log("Remove failed: " + error.message);
      });
  };

  const updateTask = (taskId, description) => {
    let taskRef = dbTasksRef.child(taskId);
    if (description && description !== "") {
      let updateProps = { description, date: getNowServerFormat() };
      taskRef.update(updateProps);
      setTasks((prevTasks) => {
        return({...prevTasks, [taskId]: {...prevTasks[taskId], ...updateProps }});
      });

    }
  };

  const moveTask = (taskId, status) => {
    let taskRef = dbTasksRef.child(taskId);
    let updateProps = { status };
    taskRef.update(updateProps);
    setTasks((prevTasks) => {
      return({...prevTasks, [taskId]: {...prevTasks[taskId], ...updateProps }});
    });
  }



  const addTask = (type, description) => {
    if (description !== "") {
      let newTask = {
        description,
        status: type.status,
        date: getNowServerFormat(),
        user: user.uid,
        email: user.email,
      };
      let taskRef = dbTasksRef.push();
      let taskId = taskRef.getKey();
      taskRef.set(
        {...newTask, id: taskId},
        (error) => {
          if (error) {
            console.log("Data could not be saved." + error);
          } else {
            console.log("Data saved successfully.");
            setTasks((prevTasks) => {
              return({...prevTasks, [taskId]: {...newTask, id: taskId}});
            });
          }
        }
      );
      //   dbRef.collection("tasks").select().get().then((snap) => {
      //     dbRef.update({ num_tasks: snap.size });
      // });

      //setValue('');
      //setError(false);
    } else {
      //setError(true);
    }
  };

  if (loading)
    return (
      <div>
        <span>Loading...</span>
      </div>
    );

  const filterTasks = (status) => {
    const laneTasks = {};
    for (let key in tasks) {
      if (tasks[key].status === status) {
        laneTasks[key] = {...tasks[key], id: key};
      }
    }
    return laneTasks;
  };

  return (
    <div className="board-container">
      <div className="board-title-container">
        <span className={"board-title"}>{title}</span>
      </div>
      <div className="board-lanes-container">
        <Lane
          dbTasksRef={dbTasksRef}
          type={LANE_TYPE.CANDIDATES}
          tasks={filterTasks(LANE_TYPE.CANDIDATES.status)}
          addTask={addTask}
          removeTask={removeTask}
          updateTask={updateTask}
          moveTask={moveTask}
        />
        <Lane
          dbTasksRef={dbTasksRef}
          type={LANE_TYPE.IN_PROGRESS}
          tasks={filterTasks(LANE_TYPE.IN_PROGRESS.status)}
          addTask={addTask}
          removeTask={removeTask}
          updateTask={updateTask}
          moveTask={moveTask}
        />
        <Lane
          dbTasksRef={dbTasksRef}
          type={LANE_TYPE.QA}
          tasks={filterTasks(LANE_TYPE.QA.status)}
          addTask={addTask}
          removeTask={removeTask}
          updateTask={updateTask}
          moveTask={moveTask}
        />
        <Lane
          dbTasksRef={dbTasksRef}
          type={LANE_TYPE.COMPLETED}
          tasks={filterTasks(LANE_TYPE.COMPLETED.status)}
          addTask={addTask}
          removeTask={removeTask}
          updateTask={updateTask}
          moveTask={moveTask}
        />
      </div>
    </div>
  );
};

export default Board;
