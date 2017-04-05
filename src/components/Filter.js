import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Field } from 'redux-form';
import { selectInput } from './Input';

import * as QueryActions from '../actions/QueryActions';

var _ = require('lodash');

class Filter extends Component {
  constructor(props) {
    super(props)
    this.state = {
      filterValues: []
    }
  }

  getAvailableValues(index) {
    let target = this.props.query.get('filters')[index]

    return target.get('availableValues') || []
  }

  renderErrors(errors) {
    return(
      <div className='__sw-error__'>Value is required</div>
    )
  }

  render() {
    const {
      addFilter,
      fields,
      form,
      query,
      removeFilter,
      removeAllFilters,
      selectFilterHandler,
      selectFilterValueHandler,
      submitHandler,
      handleSubmit,
      ...rest
    } = this.props


    return(
      <div className='__sw-filter__'>
      {form.syncErrors && <li className="error">{form.syncErrors}</li>}

      {
        fields.length === 0 &&
        <div>
          <button
            className='btn btn-default wide-btn'
            type='button'
            onClick={ () => addFilter(fields) }
          >Add New Filter
          </button>
        </div>
      }

      { !_.isEmpty(query.get('error')) && this.renderErrors(query.get('error')) }

        <ul>
          {fields.map((member, index) =>
            <li key={index}>
              <div className='list-container'>
              <span>Filtered By:</span>
              <Field
                name={`${member}.type`}
                list={ _.keys(query.get('categories')) }
                changeHandler={(data) => selectFilterHandler(data, index)}
                component={selectInput}
                fieldName={`${member}.type`}
                {...rest}
              />
              <span>Value:</span>
              <Field
                name={`${member}.value`}
                list={this.getAvailableValues(index)}
                changeHandler={(data) => selectFilterValueHandler(data, index)}
                component={selectInput}
                fieldName={`${member}.value`}
                {...rest}
              />
              </div>

              <div className='btn-container'>
              <button
                className='btn btn-default'
                type="button"
                onClick={() => addFilter(fields) }>
                <span className='glyphicon glyphicon-plus'></span>
              </button>
              <button
                className='btn btn-default'
                type="button"
                onClick={() => removeFilter(fields, index) }>
                <span className='glyphicon glyphicon-trash'></span>
              </button>
              </div>
            </li>
          )}
        </ul>

        {
          fields.length > 0 &&
          <div className='action-btn'>
            <button
              className='btn btn-default'
              type='button'
              onClick={ () =>  removeAllFilters(fields) }>
              Remove All Filters
            </button>
            <button
              type='button'
              className='btn btn-default'
              onClick={ () => submitHandler() }
            >
              Submit
            </button>
          </div>
        }
      </div>
    )
  }
}

function mapStateToProps(state) {
  return {
    query: state.query,
    form: state.form
  }
}

function mapDispatchToProps(dispatch) {
  return {
    selectFilterHandler: (data, index) => {
      let selectedCategory = data.target.value
      dispatch(QueryActions.updateSelectedFilter(selectedCategory, index))
    },

    selectFilterValueHandler: (data, index) => {
      let selectedValue = data.target.value
      dispatch(QueryActions.updateSelectedValue(selectedValue, index))
    },

    addFilter: (fields) => {
      dispatch(QueryActions.addFilter())
      return fields.push({})
    },

    removeFilter: (fields, index) => {
      dispatch(QueryActions.removeSelectedFilter(index))
      return fields.remove(index)
    },

    removeAllFilters: (fields) => {
      dispatch(QueryActions.removeAllFilters())
      return fields.removeAll()
    },

    submitHandler: (fields, form) => {
      dispatch(QueryActions.requestApi())
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Filter)
