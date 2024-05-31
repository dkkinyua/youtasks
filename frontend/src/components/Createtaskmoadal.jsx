import Modal from "./Modal";
import { useState } from "react";
import api from "../context/api";
// import TaskProvider from "../context/taskContext";
// eslint-disable-next-line
export const Createtaskmoadal = ({ createtask, close }) => {
	// const { addTask } = TaskProvider();
	const [task, setTask] = useState("");
	const [dueDate, setDueDate] = useState("");
	const [dueTime, setDueTime] = useState("");
	const [priority, setPriority] = useState("");

	const addTask = async () => {
		try {
			const res = await api.post("/tasks", {
				task,
				dueDate,
				dueTime,
				priority,
			});
			console.log(res.data);
			return res.data;
		} catch (error) {
			console.error("Error adding task:", error);
			throw error;
		}
	};
	const handlesubmit = () => {
		addTask();
		console.log(task);
	};

	return (
		<div>
			<Modal open={createtask} close={close}>
				<form
					action="submit"
					className="text-white"
					onSubmit={(e) => {
						e.preventDefault();
						handlesubmit;
					}}
				>
					<h1 className="">Create Task</h1>
					<div className="">
						<label htmlFor="task">Task</label>
						<input
							type="text"
							onChange={() => setTask(task)}
							id="task"
							placeholder="Enter Task"
							className="block border   border-red-700 rounded-md text-black"
						/>
					</div>
					<div className="">
						<label htmlFor="due_date">Due date</label>
						<div className="flex">
							<input
								type="date"
								id="due_date"
								placeholder="Enter Due date"
								onChange={() => setDueDate(dueDate)}
								className="block border   border-red-700 rounded-md text-black"
							/>
							<input
								type="time"
								id="due_time"
								placeholder="Enter Due time"
								onChange={() => setDueTime(dueTime)}
								className="block border   border-red-700 rounded-md text-black ml-4"
							/>
						</div>
					</div>
					<div className="">
						<label htmlFor="priority">Priority</label>
						<select
							id="priority"
							className="block border   border-red-700 rounded-md text-black"
							onChange={() => setPriority(priority)}
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
					<div className="justify-self-center">
						<button
							type="submit"
							className="bg-red-700 rounded-md p-2 mt-3 justify-self-center"
						>
							Submit
						</button>
					</div>
				</form>
			</Modal>
		</div>
	);
};
