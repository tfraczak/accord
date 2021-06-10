import React from 'react';


export default (props) => {
	const onClick = () => {
		const servers = document.getElementsByClassName("server-item");
        const profile = document.getElementById("profile");
        profile.classList.remove("active");
        for (let server of servers) { server.classList.remove("active") }
		document.getElementById("asf-button").classList.add("active");
		props.openModal('create server');
	}

	return (
		<li key="add-server-button">
				<button id="asf-button" className="add-server-button" onClick={onClick}>
					<i className="fas fa-plus"></i>
				</button>
		</li>
	)
};