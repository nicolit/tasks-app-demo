
function TasksReducer(state, action) {
    switch (action.type) {
      case "ON_DROP":
        const droppedTask = action.payload;
        const updatedTasks = state.map((task) => {
          if (task.id === droppedTask.id) {
            return droppedTask;
          }
          return task;
        });
        return updatedTasks;
      case "LOAD_DATA":
        return action.payload;
      case "ADD_NEW":
        return [...state, action.payload];
      case "ON_DELETE":
        return state.filter((task) => task.id !== action.payload);
      default:
        return state;
    }
  }

  export default TasksReducer;