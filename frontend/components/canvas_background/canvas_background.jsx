import React from 'react';
import Stars from './stars';
import Snowflakes from './snowflakes';

export default props => {
  
  const {
    numStars,
    numBackFlakes,
    numFrontFlakes,
    bgUrl
  } = props;

  return (
    <>
      <Stars numStars={ numStars } />
      <Snowflakes bgUrl={ bgUrl } numBackFlakes={ numBackFlakes } numFrontFlakes={ numFrontFlakes } />
    </>
  );
}