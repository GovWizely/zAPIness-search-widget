import ceil from 'lodash/ceil';
import map from 'lodash/map';
import mapValues from 'lodash/mapValues';
import groupBy from 'lodash/groupBy';
import merge from 'lodash/merge';
import isNull from 'lodash/isNull';

export function totalCount(data) {
  return data.metadata.total;
}

export function count(data) {
  return data.metadata.count;
}

function nextOffset(data) {
  return data.metadata.next_offset;
}

export function offset(data) {
  return data.metadata.offset;
}

export function categories(data) {
  return data.aggregations;
}

function dataFraction(data, countPerPage) {
  return totalCount(data) / countPerPage;
}

export function paginationTotal(data, countPerPage) {
  const fraction = dataFraction(data, countPerPage);

  if (fraction < 1) {
    return 1;
  }

  return ceil(fraction);
}

export function paginationEnd(data, countPerPage) {
  const fraction = dataFraction(data, countPerPage);

  if (fraction < 1 || isNull(nextOffset(data))) {
    return totalCount(data);
  }

  return nextOffset(data);
}

export function paginationStart(data, activePage) {
  if (activePage === 1) {
    return 1;
  }

  return offset(data) + 1;
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
    //debugger
    const filterData = map(filters.get('filters'), filter => filter.toJS());
    const filter = mapValues(groupBy(filterData, 'type'), val => map(val, 'value'));
    merge(params, filter);
  }

  return params;
}
