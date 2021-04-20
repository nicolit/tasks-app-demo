import axios from "axios";
import { getNowServerFormat } from "./utils";

export const getTasks = (setError, setLoading, setTasks, params) => {
  const { board } = params;
  setLoading(true);
  return axios
    .get(
      `https://us-central1-kanban-board-875ad.cloudfunctions.net/getTasks?board=${board}`
    )
    .then((response) => {
      if (response.data.tasks) {
        console.log(
          `getTasks: for board: ${board} success. num_tasks: ${response.data.num_tasks}`
        );
        setTasks(response.data.tasks);
      }
    })
    .catch(function (error) {
      setError(error);
    })
    .finally(() => setLoading(false));
};

export const removeTask = (setError, setLoading, setTasks, params) => {
  const { id, board } = params;
  setLoading(true);
  return axios
    .delete(
      `https://us-central1-kanban-board-875ad.cloudfunctions.net/deleteTask?id=${id}&board=${board}`
    )
    .then((response) => {
      if (response.data.tasks) {
        console.log(
          `removeTask: for board: ${board} success for task id ${id} num_tasks: ${response.data.num_tasks}`
        );
        setTasks(response.data.tasks);
      }
    })
    .catch(function (error) {
      setError(error);
    })
    .finally(() => setLoading(false));
};

export const addTask = (setError, setLoading, setTasks, params) => {
  const { status, description, user, board } = params;
  let item = {
    description,
    status,
    date: getNowServerFormat(),
    user: user.uid,
    email: user.email,
  };
  setLoading(true);

  axios
    .post("https://us-central1-kanban-board-875ad.cloudfunctions.net/addTask", {
      item,
      board,
    })
    .then((response) => {
      if (response.data.tasks) {
        console.log(
          `addTask: for board: ${board} success. num_tasks: ${response.data.num_tasks}`
        );
        setTasks(response.data.tasks);
      }
    })
    .catch(function (error) {
      setError(error);
    })
    .finally(() => setLoading(false));
};

export const updateTask = (setError, setLoading, setTasks, params) => {
  let { item, board } = params;
  item["date"] = getNowServerFormat();
  setLoading(true);
  axios
    .post(
      "https://us-central1-kanban-board-875ad.cloudfunctions.net/updateTask",
      { item, board }
    )
    .then((response) => {
      if (response.data.tasks) {
        console.log(
          `updateTask: for board: ${board} success for task id ${item.id}. num_tasks: ${response.data.num_tasks}`
        );
        setTasks(response.data.tasks);
      }
    })
    .catch(function (error) {
      setError(error);
    })
    .finally(() => setLoading(false));
};
