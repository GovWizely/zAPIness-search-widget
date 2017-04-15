import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'
import Form from '../components/Form'
import Result from '../components/Result'
import * as QueryActions from '../actions/QueryActions'
import styles from '../stylesheets/styles'

const _ = require('lodash')

export class App extends Component {
  componentWillMount() {
    this.props.getCategories()
  }

  render() {
    const {
      query,
      handleSelect
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
            />
          }
          {
            (!_.isUndefined(result) && result.length === 0) &&
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
      dispatch(QueryActions.updatePageNum(eventKey))
      dispatch(QueryActions.requestApi())
    },

    getCategories: () => {
      dispatch(QueryActions.getCategories())
    }
  }
}

function mapStateToProps(state) {
  return {
    query: state.query
  }
}

App.propTypes = {
  query: PropTypes.shape({
    get: PropTypes.func
  }).isRequired,
  handleSelect: PropTypes.func.isRequired,
  getCategories: PropTypes.func.isRequired
}

export default connect(mapStateToProps, mapDispatchToProps)(App)
