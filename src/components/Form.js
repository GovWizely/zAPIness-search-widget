import React, { Component } from 'react'
import { connect } from 'react-redux';
import { Field, FieldArray, reduxForm } from 'redux-form';

import * as QueryActions from '../actions/QueryActions';
import validate from '../actions/validate'

import Filter from './Filter';

var _ = require('lodash');

class Form extends Component {
  constructor(props) {
    super(props);
    this.state = {
      showFilter: false
    };
  }

  toggleFilter() {
    this.setState({
      showFilter: !this.state.showFilter
    })
  }

  render() {
    const {
      submitHandler
    } = this.props

    return(
      <form className='__sw-input__' onSubmit={(e) => e.preventDefault() }>
        <div className='__input-wrapper__'>
          <Field
            name="keyword"
            component="input"
            type='text'
            className='__input__'
            placeholder='Search for keyword...'
            onChange={ _.debounce(submitHandler, 1000) }
          />
        </div>

        <button
          type='button'
          className='btn btn-default __sw-advanced-search__'
          onClick={ this.toggleFilter.bind(this) }
        >
          <span className='glyphicon glyphicon-cog'></span>
          <span className='text'>Advanced Filters</span>
        </button>

        {
          this.state.showFilter &&
          <FieldArray
            name="filters"
            component={ Filter }
          />
        }
      </form>
    )
  }
}

function mapStateToProps(state) {
  return {
    query: state.query
  }
}

function mapDispatchToProps(dispatch) {
  return {
    submitHandler: (data) => {
      let keyword = data.target.value

      dispatch(QueryActions.updateKeyword(keyword))
      dispatch(QueryActions.requestApi())
    }
  }
}

const connected = connect(mapStateToProps, mapDispatchToProps)(Form)

export default reduxForm({
  form: 'form',
  validate,
  fields: ['keyword', 'filters[].type', 'filters[].value']
}, state => ({
  initialValues: {}
}))(connected)
