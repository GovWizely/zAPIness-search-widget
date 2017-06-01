import * as es from '../elasticsearch';

const { Map } = require('immutable');

describe('actions/elasticsearch', () => {
  const keyword = 'Hello World';
  const offset = 10;
  const filters = [
    Map({ type: 'home', value: 'Earth' }),
    Map({ type: 'inhabitant', value: 'Human' }),
    Map({ type: 'inhabitant', value: 'Whales' })
  ];
  const total = 10;
  const categories = ['a', 'b', 'c'];
  let data = {
    metadata: {
      total
    },
    aggregations: categories
  };

  describe('totalCount', () => {
    it('returns total count of results', () => {
      expect(es.totalCount(data)).toEqual(total);
    });
  });

  describe('categories', () => {
    it('returns categories of the data', () => {
      expect(es.categories(data)).toEqual(categories);
    });
  });

  describe('paginationTotal', () => {
    it('returns total pages showed in the pagination bar', () => {
      expect(es.paginationTotal(data, 3)).toEqual(3);
    });

    it('returns 1 if the total results is less than count per page', () => {
      expect(es.paginationTotal(data, 20)).toEqual(1);
    });
  });

  describe('buildParams', () => {
    it('returns q and offset in the params if filter is empty', () => {
      data = Map({
        keyword,
        offset,
        filters: []
      });

      expect(es.buildParams(data)).toEqual({
        q: keyword,
        offset
      });
    });

    it('returns q and offset in the params if hasFilter is false', () => {
      data = Map({
        keyword,
        offset,
        filters,
        hasFilter: false
      });

      expect(es.buildParams(data)).toEqual({
        q: keyword,
        offset
      });
    });

    it('returns q, offset and filters in the params', () => {
      const hasFilter = true;
      data = Map({ keyword, offset, filters, hasFilter });
      const filterData = Map({ filters });

      expect(es.buildParams(data, filterData)).toEqual({
        q: keyword,
        offset,
        home: ['Earth'],
        inhabitant: ['Human', 'Whales']
      });
    });
  });
});
