import React from 'react';
var _ = require('lodash');

export const page = (activePage, clickHandler) => {
  return (num) => (
    <li
      key={num}
      className={ num === activePage ? 'active' : '' }
      onClick={ () => clickHandler(num) }
    >
    { num }
    </li>
  )
}

export const trailing = (activePage) => {
  return (condition) => {
    if (condition) {
      return <li>...</li>
    }
  }
}

export const getRange = (activePage, totalPage, totalNumButton) => {
  let limit = _.floor(totalNumButton / 2);
  let initial = activePage - limit;
  let last = activePage + limit + 1;
  let numRange = [];

  if (totalPage > totalNumButton) {

    if(noPrev(activePage, limit)) {
      initial = 2;
    }

    if(noNext(activePage, totalPage, limit)) {
      last = totalPage;
    }

    console.log(initial);
    console.log(last);

    numRange = _.range(initial, last)
  } else {
    numRange = _.range(1, totalPage + 1);
  }

  console.log(numRange);

  return numRange
}

const noPrev = (current, max) => {
  return current - max <= 1;
}

const noNext = (current, totalPage, max) => {
  return current + max >= totalPage;
}
