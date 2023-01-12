import React from 'react';
import ImageInput from '../../../util/image_input';
import { serverInitials } from '../../../../../utils/func_utils';

export default props => {
  const {
    name,
		imageUrl,
    handleName,
    handleImage,
		removeImage,
    handleSubmit,
    handleReset,
		hovered,
		notHovered,
		fileOpen,
    isOwner,
  } = props;

  const insertServerImg = () => {
    return (
      <div className="image-upload-wrapper">
          <ImageInput 
              hovered={ hovered }
              notHovered={ notHovered }
              handleImage={ handleImage }
              imageUrl={ imageUrl }
              isOwner={ isOwner }
          />
          {
              imageUrl ? 
              <img src={ imageUrl } className={ `upload-img img${isOwner ? "" : " disabled"}` } /> :
              <h2 onClick={ fileOpen } onMouseOver={ hovered } onMouseOut={ notHovered } className={ `initials${isOwner ? "" : " disabled"}` }>{ serverInitials(name) }</h2>
          }
          {
            isOwner ?
            (
              <h6 onClick={ fileOpen } onMouseOver={ hovered } onMouseOut={ notHovered } id="plus" className="plus">
                  <span>+</span>
                  <i onClick={ fileOpen } onMouseOver={ hovered } onMouseOut={ notHovered } className="fas fa-camera"></i>
              </h6>
            ) :
            null
          }
          
      </div>
  	);
  }

  return (
    <section className="overview-wrapper">
      <h1 className="content-title">Server Overview</h1>
      <form onSubmit={ handleSubmit } className="edit-server-form">
      	<main>
					<div className="edit-server-image-wrapper">
						{ insertServerImg() }
						<button disabled={ !isOwner } type="button" onClick={ removeImage }>Remove</button>
					</div>

					<div className="edit-server-image-alt">
						<h6>We recommend an image of at least 512x512 for the server.</h6>
						<button disabled={ !isOwner } className="upload-img-btn" onClick={ fileOpen } >Upload Image</button>
					</div>

					<div className="edit-server-name-wrapper">
						<h3 className="edit-server-label">SERVER NAME</h3>
						<input
								id="edit-server-input"
								type="text"
								value={ name }
								onChange={ handleName }
                disabled={ !isOwner }
						/>
					</div>
				</main>
				<div id="ssf-buttons-wrapper" className="buttons-wrapper">
						<p className="update-message">Careful — you have unsaved changes!</p>
						<div className="buttons">
								<button onClick={ handleReset } className="reset" type="button">Reset</button>
								<button disabled={ !name || !isOwner } className="save" type="submit">Save Changes</button>
						</div>
				</div>

      </form>
  </section>
  );

}