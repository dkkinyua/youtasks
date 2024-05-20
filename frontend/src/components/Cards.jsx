import { useState } from "react";

const Cards = () => {
	// to be removed
	const duedate = new Date();
	const dueDate = duedate.toDateString();

	// Initialize state with tasks
  // remember to change the state to tasks api
  
	const [tasks, setTasks] = useState([
		{
			id: 1,
			title: "task",
			description:
				"lorem ipswem dvqdv qervqefvqerv qervqervqrvqr qwvqvfv qwqwv",
			duedate: dueDate,
			done: false,
		},
		{
			id: 2,
			title: "tas",
			description: "lorem ipswem dvqdv qervqefvqerv qervqervqrvqr qwvqvfv ",
			duedate: dueDate,
			done: false,
		},
	]);
	console.log(tasks);

	// Handle checkbox change
	const handleCheckboxChange = (taskId) => {
		setTasks((prevTasks) =>
			prevTasks.map((task) =>
				task.id === taskId ? { ...task, done: !task.done } : task
			)
		);
	};

	return (
		<>
			<h1 className="text-white">qq</h1>
			{tasks.map((task) => (
				<div
					key={task.id}
					className="text-white border border-red-700 rounded lg:w-2/12 md:w-2/6 w-6/12 m-2 p-4"
				>
					<div className="info flex justify-between">
						<h2>{task.duedate}</h2>
						<input
							type="checkbox"
							name="done"
							id={`done-${task.id}`}
							className="w-4 h-4 self-center relative"
							onChange={() => handleCheckboxChange(task.id)}
						/>
					</div>
					<div className="line border border-red-700 my-2"></div>
					<p className="text-sm">{task.description}</p>
				</div>
			))}
		</>
	);
};

export default Cards;
