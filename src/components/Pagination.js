import React, { PropTypes } from 'react';
import { page, getRange, trailing } from '../actions/page';

var _ = require('lodash');

export default class Pagination extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      renderPage: page(this.props.activePage, this.props.onSelect),
      buildTrailing: trailing(this.props.activePage)
    }
  }

  componentWillReceiveProps(nextProps) {
    if(this.props != nextProps) {
      this.setState({
        renderPage: page(nextProps.activePage, nextProps.onSelect),
        buildTrailing: trailing(nextProps.activePage)
      })
    }
  }

  buildPageBetween() {
    let range = getRange(
      this.props.activePage,
      this.props.totalPage,
      this.props.totalNumButton
    );

    return _.map(range, (num, index) => ( this.state.renderPage(num) ));
  }

  buildFrontTrailing(havePrev) {
    return this.state.buildTrailing(havePrev);
  }

  buildBackTrailing(haveNext) {
    return this.state.buildTrailing(haveNext);
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
          { this.state.renderPage(1) }
          { this.buildFrontTrailing(havePrev) }
          { this.buildPageBetween() }
          { this.buildBackTrailing(haveNext) }
          { this.state.renderPage(totalPage) }
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
