import React, { Component } from 'react';
import PropTypes from 'prop-types';

import map from 'lodash/map';
import toPairs from 'lodash/toPairs';
import startCase from 'lodash/startCase';

import styles from '../stylesheets/styles';

class Drawer extends Component {
  static propTypes = {
    cells: PropTypes.shape({}).isRequired,
    label: PropTypes.string.isRequired,
    id: PropTypes.number.isRequired,
    toggleHandler: PropTypes.func.isRequired,
    showDetails: PropTypes.bool.isRequired
  }

  toggleDetails(e) {
    e.preventDefault();

    this.props.toggleHandler(this.props.id);
  }

  render() {
    const {
      cells,
      label,
      showDetails,
      id
    } = this.props;

    return (
      <a
        href="{undefined}"
        onClick={e => this.toggleDetails(e)}
        style={styles.result.link}
        className="__sw-data__"
        data-id={id}
      >
        <div>{ label }</div>
        {
          showDetails &&
          <div className="__sw-details__" style={styles.result.details}>
            <table>
              <tbody>
                { map(toPairs(cells), (cell, index) => (
                  <tr key={index} style={styles.result.tr}>
                    <td><b style={{ fontWeight: 400 }}>{ startCase(cell[0]) }</b></td>
                    <td><i>{ cell[1] }</i></td>
                  </tr>
                  ))}
              </tbody>
            </table>
          </div>
        }
      </a>
    );
  }
}

export default Drawer;
