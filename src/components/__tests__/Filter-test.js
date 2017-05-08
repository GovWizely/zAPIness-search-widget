import React from 'react';
import { shallow } from 'enzyme';

import { Filter } from '../Filter';

const { Map } = require('immutable');

describe('components/Filter', () => {
  const addFilter = jest.fn();
  const removeFilter = jest.fn();
  const removeAllFilters = jest.fn();
  const selectFilterHandler = jest.fn();
  const selectFilterValueHandler = jest.fn();
  const submitHandler = jest.fn();

  const filter = shallow(<Filter
    addFilter={addFilter}
    fields={[{}]}
    form={{}}
    filters={Map({
      filters: [
        Map({ type: '', value: '', availableValues: [1, 2, 3] })
      ],
      categories: [1, 2, 3]
    })}
    query={Map({
      errors: []
    })}
    removeFilter={removeFilter}
    removeAllFilters={removeAllFilters}
    selectFilterHandler={selectFilterHandler}
    selectFilterValueHandler={selectFilterValueHandler}
    submitHandler={submitHandler}
  />);

  it('renders successfully', () => {
    expect(filter.find('.__sw-filter__').length).toBe(1);
    expect(filter.find('.add-filter').length).toBe(1);

    filter.find('.add-filter').simulate('click');

    expect(filter.find('Button').length).toBe(4);
  });
});
