import PropTypes from 'prop-types';
import styles from '../stylesheets/styles';

const Radium = require('radium');
const React = require('react');

const List = props => (
  <li
    style={props.containerStyle}
    key={props.id}
    className={props.className}
  >
    <a
      href="{undefined}"
      style={props.mobile ? [
        styles.list.base,
        styles.list.mobileBase,
        props.styles
      ] : [
        styles.list.base,
        props.styles
      ]}
      onClick={props.clickHandler}
      id={props.id}
      value={props.value}
    >
      {props.children}
    </a>
  </li>
);

List.defaultProps = {
  id: '',
  className: '',
  mobile: false,
  styles: styles.list.normal,
  containerStyle: styles.list.container,
  value: ''
};

List.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.number,
    PropTypes.any
  ]).isRequired,
  className: PropTypes.string,
  clickHandler: PropTypes.func.isRequired,
  containerStyle: PropTypes.shape({}),
  id: PropTypes.string,
  mobile: PropTypes.bool,
  styles: PropTypes.shape({}),
  value: PropTypes.string
};

export default Radium(List);
