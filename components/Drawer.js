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
        <tr key={index}>
          <td>{ cell[0] }</td>
          <td>{ cell[1] }</td>
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
        <div className="__sw_link__" onClick={ () => this.toggleDetails() }>
          { cells[label] }
        </div>

        {
          this.state.showDetails &&
          <div className="__sw_details__">
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
