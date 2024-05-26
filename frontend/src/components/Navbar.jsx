// remember to shorten the code by making simmillar parts to a variable
import { useState } from "react";
import Loginmodal from "./loginmodal";
import { Createtaskmoadal } from "./Createtaskmoadal";
import { Signupmoadal } from "./Signupmoadal";
const Navbar = () => {
	const [toggleDropdown, setToggleDropdown] = useState(false);
	const [loggedin, setLoggedin] = useState(false);
	const [loginopen, setloginopen] = useState(false);
	const [signupopen, setsignupopen] = useState(false);
	const [createtask, setCreatetask] = useState(false);
	return (
		<>
			<div className="text-white flex justify-around items-center p-6">
				<a href="/" className="flex items-center">
					<h1 className="text-3xl">
						Youtasks <span className="text-red-700">.</span>
					</h1>
				</a>

				{/* Desktop Navbar */}
				{loggedin ? (
					// if the user is logged in show the following
					<div className="hidden sm:flex space-x-4 ">
						<div
							className="w-42 p-2 border-red-700 border rounded text-center hover:bg-red-700 hover:text-white cursor-pointer"
							onClick={() => {
								setCreatetask(true);
							}}
						>
							Create Task
						</div>

						<div
							className="w-24 p-2 bg-red-700 border rounded border-white text-center  hover:bg-white hover:text-red-700 hover:border-red-700 cursor-pointer"
							onClick={() => {
								setsignupopen(true);
							}}
						>
							Log out
						</div>
					</div>
				) : (
					<div className="hidden sm:flex space-x-4 ">
						<div
							className="w-42 p-2 border-red-700 border rounded text-center hover:bg-red-700 hover:text-white cursor-pointer"
							onClick={() => {
								setCreatetask(true);
							}}
						>
							Create Task
						</div>
						<div
							className="w-20 p-2 border-red-700 border rounded text-center hover:bg-red-700 hover:text-white cursor-pointer"
							// onlick for oppening up the login modal
							onClick={() => {
								setloginopen(true);
							}}
						>
							Log in
						</div>
						<div
							className="w-24 p-2 bg-red-700 border rounded border-white text-center  hover:bg-white hover:text-red-700 hover:border-red-700 cursor-pointer"
							onClick={() => {
								setsignupopen(true);
							}}
						>
							Sign up
						</div>
					</div>
				)}

				{/* Mobile Navbar */}
				<div className="sm:hidden">
					<svg
						onClick={() => setToggleDropdown(!toggleDropdown)}
						xmlns="http://www.w3.org/2000/svg"
						className="h-6 w-6 fill-red-700 cursor-pointer"
						viewBox="0 0 448 512"
						aria-label="Menu"
					>
						<path d="M0 96C0 78.3 14.3 64 32 64H416c17.7 0 32 14.3 32 32s-14.3 32-32 32H32C14.3 128 0 113.7 0 96zM0 256c0-17.7 14.3-32 32-32H416c17.7 0 32 14.3 32 32s-14.3 32-32 32H32c-17.7 0-32-14.3-32-32zM448 416c0 17.7-14.3 32-32 32H32c-17.7 0-32-14.3-32-32s14.3-32 32-32H416c17.7 0 32 14.3 32 32z" />
					</svg>
					{toggleDropdown &&
						(loggedin ? (
							<div className="absolute bg-white rounded-md mt-2 right-6 z-10">
								<div
									className="w-24 border-red-700 border hover:bg-red-700 hover:text-white rounded text-center text-black m-2 cursor-pointer"
									onClick={() => {
										setCreatetask(true);
									}}
								>
									Create Task
								</div>

								<div
									className="w-16 bg-red-700 border rounded hover:bg-white hover:text-red-700 hover:border-red-700 text-center text-white m-2 cursor-pointer"
									onClick={() => {
										setsignupopen(true);
									}}
								>
									Log out
								</div>
							</div>
						) : (
							<div className="absolute bg-white rounded-md mt-2 right-6 z-10">
								<div
									className="w-24 border-red-700 border hover:bg-red-700 hover:text-white rounded text-center text-black m-2 cursor-pointer"
									onClick={() => {
										setCreatetask(true);
									}}
								>
									Create Task
								</div>
								<div
									className="w-16 border-red-700 border hover:bg-red-700 hover:text-white rounded text-center text-black m-2 cursor-pointer"
									onClick={() => {
										setloginopen(true);
									}}
								>
									Log in
								</div>
								<div
									className="w-16 bg-red-700 border rounded hover:bg-white hover:text-red-700 hover:border-red-700 text-center text-white m-2 cursor-pointer"
									onClick={() => {
										setsignupopen(true);
									}}
								>
									Sign up
								</div>
							</div>
						))}
				</div>
			</div>

			{/* moadal for Logging in */}
			<div className={loginopen ? "" : "hidden w-0"}>
				<Loginmodal
					loginopen={loginopen}
					close={() => {
						setloginopen(false);
					}}
				/>
			</div>

			{/* moadal for signing out */}
			<div className={signupopen ? "" : "hidden w-0"}>
				<Signupmoadal
					signupopen={signupopen}
					close={() => {
						setsignupopen(false);
					}}
				/>
			</div>

			{/* moadal for Logging in */}
			<div className={createtask ? "" : "hidden w-0"}>
				<Createtaskmoadal
					createtask={createtask}
					close={() => {
						setCreatetask(false);
					}}
				/>
			</div>
		</>
	);
};

export default Navbar;
