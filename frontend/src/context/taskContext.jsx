import  { createContext } from "react";
import createApi from "./api";
import PropTypes from "prop-types";
// import TaskContext from "./usetasks";

export const TaskContext = createContext();

export const TaskProvider = ({ children }) => {
  const api = createApi();

  const getTasks = async () => {
    try {
      const res = await api.get("/tasks");
      return res.data;
    } catch (error) {
      console.error("Error fetching tasks:", error);
      throw error;
    }
  };

  const addTask = async (task) => {
    try {
      const res = await api.post("/tasks", task);
      return res.data;
    } catch (error) {
      console.error("Error adding task:", error);
      throw error;
    }
  };

  const updateTask = async (task) => {
    try {
      const res = await api.put(`/tasks/${task.id}`, task);
      return res.data;
    } catch (error) {
      console.error("Error updating task:", error);
      throw error;
    }
  };

  const value = {
    getTasks,
    addTask,
    updateTask,
  };

  return <TaskContext.Provider value={value}>{children}</TaskContext.Provider>;
};

TaskProvider.propTypes = {
  children: PropTypes.node.isRequired,
};

export default TaskProvider;
