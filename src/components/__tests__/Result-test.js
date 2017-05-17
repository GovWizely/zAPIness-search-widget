import React from 'react';
import { shallow } from 'enzyme';
import Result from '../Result';

describe('components/Result', () => {
  const activePage = 1;
  const paginationHandleSelect = jest.fn();
  const toggleHandler = jest.fn();
  const query = {
    get: jest.fn(),
    data: {
      metadata: {
        total: 3
      },
      aggregations: { type: 1 },
      results: [
        { address: 'Boston' },
        { address: 'Seattle' },
        { address: 'New York' }
      ]
    }
  };

  it('renders successfully', () => {
    const result = shallow(
      <Result
        query={query}
        fields={['address']}
        showAll={false}
        label={'address'}
        paginationHandleSelect={paginationHandleSelect}
        activePage={activePage}
        toggleHandler={toggleHandler}
        toggleStatus={{
          key: 1,
          show: false
        }}
      />
    );

    expect(result.find('div.__sw-result__').length).toBe(1);
    expect(result.find('Pagination').length).toBe(1);
    expect(result.find('Drawer').length).toBe(3);

    result.find('Drawer').forEach((node, index) => {
      expect(node.props().cells).toEqual(query.data.results[index]);
      expect(node.props().label).toEqual(query.data.results[index].address);
    });
  });

  it('renders no result message if result is empty', () => {
    const result = shallow(
      <Result
        activePage={activePage}
        paginationHandleSelect={paginationHandleSelect}
        label={'address'}
        showAl={false}
        fields={['address']}
        toggleHandler={toggleHandler}
        toggleStatus={{}}
        query={{
          get: jest.fn(),
          data: {
            metadata: {
              total: 0
            },
            results: []
          }
        }}
      />
    );

    expect(result.find('div.__sw-no-result__').length).toBe(1);
    expect(result.find('Pagination').length).toBe(0);
  });
});
