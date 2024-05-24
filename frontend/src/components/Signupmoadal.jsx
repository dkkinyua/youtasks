import Modal from "./Modal";

// eslint-disable-next-line
export const Signupmoadal = ({ signupopen, close }) => {
	
	return (
		<div>
			<Modal open={signupopen} close={close}>
				<h1 className="text-4xl text-white">Sign up</h1>
				<form action="" className="mt-8 text-white">
					<div className=" ">
						<label htmlFor="email">Email</label>
						<input
							type="email"
							name="email"
							id="email"
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
							className="border  border-red-700 rounded-md bg-transparent block"
						/>
					</div>
					<button
						type="submit"
						className="mt-4 justify-self-center bg-white text-black p-2 rounded-md"
					>
						Sign up
					</button>
				</form>
			</Modal>
		</div>
	);
};
