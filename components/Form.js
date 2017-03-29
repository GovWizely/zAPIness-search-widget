import React, { Component } from 'react'
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { Field, reduxForm } from 'redux-form';

import * as QueryActions from '../actions/QueryActions'

class Form extends Component {
  render() {
    const {
      handleSubmit,
      reset,
      submitting,
      submitHandler
    } = this.props

    return(
      <form className='__sw-input__' onSubmit={(e) => e.preventDefault()}>
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
          <button type='button'
            className='btn btn-default __sw-advanced-search__'
          >
            <span className='glyphicon glyphicon-cog'></span>
            <span className='text'>Advanced Filters</span>
          </button>
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
      dispatch(QueryActions.requestApi(keyword))
    }
  }
}

const connected = connect(mapStateToProps, mapDispatchToProps)(Form)

export default reduxForm({
  form: 'form',
  fields: ['keyword']
}, state => ({
  initialValues: {}
}))(connected)
