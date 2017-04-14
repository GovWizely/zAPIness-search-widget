import React, { Component, PropTypes } from 'react'
import styles from '../stylesheets/styles'

const _ = require('lodash')

class Drawer extends Component {
  static propTypes = {
    cells: PropTypes.shape({}).isRequired,
    label: PropTypes.string.isRequired
  }

  constructor(props) {
    super(props)
    this.state = {
      showDetails: false
    }
  }

  toggleDetails(e) {
    e.preventDefault()

    this.setState({
      showDetails: !this.state.showDetails
    })
  }

  render() {
    const {
      cells,
      label
    } = this.props

    return (
      <a
        href="{undefined}"
        onClick={e => this.toggleDetails(e)}
        style={styles.result.link}
        className="__sw-data__"
      >
        <div>{ cells[label] }</div>
        {
          this.state.showDetails &&
          <div className="__sw-details__" style={styles.result.details}>
            <table>
              <tbody>
                { _.map(_.toPairs(cells), (cell, index) => (
                  <tr key={index} style={styles.result.tr}>
                    <td><b style={{ fontWeight: 400 }}>{ _.startCase(cell[0]) }</b></td>
                    <td><i>{ cell[1] }</i></td>
                  </tr>
                  ))}
              </tbody>
            </table>
          </div>
        }
      </a>
    )
  }
}

export default Drawer
