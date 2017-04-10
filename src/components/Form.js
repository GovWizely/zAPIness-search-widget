import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'
import { Field, FieldArray, reduxForm } from 'redux-form'

import * as QueryActions from '../actions/QueryActions'
import validate from '../actions/validate'

import Filter from './Filter'

const _ = require('lodash')

class Form extends Component {
  constructor(props) {
    super(props)
    this.state = {
      showFilter: false
    }
    this.toggleFilter = this.toggleFilter.bind(this)
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

    return (
      <form className="__sw-input__" onSubmit={e => e.preventDefault()}>
        <div className="__input-wrapper__">
          <Field
            name="keyword"
            component="input"
            type="text"
            className="__input__"
            placeholder="Search for keyword..."
            onChange={_.debounce(submitHandler, 1000)}
          />
        </div>

        <button
          type="button"
          className="btn btn-default __sw-advanced-search__"
          onClick={this.toggleFilter}
        >
          <span className="glyphicon glyphicon-cog" />
          <span className="text">Advanced Filters</span>
        </button>

        {
          this.state.showFilter &&
          <FieldArray
            name="filters"
            component={Filter}
          />
        }
      </form>
    )
  }
}

function mapStateToProps() {
  return {}
}

function mapDispatchToProps(dispatch) {
  return {
    submitHandler: (data) => {
      const keyword = data.target.value

      dispatch(QueryActions.updateKeyword(keyword))
      dispatch(QueryActions.requestApi())
    }
  }
}

Form.propTypes = {
  submitHandler: PropTypes.func.isRequired
}

const connected = connect(mapStateToProps, mapDispatchToProps)(Form)

export default reduxForm({
  form: 'form',
  validate,
  fields: ['keyword', 'filters[].type', 'filters[].value']
}, () => ({
  initialValues: {}
}))(connected)
