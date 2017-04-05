import React, { Component } from 'react';
import { connect } from 'react-redux';
import Form from '../components/Form';
import Result from '../components/Result';
import * as QueryActions from '../actions/QueryActions';

var _ = require('lodash');

class App extends Component {
  constructor(props) {
    super(props)
  }

  componentWillMount() {
    this.props.getCategories();
  }

  render() {
    const {
      query,
      handleSelect
    } = this.props

    const result = query.get('data')

    return (
      <div className='__sw-container__'>
        <div className='container'>
          <Form></Form>
          {
            result &&
            <Result
              query={result}
              paginationHandleSelect={handleSelect}
              activePage={query.get('pageNum')}
            >
            </Result>
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

function mapDispatchToProps(dispatch, ownProps) {
  return {
    handleSelect: (eventKey) => {
      dispatch(QueryActions.updatePageNum(eventKey));
      dispatch(QueryActions.requestApi());
    },

    getCategories: () => {
      dispatch(QueryActions.getCategories());
    }
  };
}

function mapStateToProps(state) {
  return {
    query: state.query
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(App);
