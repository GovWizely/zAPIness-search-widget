const _ = require('lodash')

export function totalCount(data) {
  return data.metadata.total
}

export function categories(data) {
  return data.aggregations
}

export function paginationTotal(data, countPerPage) {
  const fraction = totalCount(data) / countPerPage

  if (fraction < 1) {
    return 1
  }

  return _.floor(fraction)
}

// Example
// params = {
//   "q": "office",
//   "filter": {
//     agency: ['ausaid', 'australian national audit office (anao)'],
//     category: ['architectural engineering']
//   }
// }

export function buildParams(data) {
  const filters = _.map(data.get('filters'), filter => filter.toJS())

  const filter = _.chain(filters)
    .groupBy('type')
    .mapValues(value => _.map(value, 'value'))
    .value()

  const params = {
    q: data.get('keyword'),
    offset: data.get('offset'),
    filter
  }

  return params
}
