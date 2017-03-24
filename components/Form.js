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
      <form>
        <div>
          <Field name="keyword" component="input" type='text' />
        </div>
        <div>
          <button type="submit"
            onClick={ handleSubmit(submitHandler) }
          >Submit</button>
        </div>
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
      let keyword = data.keyword

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
