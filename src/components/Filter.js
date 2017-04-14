import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'
import { Field } from 'redux-form'
import SelectInput from './SelectInput'
import Button from './Button'

import * as QueryActions from '../actions/QueryActions'
import styles from '../stylesheets/styles'

const plus = require('../plus.png')
const trash = require('../trash.png')

const _ = require('lodash')

export class Filter extends Component {
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

    debugger

    return (
      <div className="__sw-filter__" style={styles.filter.container}>

        {
          fields.length === 0 &&
          <Button
            className="add-filter"
            clickHandler={() => addFilter(fields)}
            kind="wide"
            type="button"
          >
            Add New Filter
          </Button>
        }


        { !_.isEmpty(query.get('error')) &&
          <div className="__sw-error__" style={styles.error}>Field/Value is required</div>
        }
        <ul style={styles.filter.ul}>
          {fields.map((member, index) =>
            <li key={index} style={styles.filter.li}>
              <div className="list-container" style={styles.filter.listContainer}>
                <span style={styles.filter.span}>Filtered By:</span>
                <Field
                  name={`${member}.type`}
                  list={_.keys(query.get('categories'))}
                  changeHandler={data => selectFilterHandler(data, index)}
                  component={SelectInput}
                  className="select-type"
                  fieldName={`${member}.type`}
                  styles={styles.filter.select}
                  {...rest}
                />
                <span style={styles.filter.span}>Value:</span>
                <Field
                  name={`${member}.value`}
                  list={this.getAvailableValues(index)}
                  changeHandler={data => selectFilterValueHandler(data, index)}
                  component={SelectInput}
                  fieldName={`${member}.value`}
                  styles={styles.filter.select}
                  {...rest}
                />
                <div className="btn-container" style={styles.filter.btnContainer}>
                  <Button
                    className="add-filter"
                    clickHandler={() => addFilter(fields)}
                    kind="small"
                    type="button"
                  >
                    <span><img src={plus} alt="Add" style={styles.img} /></span>
                  </Button>

                  <Button
                    className="remove-filter"
                    clickHandler={() => removeFilter(fields, index)}
                    kind="small"
                    type="button"
                  >
                    <span><img src={trash} alt="Delete" style={styles.img} /></span>
                  </Button>
                </div>
              </div>
            </li>
          )}
        </ul>

        {
          fields.length > 0 &&
          <div className="action-btn" style={styles.filter.actionBtn}>
            <Button
              className="remove-all-filter"
              clickHandler={() => removeAllFilters(fields)}
              kind="small"
              type="button"
            >
              Remove All Filters
            </Button>
            <Button
              className="submit"
              clickHandler={() => submitHandler()}
              kind="small"
              type="button"
            >
              Submit
            </Button>
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
