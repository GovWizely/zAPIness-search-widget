import React from 'react';
import { shallow } from 'enzyme';
import Fetcher from '../Fetcher';

describe('components/Fetcher', () => {
  const submitHandler = jest.fn();

  it('shows looking glass icon', () => {
    const wrapper = shallow(
      <Fetcher
        fetching={false}
        submitHandler={submitHandler}
        keyword="cool"
      />
    );

    expect(wrapper.containsMatchingElement(
      <div>
        <span>
          <img alt="Search" />
        </span>
      </div>
    ));

    wrapper.find('div').simulate('click');
    expect(submitHandler).toHaveBeenCalledTimes(1);
  });

  it('is disabled during form submission', () => {
    const wrapper = shallow(
      <Fetcher
        fetching
        submitHandler={submitHandler}
        keyword=""
      />
    );

    expect(wrapper.find('div').props().disabled).toBe(true);
  });
});
