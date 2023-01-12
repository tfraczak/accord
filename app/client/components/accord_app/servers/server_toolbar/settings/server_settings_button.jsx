import React from 'react';


export default (props) => {
	
	const {
    openModal,
    closeToolbar,
  } = props;

	const onClick = e => {
		e.stopPropagation();
		e.preventDefault();
		closeToolbar();
		openModal();
	};

	return (
		<li>
			<button onClick={onClick} className="st-menu-btn server-settings">
				<h6>Server Settings</h6>
				<i className="fas fa-cog"></i>
			</button>
		</li>
	);
};