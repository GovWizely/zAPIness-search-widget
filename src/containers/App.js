import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'

import isUndefined from 'lodash/isUndefined'
import keys from 'lodash/keys'

import Form from '../components/Form'
import Result from '../components/Result'

import {
  getPreviewMode,
  getSelectableFields,
  getResultLabel
} from '../actions/api'

import {
  requestApi,
  updatePageNum,
  updateFields
} from '../actions/QueryActions'
import { getCategories } from '../actions/FilterActions'
import toggleResult from '../actions/ToggleActions'
import { categories } from '../actions/elasticsearch'

import styles from '../stylesheets/styles'

export class App extends Component {
  componentWillMount() {
    this.props.getCategories()

    if (getPreviewMode()) {
      this.props.previewResult()
    }
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
              fields={query.get('fields')}
              label={getResultLabel() || keys(categories(result.data))[0]}
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
      dispatch(getCategories()).then((response) => {
        const selectableFields = getSelectableFields()

        const fields = keys(response.categories).concat(selectableFields)
        dispatch(updateFields(fields))
      })
    },

    toggleResultHandler: (key) => {
      dispatch(toggleResult(key))
    },

    previewResult: () => {
      dispatch(requestApi()).then(() => {
        dispatch(toggleResult(0))
      })
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
  toggleResultHandler: PropTypes.func.isRequired,
  previewResult: PropTypes.func.isRequired
}

export default connect(mapStateToProps, mapDispatchToProps)(App)
