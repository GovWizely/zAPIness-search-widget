import React from 'react'

const _ = require('lodash')

const noPrev = (current, max) => current - max <= 1

const noNext = (current, totalPage, max) => current + max >= totalPage

export const page = (activePage, clickHandler) => num => (
  <li
    key={num}
    className={num === activePage ? 'active' : ''}
  >
    <a
      href="{undefined}"
      onClick={() => clickHandler(num)}
    >
      { num }
    </a>
  </li>
)

export const getRange = (activePage, totalPage, totalNumButton) => {
  const limit = _.floor(totalNumButton / 2)
  let initial = activePage - limit
  let last = activePage + limit + 1
  let numRange = []

  if (totalPage > totalNumButton) {
    if (noPrev(activePage, limit)) {
      initial = 2
    }

    if (noNext(activePage, totalPage, limit)) {
      last = totalPage
    }

    numRange = _.range(initial, last)
  } else {
    numRange = _.range(1, totalPage + 1)
  }

  return numRange
}
