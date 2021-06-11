import React from 'react'; 

const ImageInput = (props) => {
  const { 
    handleImage,
    hovered,
    notHovered,
    imageUrl,
    isOwner
  } = props;

  return (
    <>
      <label 
        onMouseEnter={ hovered } 
        onMouseOut={ notHovered } 
        id="server-img-input" 
        className={ `upload-img input${imageUrl ? " img-present" : ""}` }
        htmlFor="img-input">
        <input 
          id="img-input"
          onChange={ handleImage }
          type="file"
          disabled={ !isOwner } />
      </label>
    </>
  )
}

export default ImageInput;