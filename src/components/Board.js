import React from "react";

import { database } from "../firebase";
import { LANE_TYPE } from "../utils/constans";
import Lane from "./Lane";
import functions from "firebase-functions";
import "../index.css";

const Board = ({ title, user }) => {
  const [loading, setLoading] = React.useState(true);
  const [data, setData] = React.useState({});
  const dbRef = database.ref(`/boards/boards/${title}`);
  const dbTasksRef = dbRef.child("tasks");
  const [tasks, setTasks] = React.useState({});

  React.useEffect(() => {
    dbRef.once("value").then((snapshot) => {
      setLoading(false);
      if (snapshot.exists()) {
        //console.log(snapshot.val());
        //setData(snapshot.val());

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

  const addTask = (type, description) => {
    if (description !== "") {
      let now = new Date();
      dbTasksRef.push().set(
        {
          description,
          status: type.status,
          date: now.toTimeString(),
          user: user.uid,
          email: user.email,
        },
        (error) => {
          if (error) {
            alert("Data could not be saved." + error);
          } else {
            alert("Data saved successfully.");
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
        laneTasks[key] = tasks[key];
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
          user={user}
          addTask={addTask}
          removeTask={removeTask}
        />
        <Lane
          dbTasksRef={dbTasksRef}
          type={LANE_TYPE.IN_PROGRESS}
          tasks={filterTasks(LANE_TYPE.IN_PROGRESS.status)}
          user={user}
          addTask={addTask}
          removeTask={removeTask}
        />
        <Lane
          dbTasksRef={dbTasksRef}
          type={LANE_TYPE.QA}
          tasks={filterTasks(LANE_TYPE.QA.status)}
          user={user}
          addTask={addTask}
          removeTask={removeTask}
        />
        <Lane
          dbTasksRef={dbTasksRef}
          type={LANE_TYPE.COMPLETED}
          tasks={filterTasks(LANE_TYPE.COMPLETED.status)}
          user={user}
          addTask={addTask}
          removeTask={removeTask}
        />
      </div>
    </div>
  );
};

export default Board;
