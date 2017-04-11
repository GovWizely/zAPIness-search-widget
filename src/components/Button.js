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
  children: React.PropTypes.oneOfType([
    React.PropTypes.shape({}),
    React.PropTypes.string
  ]).isRequired,
  className: React.PropTypes.string.isRequired,
  clickHandler: React.PropTypes.func.isRequired,
  kind: React.PropTypes.string.isRequired,
  type: React.PropTypes.string.isRequired
}

export default Radium(Button)
