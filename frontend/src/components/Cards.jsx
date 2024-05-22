import { useState } from "react";

const Cards = () => {
	const duedate = new Date();
	const dueDate = duedate.toDateString();

	const[hidden, sethidden]= useState(true);

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

	const handleCheckboxChange = (taskId) => {
		setTasks((prevTasks) =>
			prevTasks.map((task) =>
				task.id === taskId ? { ...task, done: !task.done } : task
			)
		);
	};
	// eslint-disable-next-line
	const TaskCard = ({ task, handleCheckboxChange, hiddens }) => (
		<div
			// eslint-disable-next-line
			key={task.id}
		className={`text-white border border-red-700 rounded lg:w-2/12 md:w-2/6 w-full m-2 p-4 ` + (hiddens ? "hidden" : "")}
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
					className="w-4 h-4 self-center relative z-0"
					// eslint-disable-next-line
					checked={task.done}
					// eslint-disable-next-line
					onChange={() => handleCheckboxChange(task.id)}
				/>
			</div>
			<div className="line border border-red-700 my-2"></div>
			{/* // eslint-disable-next-line */}
			<p className="text-sm">
				{/* eslint-disable-next-line  */}
				{task.description}
			</p>
		</div>
	);

	const dueTasks = tasks.filter((task) => !task.done);
	const doneTasks = tasks.filter((task) => task.done);

	return (
		<>
			<div className="w-full">
				<h2 className="text-white text-xl">Due tasks</h2>
				{dueTasks.map((task) => (
					<TaskCard
						key={task.id}
						task={task}
						handleCheckboxChange={handleCheckboxChange}
					/>
				))}
			</div>

			<div className={`w-full`}>
				<div className="bg-slate-900 w-full flex">
					<svg
						xmlns="http://www.w3.org/2000/svg"
						viewBox="0 0 512 512"
						className="w-6 h-6 mx-5 cursor-pointer"
						onClick={() => sethidden(!hidden)}
					>
						<path
							d="M233.4 406.6c12.5 12.5 32.8 12.5 45.3 0l192-192c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0L256 338.7 86.6 169.4c-12.5-12.5-32.8-12.5-45.3 0s-12.5 32.8 0 45.3l192 192z"
							className="fill-white"
						/>
					</svg>

					<h2 className="text-white text-xl  ">Tasks done</h2>
				</div>
				{doneTasks.map((task) => (
					<TaskCard
						key={task.id}
						task={task}
						handleCheckboxChange={handleCheckboxChange}
						hiddens={hidden}
					/>
				))}
			</div>
		</>
	);
};

export default Cards;
