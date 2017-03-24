import React, { Component } from 'react';
import { Pagination } from 'react-bootstrap';
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
      <div className='__sw_result__'>
        {
          _.map(query.data.results, (result, index) => (
            <div key={index}>
              <Drawer cells={result} label={label}></Drawer>
            </div>
          ))
        }

        <Pagination
         prev
         next
         first
         last
         ellipsis
         boundaryLinks
         items={paginationTotal(query.data, 10)}
         maxButtons={3}
         activePage={activePage}
         onSelect={paginationHandleSelect} />
      </div>
    )
  }
}
