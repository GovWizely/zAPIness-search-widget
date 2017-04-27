import React from 'react'
import PropTypes from 'prop-types'
import { Field } from 'redux-form'
import { map, startCase } from 'lodash'

const SelectInput = props => (
  <Field
    name={props.fieldName}
    component="select"
    onChange={props.changeHandler}
    style={props.styles}
  >
    <option>SELECT ONE</option>
    {
        map(props.list, (item, index) => (
          <option key={index} value={item} >
            { startCase(item) }
          </option>
        ))
      }
  </Field>
)

SelectInput.defaultProps = {
  styles: {}
}

SelectInput.propTypes = {
  fieldName: PropTypes.string.isRequired,
  changeHandler: PropTypes.func.isRequired,
  list: PropTypes.arrayOf(String).isRequired,
  styles: PropTypes.shape({})
}

export default SelectInput
