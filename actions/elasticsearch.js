var _ = require('lodash');

export function totalCount(data) {
  return data.metadata.total
}

export function categories(data) {
  return data.aggregations
}

export function paginationTotal(data, countPerPage) {
  return _.floor(totalCount(data) / countPerPage)
}
