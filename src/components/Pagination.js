import React from 'react';
import PropTypes from 'prop-types';
import map from 'lodash/map';
import getRange from '../actions/range';
import PhoneView from './responsive/PhoneView';

import List from './List';
import Grid from './Grid';

import styles from '../stylesheets/styles';

export default class Pagination extends React.Component {
  constructor(props) {
    super(props);

    this.renderPage = this.renderPage.bind(this);
  }

  componentWillMount() {
    this.renderPage(this.props);
  }

  componentWillReceiveProps(nextProps) {
    this.renderPage(nextProps);
  }

  buildPageBetween() {
    const range = getRange(
      this.props.activePage,
      this.props.totalPage,
      this.props.totalNumButton
    );

    return map(range, num => (this.page(num)));
  }

  renderPage(props) {
    this.page = Grid(props.activePage, props.onSelect);
  }

  render() {
    const {
      totalPage,
      totalNumButton,
      activePage,
      onSelect
    } = this.props;

    const haveTrailingNext = totalPage - activePage - totalNumButton >= 0;
    const haveTrailingPrev = activePage - 1 - totalNumButton >= 0;
    const havePrev = activePage !== 1;
    const haveNext = activePage !== totalPage;

    return (
      <div style={styles.pagination.container}>
        <PhoneView>
            {
              matches => matches ? (
                <ul className="mobilePagination" style={styles.pagination.mobileBase}>
                  { havePrev &&
                    <List
                      className="previous-page"
                      mobile
                      styles={{
                        borderTopLeftRadius: 3,
                        borderBottomLeftRadius: 3
                      }}
                      clickHandler={(e) => {
                        e.preventDefault();
                        onSelect(activePage - 1);
                      }}
                    >
                      ‹
                    </List>
                  }
                  <List
                      className="current-page"
                      mobile
                      clickHandler={(e) => {
                        e.preventDefault();
                        onSelect(activePage);
                      }}
                    >
                      {activePage} of {totalPage}
                    </List>
                  { haveNext &&
                    <List
                      className="next-page"
                      mobile
                      styles={{
                        borderTopRightRadius: 3,
                        borderBottomRightRadius: 3
                      }}
                      clickHandler={(e) => {
                        e.preventDefault();
                        onSelect(activePage + 1);
                      }}
                    >
                      ›
                    </List>
                  }
                </ul>
              ) : (
                <ul className="pagination" style={styles.pagination.base}>
                  <List
                    className="first-page"
                    styles={styles.list.first}
                    clickHandler={(e) => {
                      e.preventDefault();
                      onSelect(1);
                    }}
                  >
                    « First
                  </List>

                  { havePrev &&
                    <List
                      className="previous-page"
                      clickHandler={(e) => {
                        e.preventDefault();
                        onSelect(activePage - 1);
                      }}
                    >
                      ‹ Prev
                    </List>
                  }
                  { this.page(1) }
                  { haveTrailingPrev &&
                    <List
                      className="trailing"
                      clickHandler={e => e.preventDefault()}
                    >...</List>
                  }
                  { this.props.totalPage !== 1 && this.buildPageBetween() }
                  { haveTrailingNext &&
                    <List
                      className="trailing"
                      clickHandler={e => e.preventDefault()}
                    >...</List>
                  }
                  { totalPage !== 1 && this.page(totalPage) }

                  { haveNext &&
                    <List
                      className="next-page"
                      clickHandler={(e) => {
                        e.preventDefault();
                        onSelect(activePage + 1);
                      }}
                    >
                      Next ›
                    </List>
                  }

                  <List
                    className="last-page"
                    styles={styles.list.last}
                    clickHandler={(e) => {
                      e.preventDefault();
                      onSelect(totalPage);
                    }}
                  >
                    Last »
                  </List>
                </ul>
              )
            }
        </PhoneView>
      </div>
    );
  }
}

Pagination.propTypes = {
  totalPage: PropTypes.number.isRequired,
  totalNumButton: PropTypes.number.isRequired,
  activePage: PropTypes.number.isRequired,
  onSelect: PropTypes.func.isRequired
};
