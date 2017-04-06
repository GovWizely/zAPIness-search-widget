import React, { PropTypes } from 'react';
import { page, getRange, trailing } from '../actions/page';

var _ = require('lodash');

export default class Pagination extends React.Component {
  constructor(props) {
    super(props)

    this.renderPage = this.renderPage.bind(this)
  }
  componentWillMount() {
    this.renderPage(this.props);
  }
  componentWillReceiveProps(nextProps) {
    this.renderPage(nextProps)
  }

  renderPage(props) {
    this.page = page(props.activePage, props.onSelect);
    this.trailing = trailing(props.activePage);
  }

  buildPageBetween() {
    let range = getRange(
      this.props.activePage,
      this.props.totalPage,
      this.props.totalNumButton
    );

    return _.map(range, (num, index) => ( this.page(num) ));
  }

  buildFrontTrailing(havePrev) {
    return this.trailing(havePrev);
  }

  buildBackTrailing(haveNext) {
    return this.trailing(haveNext);
  }

  render() {
    const {
      totalPage,
      totalNumButton,
      activePage,
      onSelect
    } = this.props

    const haveNext = totalPage - activePage - totalNumButton >= 0;
    const havePrev = activePage - 1 - totalNumButton >= 0;

    return(
      <div className='containerClass'>
        <ul className='pagination'>
          <li className=''>
            <a
              href='#'
              className='previous-page'
              title='Previous page'
              onClick={ () => onSelect(activePage - 1) }
          > &lt; </a>
          </li>
          { this.page(1) }
          { this.buildFrontTrailing(havePrev) }
          { this.buildPageBetween() }
          { this.buildBackTrailing(haveNext) }
          { this.page(totalPage) }
          <li className=''>
            <a
              href='#'
              className='next-page'
              title='Next page'
              onClick={ () => onSelect(activePage + 1) }
          > &gt; </a>
          </li>
        </ul>
      </div>
    )
  }
}

Pagination.propTypes = {
  totalPage: PropTypes.number.isRequired,
  totalNumButton: PropTypes.number.isRequired,
  activePage: PropTypes.number.isRequired,
  onSelect: PropTypes.func.isRequired
};
