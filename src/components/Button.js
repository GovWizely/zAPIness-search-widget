import PropTypes from 'prop-types';
import styles from '../stylesheets/styles';

const Radium = require('radium');
const React = require('react');

const Button = props => (
  <button
    style={[
      styles.buttons.base,
      styles.buttons[props.kind]
    ]}
    className={props.className}
    onClick={props.clickHandler}
    type={props.type}
    disabled={props.submitting || props.disabled}
  >
    {props.children}
  </button>
);

Button.defaultProps = {
  submitting: false,
  disabled: false
};

Button.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.shape({}),
    PropTypes.string,
    PropTypes.any
  ]).isRequired,
  className: PropTypes.string.isRequired,
  clickHandler: PropTypes.func.isRequired,
  disabled: PropTypes.bool,
  kind: PropTypes.string.isRequired,
  type: PropTypes.string.isRequired,
  submitting: PropTypes.bool
};

export default Radium(Button);
