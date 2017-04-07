import React, { Component, PropTypes } from 'react';
import Pagination from './Pagination';
import { paginationTotal, categories } from '../actions/elasticsearch';

import Drawer from './Drawer';

var _ = require('lodash');

export default class Result extends Component {

  render() {
    const {
      activePage,
      paginationHandleSelect,
      query
     } = this.props

    const label = _.keys(categories(query.data))[0]

    return(
      <div className='__sw-result__'>
        { query.data.results.length === 0 &&
          <div className='__sw-no-result__'>
            No result found. Please try again.
          </div>
        }
        {
          _.map(query.data.results, (result, index) => (
            <div key={index} className='__result-container__'>
              <Drawer cells={result} label={label}></Drawer>
            </div>
          ))
        }
        {
          query.data.results.length > 0 &&
          <Pagination
             totalPage={ paginationTotal(query.data, 10) }
             totalNumButton={ 3 }
             activePage={ activePage }
             onSelect={ paginationHandleSelect } />
        }
      </div>
    )
  }
}

Result.PropTypes = {
  activePage: PropTypes.number.isRequired,
  paginationHandleSelect: PropTypes.func.isRequired,
  query: PropTypes.object.isRequired
}
