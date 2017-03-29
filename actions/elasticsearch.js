var _ = require('lodash');

export function totalCount(data) {
  return data.metadata.total
}

export function categories(data) {
  return data.aggregations
}

export function paginationTotal(data, countPerPage) {
  let fraction = totalCount(data) / countPerPage

  if(fraction < 1) {
    return 1
  } else {
    return _.floor(fraction)
  }
}
