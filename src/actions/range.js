import { floor, range } from 'lodash'

const noPrev = (current, max) => current - max <= 1

const noNext = (current, totalPage, max) => current + max >= totalPage

const getRange = (activePage, totalPage, totalNumButton) => {
  const limit = floor(totalNumButton / 2)
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

    numRange = range(initial, last)
  } else {
    numRange = range(2, totalPage)
  }

  return numRange
}

export default getRange
