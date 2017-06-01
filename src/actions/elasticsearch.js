import floor from 'lodash/floor';
import map from 'lodash/map';
import mapValues from 'lodash/mapValues';
import groupBy from 'lodash/groupBy';
import merge from 'lodash/merge';

export function totalCount(data) {
  return data.metadata.total;
}

export function count(data) {
  return data.metadata.count;
}

export function categories(data) {
  return data.aggregations;
}

export function paginationTotal(data, countPerPage) {
  const fraction = totalCount(data) / countPerPage;

  if (fraction < 1) {
    return 1;
  }

  return floor(fraction);
}

// Example
// params = {
//   "q": "office",
//   "offset": 0,
//   "filter": {
//     agency: ['ausaid', 'australian national audit office (anao)'],
//     category: ['architectural engineering']
//   }
// }
export function buildParams(query, filters) {
  const params = {
    q: query.get('keyword'),
    offset: query.get('offset')
  };

  if (query.get('hasFilter') && filters) {
    const filterData = map(filters.get('filters'), filter => filter.toJS());
    const filter = mapValues(groupBy(filterData, 'type'), val => map(val, 'value'));
    merge(params, filter);
  }

  return params;
}
