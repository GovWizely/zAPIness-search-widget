import floor from 'lodash/floor';
import range from 'lodash/range';

const noPrev = (current, max) => current - max <= 1;

const noNext = (current, totalPage, max) => current + max >= totalPage;

const upperLimit = 2;

const getRange = (activePage, totalPage, totalNumButton) => {
  if (activePage < 0 || totalPage < 0 || totalNumButton < 0) {
    console.error(' The arguments must be more than 0');
    return;
  }

  const limit = floor(totalNumButton / 2);
  let initial = activePage - limit;
  let last = activePage + limit + 1;
  let numRange = [];

  if (totalPage > totalNumButton) {
    if (noPrev(activePage, limit)) {
      initial = upperLimit;
    }

    if (noNext(activePage, totalPage, limit)) {
      last = totalPage;
    }
    numRange = range(initial, last);
  } else if (totalPage === 1) {
    numRange = range(1, 1);
  } else {
    numRange = range(2, totalPage + 1);
  }

  return numRange;
};

export default getRange;
