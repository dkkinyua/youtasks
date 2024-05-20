const Cards = () => {
	const duedate = new Date();
	const dueDate = duedate.toDateString();

  
	return (
		<div className="text-white  border border-red-700 rounded lg:w-2/12 md:w-2/6 w-6/12">
			<div className="info flex justify-between ">
				<h2>{dueDate}</h2>
				<input
					type="checkbox"
					name="done"
					id="done"
					className="w-4 h-4 self-center relative"
				/>
			</div>
			<div className="line border border-red-700"></div>
			<p className="text-sm">
				Lorem, ipsum dolor sit amet consectetur adipisicing elit. Recusandae
				porro eius temporibus! Soluta suscipit sequi illum, quidem atque tempore
			</p>
		</div>
	);
};

export default Cards;
