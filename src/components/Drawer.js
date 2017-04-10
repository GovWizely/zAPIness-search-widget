import React, { Component, PropTypes } from 'react'

const _ = require('lodash')

export default class Drawer extends Component {
  propTypes = {
    cells: PropTypes.shape({}).isRequired,
    label: PropTypes.string.isRequired
  }

  constructor(props) {
    super(props)
    this.state = {
      showDetails: false
    }
  }

  toggleDetails() {
    this.setState({
      showDetails: !this.state.showDetails
    })
  }

  renderTable(cells) {
    return (
      _.map(_.toPairs(cells), (cell, index) => (
        <tr key={index} >
          <button
            type="button"
            onClick={() => this.toggleDetails()}
          >
            <td><b>{ _.startCase(cell[0]) }</b></td>
            <td><i>{ cell[1] }</i></td>
          </button>
        </tr>
      ))
    )
  }

  render() {
    const {
      cells,
      label
    } = this.props

    return (
      <div>
        <div className="__sw-link__" >
          <button type="button"onClick={() => this.toggleDetails()}>
            { cells[label] }
          </button>
        </div>

        {
          this.state.showDetails &&
          <div className="__sw-details__">
            <table>
              <tbody>
                { this.renderTable(cells) }
              </tbody>
            </table>
          </div>
        }
      </div>
    )
  }
}
