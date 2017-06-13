import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import isUndefined from 'lodash/isUndefined';
import keys from 'lodash/keys';

import Form from '../components/Form';
import Result from '../components/Result';
import LoadingIcon from '../components/LoadingIcon';
import breakpoints from '../actions/breakpoints';

import {
  getPreviewMode,
  getSelectableFields,
  getResultLabel,
  getShowAll
} from '../actions/api';

import {
  requestApi,
  updatePageNum,
  updateFields,
  updateShowAll
} from '../actions/QueryActions';
import { getCategories } from '../actions/FilterActions';
import toggleResult from '../actions/ToggleActions';
import { categories } from '../actions/elasticsearch';

import styles from '../stylesheets/styles';

export class App extends Component {
  componentWillMount() {
    this.props.getCategories();
    this.props.updateFields();

    if (getPreviewMode()) {
      this.props.previewResult();
    }
  }

  render() {
    const {
      contentRect,
      filters,
      handleSelect,
      innerRef,
      isFetching,
      query,
      toggle,
      toggleResultHandler
    } = this.props;

    const result = query.get('data');

    const deviceType = breakpoints(contentRect.bounds.width);

    return (
      <div className="__sw-container__" style={styles.container}>
        <div style={{ width: '100%', padding: 0 }} ref={innerRef}>
          <Form
            deviceType={deviceType}
            filters={filters}
            isFetching={isFetching}
            onSubmit={() => {}}
            query={query}
          />

          {
            isFetching && <div style={{ padding: '0 50%' }}><LoadingIcon /></div>
          }
          {
            result && !isFetching &&
            <Result
              activePage={query.get('pageNum')}
              deviceType={deviceType}
              fields={query.get('fields')}
              label={getResultLabel() || keys(categories(result.data))[0]}
              paginationHandleSelect={handleSelect}
              query={result}
              showAll={query.get('showAll')}
              toggleHandler={toggleResultHandler}
              toggleStatus={{
                key: toggle.get('key'),
                show: toggle.get('show')
              }}
            />
          }
          {
            (!isUndefined(result) && result.length === 0) &&
            <div>No result found. Please try again.</div>
          }
        </div>
      </div>
    );
  }
}

function mapDispatchToProps(dispatch) {
  return {
    handleSelect: (eventKey) => {
      dispatch(updatePageNum(eventKey));
      dispatch(requestApi());
    },

    getCategories: () => {
      dispatch(getCategories());
    },

    updateFields: () => {
      const fields = getSelectableFields();
      const showAll = getShowAll();
      dispatch(updateFields(fields));
      dispatch(updateShowAll(showAll));
    },

    toggleResultHandler: (key) => {
      dispatch(toggleResult(key));
    },

    previewResult: () => {
      dispatch(requestApi()).then(() => {
        dispatch(toggleResult(0));
      });
    }
  };
}

function mapStateToProps(state) {
  return {
    query: state.query,
    toggle: state.toggle,
    isFetching: state.isFetching,
    filters: state.filters
  };
}

App.propTypes = {
  contentRect: PropTypes.shape({}).isRequired,
  filters: PropTypes.shape({}).isRequired,
  getCategories: PropTypes.func.isRequired,
  handleSelect: PropTypes.func.isRequired,
  innerRef: PropTypes.func.isRequired,
  isFetching: PropTypes.bool.isRequired,
  previewResult: PropTypes.func.isRequired,
  query: PropTypes.shape({
    get: PropTypes.func
  }).isRequired,
  toggle: PropTypes.shape({}).isRequired,
  toggleResultHandler: PropTypes.func.isRequired,
  updateFields: PropTypes.func.isRequired
};

export default connect(mapStateToProps, mapDispatchToProps)(App);
