import React from 'react';


export default (props) => {

	return (
		<li>
			<button className="profile-btn" onClick={props.openModal}>
				<h6>Profile</h6>
			</button>
		</li>
	);
};