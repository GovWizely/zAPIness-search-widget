import React, { PropTypes } from 'react'
import { Field } from 'redux-form'
import { map, startCase } from 'lodash'

const SelectInput = props => (
  <Field
    name={props.fieldName}
    component="select"
    onChange={props.changeHandler}
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

SelectInput.propTypes = {
  fieldName: PropTypes.string.isRequired,
  changeHandler: PropTypes.func.isRequired,
  list: PropTypes.arrayOf(String).isRequired
}

export default SelectInput
