import Modal from "./Modal";
import useAuth from "../context/useAuth";
import { useState } from "react";
// eslint-disable-next-line
const Loginmodal = ({ loginopen, close }) => {
	const { handleSignIn } = useAuth();
	const [username, setUsername] = useState("");
	const [password, setPassword] = useState("");

	function onlogin() {
		handleSignIn(username, password);
		
	}
	return (
		<div>
			<Modal open={loginopen} close={close}>
				<div className="text-white">
					<h1 className="text-4xl">Log in</h1>
					<form
						action="submit"
						onSubmit={(e) => {
							e.preventDefault();
							onlogin();
						}}
						className="mt-8 text-white"
					>
						<div className=" ">
							<label htmlFor="username">Username</label>
							<input
								type="text"
								name="username"
								id="username"
								required
								onChange={(e) => setUsername(e.target.value)}
								className="border   border-red-700 rounded-md bg-transparent block"
							/>
						</div>
						<div className=" ">
							<label htmlFor="password">Password</label>
							<input
								type="password"
								name="password"
								id="password"
								required
								onChange={(e) => setPassword(e.target.value)}
								className="border  border-red-700 rounded-md bg-transparent block"
							/>
						</div>
						<button
							type="submit"
							className="mt-4 justify-self-center bg-white text-black p-2 rounded-md"
						>
							Log in
						</button>
					</form>
				</div>
			</Modal>
		</div>
	);
};

export default Loginmodal;
