import PropTypes from 'prop-types'
import styles from '../stylesheets/styles'

const Radium = require('radium')
const React = require('react')

const Button = props => (
  <button
    style={[
      styles.buttons.base,
      styles.buttons[props.kind]
    ]}
    className={props.className}
    onClick={props.clickHandler}
    type={props.type}
  >
    {props.children}
  </button>
)

Button.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.shape({}),
    PropTypes.string
  ]).isRequired,
  className: PropTypes.string.isRequired,
  clickHandler: PropTypes.func.isRequired,
  kind: PropTypes.string.isRequired,
  type: PropTypes.string.isRequired
}

export default Radium(Button)
