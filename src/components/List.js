import PropTypes from 'prop-types'
import styles from '../stylesheets/styles'

const Radium = require('radium')
const React = require('react')

const List = props => (
  <li
    style={styles.list.container}
    key={props.key}
    className={props.className}
  >
    <a
      href="{undefined}"
      style={[
        styles.list.base,
        props.styles
      ]}
      onClick={props.clickHandler}
    >
      {props.children}
    </a>
  </li>
)

List.defaultProps = {
  key: '',
  styles: styles.list.normal
}

List.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.number,
    PropTypes.shape({})
  ]).isRequired,
  className: PropTypes.string.isRequired,
  clickHandler: PropTypes.func.isRequired,
  key: PropTypes.string,
  styles: PropTypes.shape({})
}

export default Radium(List)
