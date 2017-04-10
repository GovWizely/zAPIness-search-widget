import React, { PropTypes } from 'react'
import Pagination from './Pagination'
import { paginationTotal, categories } from '../actions/elasticsearch'

import Drawer from './Drawer'

const _ = require('lodash')

const Result = props => (
  <div className="__sw-result__">
    { props.query.data.results.length === 0 &&
      <div className="__sw-no-result__">
        No result found. Please try again.
      </div>
    }
    {
      _.map(props.query.data.results, (result, index) => (
        <div key={index} className="__result-container__">
          <Drawer
            cells={result}
            label={_.keys(categories(props.query.data))[0]}
          />
        </div>
      ))
    }
    {
      props.query.data.results.length > 0 &&
      <Pagination
        totalPage={paginationTotal(props.query.data, 10)}
        totalNumButton={3}
        activePage={props.activePage}
        onSelect={props.paginationHandleSelect}
      />
    }
  </div>
)

Result.propTypes = {
  activePage: PropTypes.number.isRequired,
  paginationHandleSelect: PropTypes.func.isRequired,
  query: PropTypes.shape(
    { get: PropTypes.func,
      data: PropTypes.shape({
        results: PropTypes.shape({
          length: PropTypes.func
        })
      })
    }
  ).isRequired
}
