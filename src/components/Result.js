import React from 'react';
import PropTypes from 'prop-types';

import map from 'lodash/map';
import isEmpty from 'lodash/isEmpty';

import Pagination from './Pagination';
import {
  paginationTotal,
  totalCount,
  paginationEnd,
  paginationStart
} from '../actions/elasticsearch';
import {
  filterResult,
  getLabels
} from '../actions/QueryActions';

import Drawer from './Drawer';
import TotalResult from './TotalResult';
import styles from '../stylesheets/styles';

const Radium = require('radium');

const Result = (props) => {
  const {
    activePage,
    deviceType,
    fields,
    label,
    paginationHandleSelect,
    query,
    showAll,
    toggleHandler,
    toggleStatus
  } = props;

  const labels = getLabels(query.data.results, label);
  const results = filterResult(
    query.data.results,
    fields,
    showAll
  );

  const showPagination = query.data.results.length > 0
    && paginationTotal(query.data, 10) > 1;

  return (
    <div className="__sw-result__" style={styles.result.base}>
      { query.data.results.length === 0 &&
        <div className="__sw-no-result__" style={styles.result.noResult}>
          No result found. Please try again.
        </div>
      }
      {
        query.data.results.length > 0 &&
        <TotalResult
          end={paginationEnd(query.data)}
          start={paginationStart(query.data, activePage)}
          total={totalCount(query.data)}
        />
      }
      {
        map(results, (result, index) => (
          <div key={index} className="__result-container__" style={styles.result.container}>
            <Drawer
              cells={result}
              deviceType={deviceType}
              id={index}
              label={isEmpty(labels[index]) ? `No ${label}` : labels[index]}
              showDetails={
                index === toggleStatus.key && toggleStatus.show
              }
              toggleHandler={toggleHandler}
            />
          </div>
        ))
      }

      {
        showPagination &&
        <div style={{ width: '100%' }}>
          <Pagination
            activePage={activePage}
            deviceType={deviceType}
            onSelect={paginationHandleSelect}
            totalNumButton={3}
            totalPage={paginationTotal(query.data, 10)}
          />
        </div>
      }
    </div>
  );
};

Result.defaultProps = {
  deviceType: ''
};

Result.propTypes = {
  activePage: PropTypes.number.isRequired,
  deviceType: PropTypes.string,
  fields: PropTypes.arrayOf(PropTypes.string).isRequired,
  label: PropTypes.string.isRequired,
  paginationHandleSelect: PropTypes.func.isRequired,
  query: PropTypes.shape(
    { get: PropTypes.func,
      data: PropTypes.shape({
        results: PropTypes.arrayOf(PropTypes.shape({
          length: PropTypes.func
        }))
      })
    }
  ).isRequired,
  showAll: PropTypes.bool.isRequired,
  toggleHandler: PropTypes.func.isRequired,
  toggleStatus: PropTypes.shape({}).isRequired
};

export default Radium(Result);
