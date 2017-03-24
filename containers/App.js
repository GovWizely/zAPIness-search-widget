import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { Field, reduxForm } from 'redux-form';
import Form from '../components/Form';
import Result from '../components/Result';
import { Pagination } from 'react-bootstrap';
import { paginationTotal, categories } from '../actions/elasticsearch';
import * as QueryActions from '../actions/QueryActions';

class App extends Component {
  render() {
    const {
      query,
      handleSelect
    } = this.props

    return (
      <div className='container'>
        <div>
          <Form></Form>
          {
            this.props.query.data &&
            <Result
              query={this.props.query.data}
              paginationHandleSelect={handleSelect}
              activePage={query.pageNum}
            >
            </Result>
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
      dispatch(QueryActions.requestApi(eventKey));
    }
  };
}

function mapStateToProps(state) {
  return {
    query: state.query
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(App);
