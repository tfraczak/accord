import React from 'react';


export default (props) => {
	const onClick = e => {
		e.stopPropagation();
		e.preventDefault();
		document.getElementById("edit-channel-btn").classList.add("modal-open");
		props.openFullModal();
	};

	if (props.isOwner) {
		return (
			<button id="edit-channel-btn" onClick={onClick}>
				<i className="fas fa-cog"></i>
			</button>
		);
	} else {
		return (
			null
		);
	}

	
};