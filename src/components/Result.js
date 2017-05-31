import React from 'react';
import PropTypes from 'prop-types';

import map from 'lodash/map';

import Pagination from './Pagination';
import {
  count,
  paginationTotal,
  totalCount
} from '../actions/elasticsearch';
import {
  filterResult,
  getLabels
} from '../actions/QueryActions';

import Drawer from './Drawer';
import DesktopView from './responsive/DesktopView';
import styles from '../stylesheets/styles';

const Radium = require('radium');

const Result = (props) => {
  const labels = getLabels(props.query.data.results, props.label);
  const results = filterResult(
    props.query.data.results,
    props.fields,
    props.showAll
  );

  const showPagination = props.query.data.results.length > 0
    && paginationTotal(props.query.data, 10) > 1;

  return (
    <div className="__sw-result__" style={styles.result.base}>
      { props.query.data.results.length === 0 &&
        <div className="__sw-no-result__" style={styles.result.noResult}>
          No result found. Please try again.
        </div>
      }
      <DesktopView>
        {
          props.query.data.results.length > 0 &&
          <div style={styles.pagination.total} className="__sw-total-result__">
            { count(props.query.data) } of { totalCount(props.query.data) } results shown
          </div>
        }
      </DesktopView>
      {
        map(results, (result, index) => (
          <div key={index} className="__result-container__" style={styles.result.container}>
            <Drawer
              cells={result}
              label={labels[index]}
              id={index}
              toggleHandler={props.toggleHandler}
              showDetails={
                index === props.toggleStatus.key && props.toggleStatus.show
              }
            />
          </div>
        ))
      }

      {
        showPagination &&
        <div style={{ width: '100%' }}>
          <Pagination
            totalPage={paginationTotal(props.query.data, 10)}
            totalNumButton={3}
            activePage={props.activePage}
            onSelect={props.paginationHandleSelect}
          />
        </div>
      }
    </div>
  );
};

Result.propTypes = {
  activePage: PropTypes.number.isRequired,
  label: PropTypes.string.isRequired,
  paginationHandleSelect: PropTypes.func.isRequired,
  toggleHandler: PropTypes.func.isRequired,
  showAll: PropTypes.bool.isRequired,
  toggleStatus: PropTypes.shape({}).isRequired,
  fields: PropTypes.arrayOf(PropTypes.string).isRequired,
  query: PropTypes.shape(
    { get: PropTypes.func,
      data: PropTypes.shape({
        results: PropTypes.arrayOf(PropTypes.shape({
          length: PropTypes.func
        }))
      })
    }
  ).isRequired
};

export default Radium(Result);
