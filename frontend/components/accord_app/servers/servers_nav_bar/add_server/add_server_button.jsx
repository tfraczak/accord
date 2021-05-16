import React from 'react';


export default ({ openModal }) => {
	
	const onClick = () => {
		document.getElementById("asf-button").classList.add("active");
		openModal('create server');
	}

	return (
		<li key="add-server-button">
				<button id="asf-button" className="add-server-button" onClick={onClick}>
					<i className="fas fa-plus"></i>
				</button>
		</li>
	)
};