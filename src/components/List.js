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
  children: React.PropTypes.oneOfType([
    React.PropTypes.string,
    React.PropTypes.number,
    React.PropTypes.shape({})
  ]).isRequired,
  className: React.PropTypes.string.isRequired,
  clickHandler: React.PropTypes.func.isRequired,
  key: React.PropTypes.number,
  styles: React.PropTypes.shape({})
}

export default Radium(List)
