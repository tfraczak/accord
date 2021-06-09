import React from 'react';


export default (props) => {
	const onClick = e => {
		e.stopPropagation();
		e.preventDefault();
		props.openFullModal();
	};

	return (
		<button id="server-settings-btn" onClick={onClick}>
			<h6>Server Settings</h6>
			<i className="fas fa-cog"></i>
		</button>
	);
};