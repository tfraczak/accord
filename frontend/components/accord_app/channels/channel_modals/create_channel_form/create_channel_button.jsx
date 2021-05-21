import React from 'react';


export default (props) => {
	const onClick = () => {
		document.getElementById("add-channel-btn").classList.add("modal-open");
		props.openModal('create channel');
	}

	if (props.isOwner) {
		return (
			<button id="add-channel-btn" onClick={onClick}>
				<i className="fas fa-plus"></i>
			</button>
		)
	} else {
		return (
			null
		)
	}

	
};