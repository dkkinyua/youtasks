import Modal from "./Modal";
// eslint-disable-next-line
const Loginmodal = ({ loginopen, close }) => {
	return (
		<div>
			<Modal open={loginopen} close={close}>
				<div className="text-white">
                    <h1 className="text-4xl">Log in</h1>
					<form action="submit" className="mt-8 text-white">
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
						Log in
						</button>
					</form>
				</div>
			</Modal>
		</div>
	);
};

export default Loginmodal;