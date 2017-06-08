import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Field, formValueSelector } from 'redux-form';

import isEmpty from 'lodash/isEmpty';
import map from 'lodash/map';
import keys from 'lodash/keys';
import values from 'lodash/values';
import startCase from 'lodash/startCase';

import SelectInput from './SelectInput';
import Button from './Button';

import {
  clearError,
  requestApi,
  resetPageNum
} from '../actions/QueryActions';

import {
  addFilters,
  removeAllFilters,
  removeSelectedFilter
} from '../actions/FilterActions';

import styles from '../stylesheets/styles';

const trash = require('../trash.png');

const _ = require('lodash');

export class Filter extends Component {
  componentDidMount() {
    if (this.props.fields.length > 0) { return; }

    this.addDefaultFilter(this.props.fields);
  }

  componentWillReceiveProps(nextProps) {
    if (this.props.formFilters !== nextProps.formFilters) {
      map(this.props.formFilters, (filter, index) => {
        const currentFilter = nextProps.formFilters[index];
        if (currentFilter && currentFilter.type !== filter.type) {
          currentFilter.value = null;
        }

        return nextProps;
      });
    }
  }

  getAvailableValues(index) {
    if (!this.props.formFilters || !this.props.formFilters[index].type) {
      return [];
    }

    const target = this.props.formFilters[index].type.value || '';
    const categories = this.props.filters.get('categories');

    return categories ? categories[target] : [];
  }

  addDefaultFilter(fields) {
    const defaultFilter = this.props.filters.get('categories');
    const defaultType = keys(defaultFilter)[0];
    const defaultValue = values(defaultFilter)[0] ? values(defaultFilter)[0][0] : '';

    fields.push({
      type: { value: defaultType, label: startCase(defaultType) },
      value: { value: defaultValue, label: startCase(defaultValue) }
    });

    return fields;
  }

  render() {
    const {
      deviceType,
      fields,
      filters,
      form,
      formFilters,
      query,
      isFetching,
      removeAllFilters,
      removeFilter,
      submitHandler,
      ...rest
    } = this.props;

    const isDesktop = deviceType === 'desktop';
    console.log(formFilters[0]);

    return (
      <div className="__sw-filter__" style={styles.filter.container}>
        {
          isDesktop &&
          <div style={styles.filter.searchLabel} className="__sw-search-label__">
            <div style={{ marginBottom: '10px' }}>Filtered By:</div>
          </div>
        }

        { !isEmpty(query.get('error')) &&
          <div className="__sw-error__" style={styles.error}>Field/Value is required</div>
        }

        <ul style={styles.filter.ul}>
          {fields.map((member, index) =>
            <li key={`filter-${index + 1}`} style={styles.filter.li}>
              <div className="list-container" style={styles.filter.listContainer}>
                <div style={styles.filter.categoryType}>
                  { index === 0 && <div style={styles.filter.span}>Field:</div> }
                  <Field
                    name={`${member}.type`}
                    list={keys(filters.get('categories'))}
                    component={SelectInput}
                    className="select-type"
                    fieldName={`${member}.type`}
                    // styles={styles.filter.select}
                    {...rest}
                  />
                </div>
                <div style={styles.filter.categoryValue}>
                  { index === 0 && <div style={styles.filter.span}>Value:</div> }
                  <Field
                    name={`${member}.value`}
                    list={this.getAvailableValues(index)}
                    component={SelectInput}
                    fieldName={`${member}.value`}
                    disabled={!formFilters || !formFilters[index].type}
                    // styles={styles.filter.select}
                    {...rest}
                  />
                </div>

                <div className="btn-container" style={styles.filter.btnContainer}>
                  <Button
                    className="remove-filter"
                    clickHandler={() => removeFilter(fields, index)}
                    kind="sLink"
                    type="button"
                  >
                    { isDesktop && <span>Delete</span> }
                    { !isDesktop && <img src={trash} alt="Delete" style={styles.shallowImg} />}
                  </Button>
                </div>
              </div>
            </li>
          )}

          {
            isDesktop &&
            <li>
              <Button
                className="add-filter"
                clickHandler={() => this.addDefaultFilter(fields)}
                kind="sLink"
                type="button"
              >
                { fields.length === 0 ? 'Add New Filter' : 'Add Another Filter' }
              </Button>
            </li>
          }
        </ul>

        <div className="action-btn" style={isDesktop ? styles.filter.actionBtn : {}}>
          {
            !isDesktop &&
            <div>
              <Button
                className="add-filter"
                clickHandler={() => this.addDefaultFilter(fields)}
                kind="mobileSmall"
                type="button"
              >
                <span>Add New Filter</span>
              </Button>
            </div>
          }
          {
            isDesktop &&
            <span>
              {
                fields.length > 0 &&
                <Button
                  className="remove-all-filter"
                  clickHandler={() => removeAllFilters(fields)}
                  kind="desktopSmall"
                  type="button"
                >
                  Clear All
                </Button>
              }
            </span>
          }
          {
            fields.length > 0 &&
            <Button
              className={`${deviceType}Submit`}
              clickHandler={() => submitHandler(formFilters)}
              kind={`${deviceType}Submit`}
              type="button"
              submitting={isFetching}
            >
              Search
            </Button>
          }
        </div>
      </div>
    );
  }
}

const selector = formValueSelector('form');

function mapStateToProps(state) {
  return {
    formFilters: selector(state, 'filters') || [],
    query: state.query,
    form: state.form,
    filters: state.filters,
    isFetching: state.isFetching
  };
}

function mapDispatchToProps(dispatch) {
  return {
    removeFilter: (fields, index) => {
      dispatch(removeSelectedFilter(index));
      return fields.remove(index);
    },

    removeAllFilters: (fields) => {
      dispatch(removeAllFilters());
      dispatch(clearError());
      return fields.removeAll();
    },

    submitHandler: (formFilters) => {
      dispatch(addFilters(formFilters));
      dispatch(resetPageNum());
      dispatch(requestApi());
    }
  };
}

Filter.defaultProps = {
  form: undefined,
  deviceType: null,
  formFilters: undefined
};

Filter.propTypes = {
  deviceType: PropTypes.string,
  fields: PropTypes.oneOfType([
    PropTypes.shape({
      component: PropTypes.func
    }),
    PropTypes.arrayOf(PropTypes.shape({}))
  ]).isRequired,
  filters: PropTypes.shape({
    get: PropTypes.func.isRequired
  }).isRequired,
  formFilters: PropTypes.oneOfType([
    PropTypes.any,
    PropTypes.arrayOf(PropTypes.shape({}))
  ]),
  form: PropTypes.shape({}),
  isFetching: PropTypes.bool.isRequired,
  query: PropTypes.shape({
    get: PropTypes.func.isRequired
  }).isRequired,
  removeFilter: PropTypes.func.isRequired,
  removeAllFilters: PropTypes.func.isRequired,
  submitHandler: PropTypes.func.isRequired
};

export default connect(mapStateToProps, mapDispatchToProps)(Filter);
