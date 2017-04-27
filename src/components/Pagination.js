import React from 'react'
import PropTypes from 'prop-types'
import map from 'lodash/map'
import getRange from '../actions/range'

import List from './List'
import Grid from './Grid'

import styles from '../stylesheets/styles'

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

    return map(range, num => (this.page(num)))
  }

  renderPage(props) {
    this.page = Grid(props.activePage, props.onSelect)
  }

  render() {
    const {
      totalPage,
      totalNumButton,
      activePage,
      onSelect
    } = this.props

    const haveTrailingNext = totalPage - activePage - totalNumButton >= 0
    const haveTrailingPrev = activePage - 1 - totalNumButton >= 0
    const havePrev = activePage !== 1
    const haveNext = activePage !== totalPage

    return (
      <div style={styles.pagination.container}>
        <ul className="pagination" style={styles.pagination.base}>
          <List
            className="previous-page"
            styles={styles.list.first}
            clickHandler={(e) => {
              e.preventDefault()
              onSelect(1)
            }}
          >
            « First
          </List>

          { havePrev &&
            <List
              className="previous-page"
              clickHandler={(e) => {
                e.preventDefault()
                onSelect(activePage - 1)
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
                e.preventDefault()
                onSelect(activePage + 1)
              }}
            >
              Next ›
            </List>
          }

          <List
            className="next-page"
            styles={styles.list.last}
            clickHandler={(e) => {
              e.preventDefault()
              onSelect(totalPage)
            }}
          >
            Last »
          </List>
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
