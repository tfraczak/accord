import React from 'react';


export default ({ openModal }) => (
  <li key="add-server-button">
		<button className="add-server-button" onClick={() => openModal('create server')}>
			<i className="fas fa-plus"></i>
		</button>
  </li>
);