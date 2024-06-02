import { useState } from "react";
import Modal from "./Modal";
import useAuth from "../context/useAuth";

// eslint-disable-next-line
export const Signupmoadal = ({ signupopen, close }) => {
	const { handleCreateUser } = useAuth();
	const [email, setEmail] = useState("");
	const [username, setUsername] = useState("");
	const [password, setPassword] = useState("");

	function onSignup() {
		handleCreateUser(email, username, password);
		console.log("signup");
	}

	return (
		<div>
			<Modal open={signupopen} close={close}>
				<h1 className="text-4xl text-white">Sign up</h1>
				<form
					onSubmit={(e) => {
						e.preventDefault();
						onSignup();
					}}
					className="mt-8 text-white"
				>
					<div className=" ">
						<label htmlFor="email">Email</label>
						<input
							type="email"
							name="email"
							id="email"
							onChange={(e) => setEmail(e.target.value)}
							required
							className="border border-red-700 rounded-md bg-transparent block"
						/>
					</div>
					<div className=" ">
						<label htmlFor="username">Username</label>
						<input
							type="text"
							name="username"
							id="username"
							required
							onChange={(e) => {setUsername(e.target.value)}}
							className="border   border-red-700 rounded-md bg-transparent block"
						/>
					</div>
					<div className=" ">
						<label htmlFor="password">Password</label>
						<input
							type="password"
							name="password"
							id="input_password"
							required
							onChange={(e) => setPassword(e.target.value)}
							className="border  border-red-700 rounded-md bg-transparent block"
						/>
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
			</Modal>
		</div>
	);
};
