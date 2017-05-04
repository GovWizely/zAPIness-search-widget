import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'

import isUndefined from 'lodash/isUndefined'

import Form from '../components/Form'
import Result from '../components/Result'
import {
  updatePageNum,
  requestApi
} from '../actions/QueryActions'
import { getCategories } from '../actions/FilterActions'
import toggleResult from '../actions/ToggleActions'

import styles from '../stylesheets/styles'

export class App extends Component {
  componentWillMount() {
    this.props.getCategories()
  }

  render() {
    const {
      query,
      handleSelect,
      toggle,
      toggleResultHandler
    } = this.props

    const result = query.get('data')

    return (
      <div className="__sw-container__" style={styles.container}>
        <div className="container">
          <Form />
          {
            result &&
            <Result
              query={result}
              paginationHandleSelect={handleSelect}
              activePage={query.get('pageNum')}
              toggleHandler={toggleResultHandler}
              toggleStatus={{
                key: toggle.get('key'),
                show: toggle.get('show')
              }}
            />
          }
          {
            (!isUndefined(result) && result.length === 0) &&
            <div>No Result</div>
          }
        </div>
      </div>
    )
  }
}

function mapDispatchToProps(dispatch) {
  return {
    handleSelect: (eventKey) => {
      dispatch(updatePageNum(eventKey))
      dispatch(requestApi())
    },

    getCategories: () => {
      dispatch(getCategories())
    },

    toggleResultHandler: (key) => {
      dispatch(toggleResult(key))
    }
  }
}

function mapStateToProps(state) {
  return {
    query: state.query,
    toggle: state.toggle
  }
}

App.propTypes = {
  query: PropTypes.shape({
    get: PropTypes.func
  }).isRequired,
  toggle: PropTypes.shape({}).isRequired,
  handleSelect: PropTypes.func.isRequired,
  getCategories: PropTypes.func.isRequired,
  toggleResultHandler: PropTypes.func.isRequired
}

export default connect(mapStateToProps, mapDispatchToProps)(App)
