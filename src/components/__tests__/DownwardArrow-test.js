import React from 'react';
import { shallow } from 'enzyme';
import DownwardArrow from '../DownwardArrow';

describe('components/DownwardArrow', () => {
  it('renders successfully', () => {
    const arrow = shallow(
      <DownwardArrow
        arrowColor="red"
        backgroundColor="black"
      />
    );

    expect(arrow.find('.__sw-arrow__').exists()).toBe(true);
  });
});
