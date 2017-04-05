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

export function buildParams(data) {
  let filters = _.map(data.get('filters'), (filter) => filter.toJS())

  let filter = _.chain(filters)
    .groupBy('type')
    .mapValues((value) => {
      return _.map(value, 'value')
    })
    .value()

  let params = {
    q: data.get('keyword'),
    offset: data.get('offset'),
    filter: filter
  }

  // params = {
  //   "q": "office",
  //   "filter": {
  //     agency: ['ausaid', 'australian national audit office (anao)'],
  //     category: ['architectural engineering']
  //   }
  // }

  return params
}
