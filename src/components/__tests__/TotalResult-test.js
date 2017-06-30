import React from 'react';
import { shallow } from 'enzyme';
import TotalResult from '../TotalResult';

describe('components/TotalResult', () => {
  it('renders successfully', () => {
    const result = shallow(
      <TotalResult
        start={60}
        end={88}
        total={10000}
      />
    );

    expect(result.find('div.__sw-total-result__').exists()).toBe(true);
    expect(result.find('div').text()).toEqual(
      '60 - 88 of 10000 results shown'
    );
  });
});
