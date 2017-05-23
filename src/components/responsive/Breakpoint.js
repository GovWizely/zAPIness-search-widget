import React from 'react';
import PropTypes from 'prop-types';
import Media from 'react-media';

export const breakpoints = {
  desktop: '(min-width: 768px)',
  tablet: '(min-width: 768px) and (max-width: 1024px)',
  phone: '(max-width: 767px)'
};

const Breakpoint = (props) => {
  const breakpoint = breakpoints[props.name];

  return (
    <Media {...props} query={breakpoint}>
      {props.children}
    </Media>
  );
};

Breakpoint.defaultProps = {
  name: 'desktop',
  children: undefined
};

Breakpoint.propTypes = {
  name: PropTypes.string,
  children: PropTypes.shape({})
};

export default Breakpoint;
