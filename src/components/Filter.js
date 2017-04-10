import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'
import { Field } from 'redux-form'
import SelectInput from './SelectInput'

import * as QueryActions from '../actions/QueryActions'

const _ = require('lodash')

class Filter extends Component {
  getAvailableValues(index) {
    const target = this.props.query.get('filters')[index]

    return target.get('availableValues') || []
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
      ...rest
    } = this.props

    return (
      <div className="__sw-filter__">

        {
          fields.length === 0 &&
          <div>
            <button
              className="btn btn-default wide-btn"
              type="button"
              onClick={() => addFilter(fields)}
            >Add New Filter
            </button>
          </div>
        }

        { !_.isEmpty(query.get('error')) && <div className="__sw-error__">Value is required</div> }

        <ul>
          {fields.map((member, index) =>
            <li key={index}>
              <div className="list-container">
                <span>Filtered By:</span>
                <Field
                  name={`${member}.type`}
                  list={_.keys(query.get('categories'))}
                  changeHandler={data => selectFilterHandler(data, index)}
                  component={SelectInput}
                  fieldName={`${member}.type`}
                  {...rest}
                />
                <span>Value:</span>
                <Field
                  name={`${member}.value`}
                  list={this.getAvailableValues(index)}
                  changeHandler={data => selectFilterValueHandler(data, index)}
                  component={SelectInput}
                  fieldName={`${member}.value`}
                  {...rest}
                />
              </div>

              <div className="btn-container">
                <button
                  className="btn btn-default"
                  type="button"
                  onClick={() => addFilter(fields)}
                >
                  <span className="glyphicon glyphicon-plus" />
                </button>
                <button
                  className="btn btn-default"
                  type="button"
                  onClick={() => removeFilter(fields, index)}
                >
                  <span className="glyphicon glyphicon-trash" />
                </button>
              </div>
            </li>
          )}
        </ul>

        {
          fields.length > 0 &&
          <div className="action-btn">
            <button
              className="btn btn-default"
              type="button"
              onClick={() => removeAllFilters(fields)}
            >
              Remove All Filters
            </button>
            <button
              type="button"
              className="btn btn-default"
              onClick={() => submitHandler()}
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
      const selectedCategory = data.target.value
      dispatch(QueryActions.updateSelectedFilter(selectedCategory, index))
    },

    selectFilterValueHandler: (data, index) => {
      const selectedValue = data.target.value
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

    submitHandler: () => {
      dispatch(QueryActions.requestApi())
    }
  }
}

Filter.propTypes = {
  addFilter: PropTypes.func.isRequired,
  fields: PropTypes.shape({
    component: PropTypes.func
  }).isRequired,
  form: PropTypes.shape({}).isRequired,
  query: PropTypes.shape({
    get: PropTypes.func.isRequired
  }).isRequired,
  removeFilter: PropTypes.func.isRequired,
  removeAllFilters: PropTypes.func.isRequired,
  selectFilterHandler: PropTypes.func.isRequired,
  selectFilterValueHandler: PropTypes.func.isRequired,
  submitHandler: PropTypes.func.isRequired
}

export default connect(mapStateToProps, mapDispatchToProps)(Filter)
