import React from 'react';
import { shallow } from 'enzyme';
import Fetcher from '../Fetcher';

describe('components/Fetcher', () => {
  const submitHandler = jest.fn();

  it('shows loading icon during data fetching', () => {
    const wrapper = shallow(
      <Fetcher
        fetching
        submitHandler={submitHandler}
      />
    );

    expect(wrapper.containsMatchingElement(
      <div>
        <span>
          <img alt="Loading" />
        </span>
      </div>
    ));

    wrapper.find('div').simulate('click');
    expect(submitHandler).toHaveBeenCalledTimes(0);
  });

  it('shows looking glass icon at all times except fetching data', () => {
    const wrapper = shallow(
      <Fetcher
        fetching={false}
        submitHandler={submitHandler}
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
});
