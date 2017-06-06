import React from 'react';
import { shallow } from 'enzyme';
import Drawer from '../Drawer';

describe('components/Drawer', () => {
  const results = {
    name: 'Harry Potter',
    author: 'J.K Rowling',
    year: '1996'
  };
  const toggleHandler = jest.fn();

  const wrapper = shallow(
    <Drawer
      cells={results}
      deviceType="desktop"
      id={1}
      label="Harry Potter"
      showDetails={false}
      toggleHandler={toggleHandler}
    />
  );

  it('renders successfully', () => {
    expect(wrapper.find('a').is('.__sw-data__')).toBe(true);
    expect(wrapper.contains(<div>Harry Potter</div>)).toBe(true);
  });

  it('shows details when click', () => {
    wrapper.simulate('click', { preventDefault() {} });
    expect(toggleHandler).toHaveBeenCalledTimes(1);
  });

  describe('In desktop view', () => {
    it('renders details correctly', () => {
      const showDetailsWrapper = shallow(
        <Drawer
          cells={results}
          deviceType="desktop"
          id={1}
          label="Harry Potter"
          showDetails
          toggleHandler={toggleHandler}
        />
      );

      expect(showDetailsWrapper.containsMatchingElement(
        <table>
          <tbody>
            <tr>
              <td><b>Name</b></td>
              <td>Harry Potter</td>
            </tr>
            <tr>
              <td><b>Author</b></td>
              <td>J.K Rowling</td>
            </tr>
            <tr>
              <td><b>Year</b></td>
              <td>1996</td>
            </tr>
          </tbody>
        </table>
      ));
    });
  });

  describe('In mobile view', () => {
    it('renders details correctly', () => {
      const showDetailsWrapper = shallow(
        <Drawer
          cells={results}
          deviceType="mobile"
          id={1}
          label="Harry Potter"
          showDetails
          toggleHandler={toggleHandler}
        />
      );

      expect(
        showDetailsWrapper.find('div.__sw-mobile-details__').exists()
      ).toBe(true);

      expect(showDetailsWrapper.containsMatchingElement(
        <div>
          <div>
            <div>
              <div><b>Name</b></div>
              <div>Harry Potter</div>
            </div>
            <div>
              <div><b>Author</b></div>
              <div>J.K Rowling</div>
            </div>
            <div>
              <div><b>Year</b></div>
              <div>1996</div>
            </div>
          </div>
        </div>
      ));
    });
  });
});
