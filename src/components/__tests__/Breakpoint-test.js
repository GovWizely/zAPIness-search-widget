import React from 'react';
import { shallow } from 'enzyme';
import Breakpoint, { breakpoints } from '../responsive/Breakpoint';

describe('components/Breakpoints', () => {
  it('returns desktop view by default', () => {
    const wrapper = shallow(<Breakpoint />);

    expect(wrapper.props().query).toBe(breakpoints.desktop);
  });

  it('returns tablet view', () => {
    const wrapper = shallow(<Breakpoint name="tablet" />);

    expect(wrapper.props().query).toBe(breakpoints.tablet);
  });

  it('returns phone view', () => {
    const wrapper = shallow(<Breakpoint name="phone" />);

    expect(wrapper.props().query).toBe(breakpoints.phone);
  });
});
