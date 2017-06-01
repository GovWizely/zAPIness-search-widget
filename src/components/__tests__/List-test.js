import React from 'react';
import { shallow } from 'enzyme';
import List from '../List';
import styles from '../../stylesheets/styles';

describe('components/List', () => {
  const clickHandler = jest.fn();
  const className = 'ok';
  const content = 'Lorem Ipsum';

  it('renders successfully', () => {
    const list = shallow(
      <List
        className={className}
        clickHandler={clickHandler}
      >
        {content}
      </List>
    );

    expect(list.containsMatchingElement(
      <li>
        <a href="undefined">Lorem Ipsum</a>
      </li>
    ));

    const props = list.props();

    expect(props.className).toBe(className);

    list.find('a').simulate('click');
    expect(clickHandler).toHaveBeenCalledTimes(1);
  });

  it('loads mobile styles in phone view', () => {
    const list = shallow(
      <List
        className={className}
        clickHandler={clickHandler}
        mobile={false}
      >
        {content}
      </List>
    );

    expect(list.find('a').props().style).toEqual(
      Object.assign({}, styles.list.base, styles.list.normal)
    );
  });
});
