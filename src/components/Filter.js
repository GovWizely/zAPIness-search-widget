import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import {
  Field,
  formValueSelector
} from 'redux-form';

import map from 'lodash/map';
import keys from 'lodash/keys';
import values from 'lodash/values';
import remove from 'lodash/remove';
import startCase from 'lodash/startCase';

import Select from './Select';
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

export class Filter extends Component {
  componentDidMount() {
    if (this.props.fields.length > 0) { return; }

    this.addDefaultFilter(this.props.fields);
  }

  componentWillReceiveProps(nextProps) {
    if (this.props.formFilters !== nextProps.formFilters) {
      // empty the value of filter if the type has changed
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

    const target = this.props.formFilters[index].type || '';
    const categories = this.props.filters.get('categories');

    return categories ? categories[target] : [];
  }

  addDefaultFilter(fields) {
    const defaultFilter = this.props.filters.get('categories');
    const defaultType = keys(defaultFilter)[0];
    const defaultValue = values(defaultFilter)[0] ? values(defaultFilter)[0][0] : '';

    return fields.push({ type: defaultType, value: defaultValue });
  }

  render() {
    const {
      deviceType,
      fields,
      filters,
      formFilters,
      isFetching,
      removeAllFilters,
      removeFilter,
      showSearchBar,
      submitHandler
    } = this.props;

    const isDesktop = deviceType === 'desktop';

    return (
      <div className="__sw-filter__">
        {
          !showSearchBar &&
          <div style={styles.filter.searchLabel}>
            Filter By:
          </div>
        }
        <div
          style={styles.filter[`${deviceType}Container`]}
        >
          <ul style={styles.filter.ul}>
            {fields.map((member, index) =>
              <li key={`filter-${index + 1}`} style={styles.filter.li}>
                <div className="list-container" style={styles.filter.listContainer}>
                  <div style={styles.filter[`${deviceType}CategoryType`]}>
                    <Field
                      additionalInputStyle={{
                        borderTopRightRadius: 0,
                        borderBottomRightRadius: 0,
                        borderTopLeftRadius: 3,
                        borderBottomLeftRadius: 3
                      }}
                      className={`${deviceType}SelectType`}
                      clearable={false}
                      component={Select}
                      dropdownOnly
                      id={`type-${index}`}
                      list={keys(filters.get('categories'))}
                      name={`${member}.type`}
                    />
                  </div>
                  <div style={styles.filter[`${deviceType}CategoryValue`]}>
                    <Field
                      additionalInputStyle={{
                        borderTopRightRadius: 3,
                        borderBottomRightRadius: 3,
                        borderTopLeftRadius: 0,
                        borderBottomLeftRadius: 0,
                        boxShadow: 'inset 0 1px 2px rgba(27,31,35,0.075)'
                      }}
                      allowFormatted={false}
                      className={`${deviceType}SelectValue`}
                      clearable={isDesktop}
                      component={Select}
                      disabled={!formFilters || !formFilters[index].type}
                      id={`value-${index}`}
                      list={this.getAvailableValues(index)}
                      name={`${member}.value`}
                      placeholder={formFilters[index].type ? `Filter By ${startCase(formFilters[index].type)}...` : 'Select as you type'}
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
              <li style={fields.length === 0 ? {} : { marginTop: '10px', position: 'relative' }}>
                <Button
                  className="add-filter"
                  clickHandler={() => this.addDefaultFilter(fields)}
                  kind={fields.length === 0 ? 'desktopSubmit' : 'sLink'}
                  type="button"
                >
                  { fields.length === 0 ? 'Add New Filter' : 'Add Another Filter' }
                </Button>

                {
                  fields.length > 0 &&
                  <span>
                    |
                    <Button
                      className="remove-all-filter"
                      clickHandler={() => removeAllFilters(fields)}
                      kind="sLink"
                      type="button"
                    >
                      Clear All Filters
                    </Button>
                  </span>
                }

                {
                  !showSearchBar && fields.length > 0 &&
                  <div style={styles.filter.filterableOnlySubmit}>
                    <Button
                      className="desktopSubmit"
                      clickHandler={() => submitHandler(formFilters, fields)}
                      kind="desktopSubmit"
                      type="button"
                      submitting={isFetching}
                    >
                      Search
                    </Button>
                  </div>
                }
              </li>
            }
          </ul>

          {
            !isDesktop &&
            <div className="actionBtn" style={styles.filter.actionBtn}>
              <Button
                className="add-filter"
                clickHandler={() => this.addDefaultFilter(fields)}
                kind="mobileSmall"
                type="button"
              >
                <span>Add New Filter</span>
              </Button>

              {
                fields.length > 0 &&
                <Button
                  className="mobileSubmit"
                  clickHandler={() => submitHandler(formFilters, fields)}
                  kind="mobileSubmit"
                  type="button"
                  submitting={isFetching}
                >
                  Search
                </Button>
              }
            </div>
          }
        </div>

        {
          isDesktop && showSearchBar && fields.length > 0 &&
          <div style={{ textAlign: 'right' }}>
            <Button
              className="desktopSubmit"
              clickHandler={() => submitHandler(formFilters, fields)}
              kind="desktopSubmit"
              type="button"
              submitting={isFetching}
            >
              Search
            </Button>
          </div>
        }
      </div>
    );
  }
}

const selector = formValueSelector('form');

function mapStateToProps(state) {
  return {
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

    removeAllFilters: (fields) => {
      dispatch(removeAllFilters());
      dispatch(clearError());

      return fields.removeAll();
    },

    submitHandler: (formFilters) => {
      dispatch(addFilters(formFilters));
      dispatch(resetPageNum());
      // Remove invalid filters
      remove(formFilters, filter => !filter.type || !filter.value);
      dispatch(requestApi());
    }
  };
}

Filter.defaultProps = {
  form: undefined,
  deviceType: undefined,
  formFilters: undefined,
  showSearchBar: true
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
  isFetching: PropTypes.bool.isRequired,
  removeFilter: PropTypes.func.isRequired,
  removeAllFilters: PropTypes.func.isRequired,
  showSearchBar: PropTypes.bool,
  submitHandler: PropTypes.func.isRequired
};

export default connect(mapStateToProps, mapDispatchToProps)(Filter);
