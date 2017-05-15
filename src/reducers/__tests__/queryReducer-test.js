import queryReducer from '../queryReducer';
import * as actionTypes from '../../constants/ActionTypes';

const { Map } = require('immutable');

describe('queryReducer', () => {
  const data = [1, 2, 3];

  const initialState = Map({
    keyword: '',
    offset: 0,
    pageNum: 1,
    data: undefined,
    error: [],
    fields: []
  });

  it('returns initialState', () => {
    expect(
     queryReducer(undefined, {})
   ).toEqual(Map({
     keyword: '',
     offset: 0,
     pageNum: 1,
     data: undefined,
     error: [],
     fields: []
   }));
  });

  it('handles load result', () => {
    expect(
      queryReducer(initialState, {
        type: actionTypes.LOAD_RESULT,
        data
      })
    ).toEqual(Map({
      keyword: '',
      offset: 0,
      pageNum: 1,
      data,
      error: [],
      fields: []
    }));
  });

  it('handles load error', () => {
    expect(
      queryReducer(initialState, {
        type: actionTypes.LOAD_ERROR,
        error: 'Some Error'
      })
    ).toEqual(Map({
      keyword: '',
      offset: 0,
      pageNum: 1,
      data: undefined,
      error: 'Some Error',
      fields: []
    }));
  });

  it('handles update keywords', () => {
    expect(
      queryReducer(initialState, {
        type: actionTypes.UPDATE_KEYWORD,
        keyword: 'Some Keyword'
      })
    ).toEqual(Map({
      keyword: 'Some Keyword',
      offset: 0,
      pageNum: 1,
      data: undefined,
      error: [],
      fields: []
    }));
  });

  it('handles update page num', () => {
    expect(
      queryReducer(initialState, {
        type: actionTypes.UPDATE_PAGE_NUM,
        pageNum: 2
      })
    ).toEqual(Map({
      keyword: '',
      offset: 10,
      pageNum: 2,
      data: undefined,
      error: [],
      fields: []
    }));
  });

  it('clears error', () => {
    initialState.set('error', ['Some Error']);

    expect(
      queryReducer(initialState, {
        type: actionTypes.CLEAR_ERROR
      })
    ).toEqual(Map({
      keyword: '',
      offset: 0,
      pageNum: 1,
      data: undefined,
      error: [],
      fields: []
    }));
  });

  it('handles update fields', () => {
    expect(
      queryReducer(initialState, {
        type: actionTypes.UPDATE_FIELDS,
        fields: ['some', 'random', 'fields']
      })
    ).toEqual(Map({
      keyword: '',
      offset: 0,
      pageNum: 1,
      data: undefined,
      error: [],
      fields: ['some', 'random', 'fields']
    }));
  });
});