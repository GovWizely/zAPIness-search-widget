import React from 'react'
import PropTypes from 'prop-types'
import Pagination from './Pagination'
import { paginationTotal, categories, totalCount, count } from '../actions/elasticsearch'

import Drawer from './Drawer'
import styles from '../stylesheets/styles'

const _ = require('lodash')
const Radium = require('radium')

const Result = props => (
  <div className="__sw-result__" style={styles.result.base}>
    { props.query.data.results.length === 0 &&
      <div className="__sw-no-result__" style={styles.result.noResult}>
        No result found. Please try again.
      </div>
    }
    {
      _.map(props.query.data.results, (result, index) => (
        <div key={index} className="__result-container__" style={styles.result.container}>
          <Drawer
            cells={result}
            label={_.keys(categories(props.query.data))[0]}
          />
        </div>
      ))
    }
    {
      props.query.data.results.length > 0 &&
      <div>
        <span style={styles.pagination.total}>
          { count(props.query.data) } of { totalCount(props.query.data) } results shown
        </span>
        <Pagination
          totalPage={paginationTotal(props.query.data, 10)}
          totalNumButton={3}
          activePage={props.activePage}
          onSelect={props.paginationHandleSelect}
        />
      </div>
    }
  </div>
)

Result.propTypes = {
  activePage: PropTypes.number.isRequired,
  paginationHandleSelect: PropTypes.func.isRequired,
  query: PropTypes.shape(
    { get: PropTypes.func,
      data: PropTypes.shape({
        results: PropTypes.arrayOf(PropTypes.shape({
          length: PropTypes.func
        }))
      })
    }
  ).isRequired
}

export default Radium(Result)
