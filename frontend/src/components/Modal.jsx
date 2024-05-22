// eslint-disable-next-line
const Modal = ({ open, close, children }) => {
	return (
		<div className="">
			{/* backdrop */}
			<div
				onClick={close}
				className={`
                fixed inset-0 flex justify-center items-center transition-colors
                ${open ? "visible bg-black/50" : "invisible"}
            `}
			>
				{/* modal */}
				<div
					className={`
                    bg-white/5 rounded-xl shadow p-6 transition-all
                    ${open ? "scale-100 opacity-100" : "scale-125 opacity-0"}
                    `}
					onClick={(e) => {
						e.stopPropagation();
					}}
				>
					<button
						onClick={close}
						className="absolute top-2 right-2 border h-7 w-7 border-red-700 bg-white rounded-lg text-center hover:bg-red-700 hover:text-white"
					>
						X
					</button>{" "}
					{children}
				</div>
			</div>
		</div>
	);
};

export default Modal;
