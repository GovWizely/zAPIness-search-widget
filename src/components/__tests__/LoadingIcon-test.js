import React from 'react';
import { shallow } from 'enzyme';
import LoadingIcon from '../LoadingIcon';

describe('components/LoadingIcon', () => {
  it('renders successfully', () => {
    const loadingIcon = shallow(<LoadingIcon />);

    expect(loadingIcon.find('span').first().is('.__sw-loading-icon__'));
  });
});
