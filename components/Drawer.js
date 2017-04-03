import React, { Component } from 'react';

var _ = require('lodash');

export default class Drawer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      showDetails: false
    };
  }

  renderTable(cells) {
    return(
      _.map(_.toPairs(cells), (cell, index) => (
        <tr key={index} onClick={ () => this.toggleDetails() }>
          <td><b>{ _.startCase(cell[0]) }</b></td>
          <td><i>{ cell[1] }</i></td>
        </tr>
      ))
    )
  }

  toggleDetails() {
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
      <div>
        <div className="__sw-link__" onClick={ () => this.toggleDetails() }>
          { cells[label] }
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
