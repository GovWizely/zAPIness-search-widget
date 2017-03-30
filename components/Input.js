import React from 'react';
import { Field } from 'redux-form';
import { map, startCase } from 'lodash';

export const selectInput = ({ changeHandler, list, fieldName, name }) => (
  <Field
    name={fieldName}
    component="select"
    onChange={ changeHandler }
  >
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
