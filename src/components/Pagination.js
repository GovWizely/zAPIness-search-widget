import React, { PropTypes } from 'react'
import { page, getRange } from '../actions/page'

const _ = require('lodash')

export default class Pagination extends React.Component {
  constructor(props) {
    super(props)

    this.renderPage = this.renderPage.bind(this)
  }
  componentWillMount() {
    this.renderPage(this.props)
  }
  componentWillReceiveProps(nextProps) {
    this.renderPage(nextProps)
  }

  buildPageBetween() {
    const range = getRange(
      this.props.activePage,
      this.props.totalPage,
      this.props.totalNumButton
    )

    return _.map(range, num => (this.page(num)))
  }

  renderPage(props) {
    this.page = page(props.activePage, props.onSelect)
  }

  render() {
    const {
      totalPage,
      totalNumButton,
      activePage,
      onSelect
    } = this.props

    const haveNext = totalPage - activePage - totalNumButton >= 0
    const havePrev = activePage - 1 - totalNumButton >= 0

    return (
      <div className="containerClass">
        <ul className="pagination">
          <li>
            <button
              type="button"
              className="previous-page"
              onClick={() => onSelect(activePage - 1)}
            > &lt; </button>
          </li>
          { this.page(1) }
          { havePrev && <li>...</li> }
          { this.buildPageBetween() }
          { haveNext && <li>...</li> }
          { this.page(totalPage) }
          <li>
            <button
              type="button"
              className="next-page"
              title="Next page"
              onClick={() => onSelect(activePage + 1)}
            > &gt; </button>
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
}
