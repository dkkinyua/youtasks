import Modal from "./Modal";
import { useState } from "react";
export const UpdateModal = ({ openupdate, close, tasks }) => {
	const [task, setTask] = useState("");
	const [dueDate, setDueDate] = useState("");
	const [task_done, setTaskDone] = useState(false);
	const [dueTime, setDueTime] = useState("");
	const [priority, setPriority] = useState("");
	console.log(tasks);

	const updateTask = async () => {
		const combinedDateTime = `${dueDate}T${dueTime}`;
		const date = new Date(combinedDateTime);
		const utcDateTime = new Date(
			date.getTime() - date.getTimezoneOffset() * 60000
		);
		const isoString = utcDateTime.toISOString();
		const taskData = {
			task,
			due_date: isoString,
			task_done,
			priority,
		};
		try {
			const response = await api.put(`/tasks/${tasks.id}`, taskData);
			return response.data;
		} catch (error) {
			throw error;
		}
	};

	return (
		<Modal open={openupdate} close={close}>
			<div className="text-white">
				{tasks && (
					<div className="">
						<h1 className="text-4xl text-center my-6">Update Task</h1>

						<form
							action="submit"
							className="text-white"
							onSubmit={(e) => {
								e.preventDefault();
								updateTask();
							}}
						>
							<div className="">
								<label htmlFor="task">Task</label>
								<textarea
									type="text"
									onChange={() => setTask(task)}
									id="task"								
									placeholder={tasks.task}
									className="block border  border-red-700 rounded-md text-black w-full h-24"
								/>
							</div>
							<div className="">
								<label htmlFor="due_date">Due date</label>
								<div className="flex">
									<input
										type="date"
										id="due_date"
										onChange={() => setDueDate(dueDate)}
										className="block border   border-red-700 rounded-md text-black"
									/>
									<input
										type="time"
										id="due_time"
										onChange={() => setDueTime(dueTime)}
										className="block border   border-red-700 rounded-md text-black ml-4"
									/>
								</div>
							</div>
							<div className="">
								<label htmlFor="priority">Priority</label>
								<select
									id="priority"
									className="block border   border-red-700 rounded-md text-black w-full"
									placeholder={tasks.priority}
									onChange={() => setPriority(priority)}
								>
									<option value="high">High</option>
									<option value="medium">Medium</option>
									<option value="low">Low</option>
								</select>
							</div>

							<div className="flex justify-center items-center">
							  <button
								type="submit"
								className="bg-red-700 rounded-md p-2 mt-3 self-center relative"
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
