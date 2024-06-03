import { useState, useEffect } from "react";
// import TaskProvider from "../context/taskContext";
// import useTask from "../context/usetasks";
import createApi from "../context/api";
import { UpdateModal } from "./UpdateModal";
const Cards = () => {
  const duedate = new Date();
  const dueDate = duedate.toDateString();
  const api = createApi();
  const [openupdate, setOpenupdate] = useState(false);
  const [opentask, setOpentask] = useState([]);

  const getTasks = async () => {
    try {
      const res = await api.get("/tasks/get-tasks");
      return res.data;
    } catch (error) {
      console.error("Error fetching tasks:", error);
      throw error;
    }
  };

  const deleteTask = async (taskId) => {
    try {
      await api.delete(`/tasks/${taskId}`);
    } catch (error) {
      console.error("Failed to delete task:", error);
      throw error;
    }
  };

  useEffect(() => {
    getTasks();
  }, []);
  console.log(getTasks());

  const [hidden, sethidden] = useState(true);

  const [tasks, setTasks] = useState([
    {
      id: 1,
      title: "task",
      task: "lorem ipswem dvqdv qervqefvqerv qervqervqrvqr qwvqvfv qwqwv",
      duedate: dueDate,
      done: false,
    },
    {
      id: 2,
      title: "tas",
      task: "lorem ipswem dvqdv qervqefvqerv qervqervqrvqr qwvqvfv ",
      duedate: dueDate,
      done: false,
    },
    {
      id: 2,
      title: "tas",
      task: "lorem ipswem dvqdv qervqefvqerv qervqervqrvqr qwvqvfv ",
      duedate: dueDate,
      done: false,
    },
    {
      id: 2,
      title: "tas",
      task: "lorem ipswem dvqdv qervqefvqerv qervqervqrvqr qwvqvfv ",
      duedate: dueDate,
      done: false,
    },
    {
      id: 2,
      title: "tas",
      task: "lorem ipswem dvqdv qervqefvqerv qervqervqrvqr qwvqvfv ",
      duedate: dueDate,
      done: false,
    },
    {
      id: 2,
      title: "tas",
      task: "lorem ipswem dvqdv qervqefvqerv qervqervqrvqr qwvqvfv ",
      duedate: dueDate,
      done: false,
    },
    {
      id: 2,
      title: "tas",
      task: "lorem ipswem dvqdv qervqefvqerv qervqervqrvqr qwvqvfv ",
      duedate: dueDate,
      done: false,
    },
    {
      id: 2,
      title: "tas",
      task: "lorem ipswem dvqdv qervqefvqerv qervqervqrvqr qwvqvfv ",
      duedate: dueDate,
      done: false,
    },
    {
      id: 2,
      title: "tas",
      task: "lorem ipswem dvqdv qervqefvqerv qervqervqrvqr qwvqvfv ",
      duedate: dueDate,
      done: false,
    },
    {
      id: 2,
      title: "tas",
      task: "lorem ipswem dvqdv qervqefvqerv qervqervqrvqr qwvqvfv ",
      duedate: dueDate,
      done: false,
    },
  ]);

  // send data to backend
  const handleCheckboxChange = async (taskId) => {
    try {
      const updatedTask = tasks.find((task) => task.id === taskId);
      await api.put(`/tasks/${taskId}`, {
        ...updatedTask,
        done: !updatedTask.done,
      });
      setTasks((prevTasks) =>
        prevTasks.map((task) =>
          task.id === taskId ? { ...task, done: !task.done } : task,
        ),
      );
    } catch (error) {
      console.error("Error updating task:", error);
      throw error;
    }
  };
  // eslint-disable-next-line
  const TaskCard = ({ task, handleCheckboxChange, hiddens }) => (
    <div
      // eslint-disable-next-line
      key={task.id}
      className={
        `m-2 w-full rounded border border-red-700 p-4 text-white md:w-2/6 lg:w-2/12 ` +
        (hiddens ? "hidden" : "")
      }
    >
      <div className="info flex justify-between">
        <h2>
          {/*eslint-disable-next-line */}
          {task.duedate}
        </h2>
        <input
          type="checkbox"
          name="done"
          // eslint-disable-next-line
          id={`done-${task.id}`}
          className="relative z-0 h-4 w-4 self-center"
          // eslint-disable-next-line
          checked={task.done}
          // eslint-disable-next-line
          onChange={() => handleCheckboxChange(task.id)}
        />
      </div>
      <div className="line my-2 border border-red-700"></div>
      {/* // eslint-disable-next-line */}
      <p className="text-sm">
        {/* eslint-disable-next-line  */}
        {task.task}
      </p>
      <div className="buttons flex w-8 justify-between">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 512 512"
          className="mr-2 mt-2 h-4 w-4 cursor-pointer fill-red-700"
          onClick={(e) => {
            console.log(task.id);
            setOpenupdate(true);
            setOpentask(task);
            e.preventDefault();
          }}
        >
          <path d="M471.6 21.7c-21.9-21.9-57.3-21.9-79.2 0L362.3 51.7l97.9 97.9 30.1-30.1c21.9-21.9 21.9-57.3 0-79.2L471.6 21.7zm-299.2 220c-6.1 6.1-10.8 13.6-13.5 21.9l-29.6 88.8c-2.9 8.6-.6 18.1 5.8 24.6s15.9 8.7 24.6 5.8l88.8-29.6c8.2-2.7 15.7-7.4 21.9-13.5L437.7 172.3 339.7 74.3 172.4 241.7zM96 64C43 64 0 107 0 160V416c0 53 43 96 96 96H352c53 0 96-43 96-96V320c0-17.7-14.3-32-32-32s-32 14.3-32 32v96c0 17.7-14.3 32-32 32H96c-17.7 0-32-14.3-32-32V160c0-17.7 14.3-32 32-32h96c17.7 0 32-14.3 32-32s-14.3-32-32-32H96z" />
        </svg>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 448 512"
          className="mt-2 h-4 w-4 cursor-pointer fill-red-700"
          onClick={(e) => {
            e.preventDefault();
            deleteTask(task.id);
          }}
        >
          <path d="M135.2 17.7L128 32H32C14.3 32 0 46.3 0 64S14.3 96 32 96H416c17.7 0 32-14.3 32-32s-14.3-32-32-32H320l-7.2-14.3C307.4 6.8 296.3 0 284.2 0H163.8c-12.1 0-23.2 6.8-28.6 17.7zM416 128H32L53.2 467c1.6 25.3 22.6 45 47.9 45H346.9c25.3 0 46.3-19.7 47.9-45L416 128z" />
        </svg>
      </div>
    </div>
  );

  const dueTasks = tasks.filter((task) => !task.done);
  const doneTasks = tasks.filter((task) => task.done);

  return (
    <>
      <div className="w-full">
        <h2 className="text-xl text-white">Due tasks</h2>

        <div className={`${!openupdate ? "hidden" : ""} `}>
          <UpdateModal
            openupdate={openupdate}
            close={() => setOpenupdate(false)}
            tasks={opentask}
          />
        </div>
        <div className="flex flex-wrap">
          {dueTasks.map((task) => (
            <TaskCard
              key={task.id}
              task={task}
              handleCheckboxChange={handleCheckboxChange}
            />
          ))}
        </div>
      </div>

      <div
        className={`w-full border border-4 border-x-0 border-b-0 border-red-700`}
      >
        <div
          className="flex w-full cursor-pointer"
          onClick={() => sethidden(!hidden)}
        >
          <h2 className="text-xl text-white">Done tasks</h2>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 448 512"
            className={`relative ml-auto h-6 w-6 cursor-pointer self-end justify-self-end fill-white ${!hidden ? "" : "hidden"}`}
          >
            <path d="M256 80c0-17.7-14.3-32-32-32s-32 14.3-32 32V224H48c-17.7 0-32 14.3-32 32s14.3 32 32 32H192V432c0 17.7 14.3 32 32 32s32-14.3 32-32V288H400c17.7 0 32-14.3 32-32s-14.3-32-32-32H256V80z" />
          </svg>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 448 512"
            className={`relative ml-auto h-6 w-6 cursor-pointer self-end justify-self-end fill-white ${hidden ? "" : "hidden"}`}
          >
            <path d="M432 256c0 17.7-14.3 32-32 32L48 288c-17.7 0-32-14.3-32-32s14.3-32 32-32l352 0c17.7 0 32 14.3 32 32z" />
          </svg>
        </div>
        <div className="flex">
          {doneTasks.map((task) => (
            <TaskCard
              key={task.id}
              task={task}
              handleCheckboxChange={handleCheckboxChange}
              // this makes only the done tasks to be hidden when the button is clicked
              hiddens={hidden}
            />
          ))}
        </div>
      </div>
    </>
  );
};

export default Cards;
