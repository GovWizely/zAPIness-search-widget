import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import {
  Field,
  formValueSelector,
  getFormSyncErrors,
  isDirty
} from 'redux-form';

import map from 'lodash/map';
import keys from 'lodash/keys';
import values from 'lodash/values';
import startCase from 'lodash/startCase';

import SelectInput from './SelectInput';
import Button from './Button';
import { required } from '../actions/validate';

import {
  clearError,
  requestApi,
  resetPageNum,
  setFilterRequired
} from '../actions/QueryActions';

import {
  addFilters,
  removeAllFilters,
  removeSelectedFilter
} from '../actions/FilterActions';

import {
  filterError
} from '../constants/Errors';

import styles from '../stylesheets/styles';

const trash = require('../trash.png');

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
      error,
      fields,
      filters,
      form,
      formFilters,
      isFetching,
      removeAllFilters,
      removeFilter,
      submitHandler,
      touched
    } = this.props;

    const isDesktop = deviceType === 'desktop';
    const hasError = formFilters.length > 0 && touched && error;

    return (
      <div className="__sw-filter__" style={styles.filter[`${deviceType}Container`]}>
        {
          isDesktop &&
          <div style={styles.filter.searchLabel} className="__sw-search-label__">
            <div style={{ marginBottom: '10px' }}>Filtered By:</div>
          </div>
        }

        {
          hasError &&
          <div className="__sw-filter-error__" style={styles.errorMessage}>
            {filterError}
          </div>
        }

        <ul style={styles.filter.ul}>
          <li style={styles.filter.label}>
            <div style={styles.filter[`${deviceType}CategoryType`]}>Field:</div>
            <div style={styles.filter[`${deviceType}CategoryValue`]}>Value:</div>
          </li>
          {fields.map((member, index) =>
            <li key={`filter-${index + 1}`} style={styles.filter.li}>
              <div className="list-container" style={styles.filter.listContainer}>
                <div style={styles.filter[`${deviceType}CategoryType`]}>
                  <Field
                    name={`${member}.type`}
                    list={keys(filters.get('categories'))}
                    component={SelectInput}
                    className="select-type"
                    clearable={isDesktop}
                    validate={required}
                  />
                </div>
                <div style={styles.filter[`${deviceType}CategoryValue`]}>
                  <Field
                    name={`${member}.value`}
                    list={this.getAvailableValues(index)}
                    component={SelectInput}
                    disabled={!formFilters || !formFilters[index].type}
                    clearable={isDesktop}
                    validate={required}
                  />
                </div>

                <div className="btn-container" style={styles.filter[`${deviceType}BtnContainer`]}>
                  <Button
                    className="remove-filter"
                    clickHandler={() => removeFilter(fields, index)}
                    kind={`${deviceType}DeleteLink`}
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
                  clickHandler={() => removeAllFilters(fields, form)}
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
const getSyncErrors = getFormSyncErrors('form');
const formIsTouched = isDirty('form');

function mapStateToProps(state) {
  return {
    error: getSyncErrors(state),
    touched: formIsTouched(state),
    formFilters: selector(state, 'filters') || [],
    form: state.form,
    query: state.query,
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

    removeAllFilters: (fields, form) => {
      dispatch(removeAllFilters());
      dispatch(clearError());

      return fields.removeAll();
    },

    submitHandler: (formFilters) => {
      dispatch(setFilterRequired());

      dispatch(addFilters(formFilters));
      dispatch(resetPageNum());
      dispatch(requestApi());
    }
  };
}

Filter.defaultProps = {
  form: undefined,
  deviceType: undefined,
  error: undefined,
  formFilters: undefined,
  touched: false
};

Filter.propTypes = {
  deviceType: PropTypes.string,
  error: PropTypes.shape({}),
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
  isFetching: PropTypes.bool.isRequired,
  removeFilter: PropTypes.func.isRequired,
  removeAllFilters: PropTypes.func.isRequired,
  submitHandler: PropTypes.func.isRequired,
  touched: PropTypes.bool
};

export default connect(mapStateToProps, mapDispatchToProps)(Filter);
