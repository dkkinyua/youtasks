import Modal from "./Modal";
import { useState } from "react";
import createApi from "../context/api";
// eslint-disable-next-line
export const UpdateModal = ({ openupdate, close, tasks }) => {
  const [task, setTask] = useState("");
  const [dueDate, setDueDate] = useState("");
  const [dueTime, setDueTime] = useState("");
  const [priority, setPriority] = useState("");
  const api = createApi();

  const updateTask = async () => {
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
    // eslint-disable-next-line
    const response = await api.put(`/tasks/${tasks.id}`, taskData);
    return response.data;
  };
  const handleUpdate = async () => {
    try {
      await updateTask();
      console.log("Task added successfully");
    } catch (error) {
      console.error("Error submitting the form:", error);
    }
  };

  return (
    <Modal open={openupdate} close={close}>
      <div className="text-white">
        {tasks && (
          <div className="">
            <h1 className="my-6 text-center text-4xl">Update Task</h1>

            <form
              action="submit"
              className="text-white"
              onSubmit={(e) => {
                e.preventDefault();
                handleUpdate();
              }}
            >
              <div className="">
                <label htmlFor="task">Task</label>
                <textarea
                  type="text"
                  onChange={() => setTask(task)}
                  id="task"
                  // eslint-disable-next-line
                  placeholder={tasks.task}
                  className="block h-24 w-full rounded-md border border-red-700 text-black"
                />
              </div>
              <div className="">
                <label htmlFor="due_date">Due date</label>
                <div className="flex">
                  <input
                    type="date"
                    id="due_date"
                    onChange={() => setDueDate(dueDate)}
                    className="block rounded-md border border-red-700 text-black"
                  />
                  <input
                    type="time"
                    id="due_time"
                    onChange={() => setDueTime(dueTime)}
                    className="ml-4 block rounded-md border border-red-700 text-black"
                  />
                </div>
              </div>
              <div className="">
                <label htmlFor="priority">Priority</label>
                <select
                  id="priority"
                  className="block w-full rounded-md border border-red-700 text-black"
                  // eslint-disable-next-line
                  placeholder={tasks.priority}
                  onChange={() => setPriority(priority)}
                >
                  <option value="high">High</option>
                  <option value="medium">Medium</option>
                  <option value="low">Low</option>
                </select>
              </div>

              <div className="flex items-center justify-center">
                <button
                  type="submit"
                  className="relative mt-3 self-center rounded-md bg-red-700 p-2"
                >
                  Submit
                </button>
              </div>
            </form>
          </div>
        )}
      </div>
    </Modal>
  );
};
