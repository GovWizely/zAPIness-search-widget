import React from 'react';
import { shallow } from 'enzyme';

import Pagination from '../Pagination';

describe('components/Pagination', () => {
  const totalPage = 5;
  const totalNumButton = 3;
  const activePage = 2;
  const onSelect = jest.fn();
  const deviceType = 'desktop';

  it('renders successfully', () => {
    const pagination = shallow(
      <Pagination
        activePage={activePage}
        deviceType={deviceType}
        onSelect={onSelect}
        totalNumButton={totalNumButton}
        totalPage={totalPage}
      />
    );

    expect(pagination.containsMatchingElement(
      <div>
        <ul>
          <li><a>« First</a></li>
          <li><a>« Prev</a></li>
          <li><a>1</a></li>
          <li><a className="active">2</a></li>
          <li><a>3</a></li>
          <li><a>...</a></li>
          <li><a>5</a></li>
          <li><a>Next ›</a></li>
          <li><a>Last »</a></li>
        </ul>
      </div>
    ));
  });

  it('does not show prev button if current page is the first page', () => {
    const pagination = shallow(
      <Pagination
        activePage={1}
        deviceType={deviceType}
        onSelect={onSelect}
        totalNumButton={3}
        totalPage={5}
      />
    );

    expect(pagination.containsMatchingElement(
      <div>
        <ul>
          <li><a>« First</a></li>
          <li><a className="active">1</a></li>
          <li><a>2</a></li>
          <li><a>...</a></li>
          <li><a>5</a></li>
          <li><a>Next ›</a></li>
          <li><a>Last »</a></li>
        </ul>
      </div>
    ));
  });

  it('does not show next button if current page is last page', () => {
    const pagination = shallow(
      <Pagination
        activePage={5}
        onSelect={onSelect}
        deviceType={deviceType}
        totalNumButton={3}
        totalPage={5}
      />
    );

    expect(pagination.containsMatchingElement(
      <div>
        <ul>
          <li><a>« First</a></li>
          <li><a>‹ Prev</a></li>
          <li><a>1</a></li>
          <li><a>...</a></li>
          <li><a>3</a></li>
          <li><a>4</a></li>
          <li><a className="active">5</a></li>
          <li><a>Last »</a></li>
        </ul>
      </div>
    ));
  });

  describe('In desktop view', () => {
    it('renders desktopPagination', () => {
      const pagination = shallow(
        <Pagination
          activePage={5}
          onSelect={onSelect}
          deviceType={deviceType}
          totalNumButton={3}
          totalPage={5}
        />
      );

      expect(pagination.find('ul.desktopPagination').exists()).toBe(true);
    });
  });

  describe('In mobile view', () => {
    it('renders mobilePagination', () => {
      const pagination = shallow(
        <Pagination
          activePage={2}
          onSelect={onSelect}
          deviceType="mobile"
          totalNumButton={3}
          totalPage={5}
        />
      );
      expect(pagination.find('ul.mobilePagination').exists()).toBe(true);

      expect(pagination.containsMatchingElement(
        <div>
          <ul>
            <a><li>‹</li></a>
            <a><li>2 of 5</li></a>
            <a><li>›</li></a>
          </ul>
        </div>
      ));
    });
  });
});
