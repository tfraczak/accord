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
          {/* open modal */}
          {/* <ChangeNicknameButton key={`change-nickname-${server.id}`} /> */}
          <button onClick={ onClick } className="st-menu-btn change-nickname">
            <h6>Change Nickname</h6>
            <i className="fas fa-pencil-alt"></i>
          </button>
        </li>
	);
};