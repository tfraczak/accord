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
      <button onClick={onClick} className="st-menu-btn invitation">
        <h6>Invite People</h6>
        <i className="fas fa-user-plus"></i>
      </button>
    </li>
	);
};