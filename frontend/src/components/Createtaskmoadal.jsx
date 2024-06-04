import Modal from "./Modal";
import { useState } from "react";
import createApi from "../context/api";
// import TaskProvider from "../context/taskContext";
// eslint-disable-next-line
export const Createtaskmoadal = ({ createtask, close }) => {
  // const { addTask } = TaskProvider();
  const [task, setTask] = useState("");
  const [dueDate, setDueDate] = useState("");
  const [dueTime, setDueTime] = useState("");
  const [priority, setPriority] = useState("");
  const api = createApi();

  const addTask = async () => {
    const combinedDateTime = `${dueDate}T${dueTime}`;
    const date = new Date(combinedDateTime);
    const utcDateTime = new Date(
      date.getTime() - date.getTimezoneOffset() * 60000,
    );

    const isoString = utcDateTime.toISOString();

    const taskData = {
      task,
      due_date: isoString,
      priority,
    };

    try {
      const response = await api.post("/tasks/post", taskData);
      return response.data;
    } catch (error) {
      console.log(error,"error");
      throw new Error("Failed to create task");
    }
  };
  const handlesubmit = async () => {
    try {
      await addTask();
      console.log("Task added successfully");
    } catch (error) {
      console.error("Error submitting the form:", error);
    }
  };

  return (
    <div>
      <Modal open={createtask} close={close}>
        <form
          action="submit"
          className="text-white"
          onSubmit={(e) => {
            e.preventDefault();
            handlesubmit();
          }}
        >
          <h1 className="my-5 text-4xl">Create Task</h1>
          <div className="">
            <label htmlFor="task">Task</label>
            <input
              type="text"
              onChange={(e) => setTask(e.target.value)}
              id="task"
              placeholder="Enter Task"
              className="block rounded-md border border-red-700 text-black"
            />
          </div>
          <div className="">
            <label htmlFor="due_date">Due date</label>
            <div className="flex">
              <input
                type="date"
                id="due_date"
                placeholder="Enter Due date"
                onChange={(e) => setDueDate(e.target.value)}
                className="block rounded-md border border-red-700 text-black"
              />
              <input
                type="time"
                id="due_time"
                placeholder="Enter Due time"
                onChange={(e) => setDueTime(e.target.value)}
                className="ml-4 block rounded-md border border-red-700 text-black"
              />
            </div>
          </div>
          <div className="">
            <label htmlFor="priority">Priority</label>
            <select
              id="priority"
              className="block w-full rounded-md border border-red-700 text-black"
              onChange={(e) => setPriority(e.target.value)}
            >
              <option value="high">High</option>
              <option value="medium">Medium</option>
              <option value="low">Low</option>
            </select>
          </div>
          {/* <div className="">
            <label htmlFor="description">Description</label>
						<textarea id="description" placeholder="Enter Description" className="block border   border-red-700 rounded-md" />
					</div> */}

          <div className="flex items-center justify-center">
            <button
              type="submit"
              className="relative mt-3 self-center rounded-md bg-red-700 p-2"
            >
              Submit
            </button>
          </div>
        </form>
      </Modal>
    </div>
  );
};
