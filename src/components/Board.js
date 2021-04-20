import React from "react";
import axios from "axios";
import { database } from "../firebase";
import { LANE_TYPE } from "../utils/constans";
import Lane from "./Lane";
import "../index.css";
import { getNowServerFormat } from "../utils/utils";

const Board = ({ board, user }) => {
  const [loading, setLoading] = React.useState(true);
  const [tasks, setTasks] = React.useState([]);
  const [error, setError] = React.useState("");

  const getTasks = () => {
    setLoading(true);
    if (board) {
      return axios
        .get(
          `https://us-central1-kanban-board-875ad.cloudfunctions.net/getTasks?board=${board}`
        )
        .then((response) => {
          if (response.data.tasks){
            console.log(`getTasks: for board: ${board} success. num_tasks: ${response.data.num_tasks}`);
            setTasks(response.data.tasks);
          }
          
        })
        .catch(function (error) {
          setError(error);
        })
        .finally(() => setLoading(false));
    } else {
      setLoading(false);
      setError("Cannot get board tasks: missing board name.");
    }
  };

  React.useEffect(() => {
    getTasks();
  }, []);

  const removeTask = (id) => {
    setLoading(true);
    return axios
      .delete(
        `https://us-central1-kanban-board-875ad.cloudfunctions.net/deleteTask?id=${id}&board=${board}`
      )
      .then((response) => {
        if (response.data.tasks){
          console.log(`removeTask: for board: ${board} success for task id ${id} num_tasks: ${response.data.num_tasks}`);
          setTasks(response.data.tasks);
        }
      })
      .catch(function (error) {
        console.log(error);
      })
      .finally(() => setLoading(false));
  };

  const updateTask = (item) => {
    item['date'] = getNowServerFormat();
    setLoading(true);
    axios
      .post(
        "https://us-central1-kanban-board-875ad.cloudfunctions.net/updateTask",
        { item, board }
      )
      .then((response) => {
        if (response.data.tasks){
          console.log(`updateTask: for board: ${board} success for task id ${item.id}. num_tasks: ${response.data.num_tasks}`);
          setTasks(response.data.tasks);
        }
      })
      .catch(function (error) {
        console.log(error);
      })
      .finally(() => setLoading(false));
  };

  const addTask = (type, description) => {
    let item = {
      description,
      status: type.status,
      date: getNowServerFormat(),
      user: user.uid,
      email: user.email,
    };
    setLoading(true);

    axios
      .post(
        "https://us-central1-kanban-board-875ad.cloudfunctions.net/addTask",
        { item, board }
      )
      .then((response) => {
        if (response.data.tasks){
          console.log(`addTask: for board: ${board} success. num_tasks: ${response.data.num_tasks}`);
          setTasks(response.data.tasks);
        }
      })
      .catch(function (error) {
        console.log(error);
      })
      .finally(() => setLoading(false));
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
        addTask={addTask}
        removeTask={removeTask}
        updateTask={updateTask}
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
