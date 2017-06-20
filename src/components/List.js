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
      {...props}
    >
      {props.children}
    </a>
  </li>
);

List.defaultProps = {
  id: '',
  mobile: false,
  styles: styles.list.normal,
  containerStyle: styles.list.container
};

List.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.number,
    PropTypes.any
  ]).isRequired,
  className: PropTypes.string.isRequired,
  clickHandler: PropTypes.func.isRequired,
  containerStyle: PropTypes.shape({}),
  id: PropTypes.string,
  styles: PropTypes.shape({}),
  mobile: PropTypes.bool
};

export default Radium(List);
