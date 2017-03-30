import React, { Component } from 'react';
import { map, startCase, keys } from 'lodash';
import { connect } from 'react-redux';
import { Field } from 'redux-form';
import { selectInput } from './Input';

import * as QueryActions from '../actions/QueryActions';

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

  render() {
    const {
      addFilter,
      fields,
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
      <div>
        <button
          type='button'
          onClick={ () => addFilter(fields) }
        >Add Filters
        </button>

        <button type='button'
          onClick={ () =>  removeAllFilters(fields) }>
          Clear Values
        </button>
        <ul>
          {fields.map((member, index) =>
            <li key={index}>
              <span>Filtered By:</span>
              <Field
                name={`${member}.value`}
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
              <button
                type="button"
                onClick={() => removeFilter(fields, index) }>
                <span className='glyphicon glyphicon-remove'></span>
              </button>
            </li>
          )}
        </ul>

        {
          fields.length > 0 && <button type='button' onClick={ (data) => submitHandler(data) }>Submit</button>
        }
      </div>
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

    submitHandler: () => {
      dispatch(QueryActions.requestApi())
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Filter)
