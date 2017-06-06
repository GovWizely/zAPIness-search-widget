import React, { Component } from 'react';
import PropTypes from 'prop-types';

import map from 'lodash/map';
import toPairs from 'lodash/toPairs';
import startCase from 'lodash/startCase';

import styles from '../stylesheets/styles';

class Drawer extends Component {
  toggleDetails(e) {
    e.preventDefault();

    this.props.toggleHandler(this.props.id);
  }

  render() {
    const {
      cells,
      deviceType,
      id,
      label,
      showDetails
    } = this.props;

    const isDesktop = deviceType === 'desktop';

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
            {
              isDesktop &&
              <table>
                <tbody>
                  { map(toPairs(cells), (cell, index) => (
                    <tr key={index} style={styles.result.tr}>
                      <td>
                        <b style={{ fontWeight: 400 }}>{ startCase(cell[0]) }</b>
                      </td>
                      <td style={{ paddingLeft: '10px' }}>
                        <i>{ cell[1] ? cell[1] : '-' }</i>
                      </td>
                    </tr>
                    ))}
                </tbody>
              </table>
            }

            {
              !isDesktop &&
              <div className="__sw-mobile-details__">
                { map(toPairs(cells), (cell, index) => (
                  <div key={index}>
                    <div>
                      <b style={{ fontWeight: 400 }}>{ startCase(cell[0]) }</b>
                    </div>
                    <div style={{ paddingBottom: '10px' }}>
                      <i>{ cell[1] ? cell[1] : 'n/a' }</i>
                    </div>
                  </div>
                  ))}
              </div>
            }
          </div>
        }
      </a>
    );
  }
}

Drawer.propTypes = {
  cells: PropTypes.shape({}).isRequired,
  deviceType: PropTypes.string.isRequired,
  id: PropTypes.number.isRequired,
  label: PropTypes.string.isRequired,
  showDetails: PropTypes.bool.isRequired,
  toggleHandler: PropTypes.func.isRequired
};

export default Drawer;
