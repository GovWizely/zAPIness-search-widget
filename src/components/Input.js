import React, { PropTypes } from 'react';
import { Field } from 'redux-form';
import { map, startCase } from 'lodash';

export const selectInput = ({ changeHandler, error, fieldName, list }) => (
  <Field
    name={fieldName}
    component="select"
    onChange={ changeHandler }
  >
  {error && <span>{error}</span>}
    <option>SELECT ONE</option>
    {
      map(list, (item, index) => (
        <option key={index} value={item} >
          { startCase(item) }
        </option>
      ))
    }
  </Field>
)

selectInput.PropTypes = {
  changeHandler: PropTypes.func.isRequired,
  error: PropTypes.string,
  fieldname: PropTypes.string.isRequired,
  list: PropTypes.array.isRequired
}
