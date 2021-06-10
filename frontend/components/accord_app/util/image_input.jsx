import React from 'react'; 

const ImageInput = (props) => {
  const { 
    handleImage,
    hovered,
    notHovered,
    imageUrl
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
          type="file" />
      </label>
    </>
  )
}

export default ImageInput;