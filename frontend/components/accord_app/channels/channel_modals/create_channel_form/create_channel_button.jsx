import React from 'react';


export default (props) => {
	const onClick = () => {
		if (props.closeToolbar) {
			props.closeToolbar();
		} else {
			document.getElementById("add-channel-btn").classList.add("modal-open");
		}
		props.openModal('create channel');
	}

	if (props.isOwner) {
		if (props.inServerMenu) {
			return (
				<li>
					<button className="st-menu-btn create-channel" onClick={onClick}>
						<h6>Create Channel</h6>
						<i className="fas fa-plus-circle"></i>
					</button>
				</li>
			)
		}
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