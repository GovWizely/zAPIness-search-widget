import PropTypes from 'prop-types';
import styles from '../stylesheets/styles';

const Radium = require('radium');
const React = require('react');

const List = props => (
  <li
    style={styles.list.container}
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
    >
      {props.children}
    </a>
  </li>
);

List.defaultProps = {
  id: '',
  mobile: false,
  styles: styles.list.normal
};

List.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.number,
    PropTypes.shape({})
  ]).isRequired,
  className: PropTypes.string.isRequired,
  clickHandler: PropTypes.func.isRequired,
  id: PropTypes.string,
  styles: PropTypes.shape({}),
  mobile: PropTypes.bool
};

export default Radium(List);
