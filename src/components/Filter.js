import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Field } from 'redux-form';

import isEmpty from 'lodash/isEmpty';
import keys from 'lodash/keys';
import assignIn from 'lodash/assignIn';
import SelectInput from './SelectInput';

import Button from './Button';
import DesktopView from './responsive/DesktopView';
import PhoneView from './responsive/PhoneView';

import {
  clearError,
  requestApi
} from '../actions/QueryActions';

import {
  addFilter,
  updateSelectedValue,
  updateSelectedFilter,
  removeAllFilters,
  removeSelectedFilter
} from '../actions/FilterActions';

import styles from '../stylesheets/styles';

export class Filter extends Component {
  componentDidMount() {
    if (this.props.fields.length > 0) { return; }

    this.props.addFilter(this.props.fields);
  }

  getAvailableValues(index) {
    const target = this.props.filters.get('filters')[index];

    return target.get('availableValues') || [];
  }

  render() {
    const {
      fields,
      filters,
      form,
      query,
      addFilter,
      removeAllFilters,
      removeFilter,
      selectFilterHandler,
      selectFilterValueHandler,
      submitHandler,
      ...rest
    } = this.props;

    return (
      <div className="__sw-filter__" style={styles.filter.container}>
        <DesktopView>
          <div style={styles.filter.searchLabel}>
            <div style={{ marginBottom: '10px' }}>Filtered By:</div>
            {
                fields.length === 0 &&
                  <Button
                    className="add-filter"
                    clickHandler={() => addFilter(fields)}
                    kind="smallBlock"
                    type="button"
                  >
                    Add New Condition
                  </Button>
              }
          </div>
        </DesktopView>

        { !isEmpty(query.get('error')) &&
          <div className="__sw-error__" style={styles.error}>Field/Value is required</div>
        }

        <ul style={styles.filter.ul}>
          {fields.map((member, index) =>
            <li key={`filter-${index + 1}`} style={styles.filter.li}>
              <div className="list-container" style={styles.filter.listContainer}>
                <div style={styles.filter.category}>
                  <div style={styles.filter.span}>Field:</div>
                  <Field
                    name={`${member}.type`}
                    list={keys(filters.get('categories'))}
                    changeHandler={data => selectFilterHandler(data, index)}
                    component={SelectInput}
                    className="select-type"
                    fieldName={`${member}.type`}
                    styles={styles.filter.select}
                    {...rest}
                  />
                </div>
                <div style={styles.filter.category}>
                  <div style={styles.filter.span}>Value:</div>
                  <Field
                    name={`${member}.value`}
                    list={this.getAvailableValues(index)}
                    changeHandler={data => selectFilterValueHandler(data, index)}
                    component={SelectInput}
                    fieldName={`${member}.value`}
                    styles={styles.filter.select}
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
                    Delete
                  </Button>
                </div>
              </div>
            </li>
          )}
        </ul>

        <PhoneView>
          {
            matches => matches ? (
              <div>
                <Button
                  className="add-filter"
                  clickHandler={() => addFilter(fields)}
                  kind="smallBlock"
                  type="button"
                >
                  <span>Add New Filter</span>
                </Button>

                {
                  fields.length > 0 &&
                    <Button
                      className="submit"
                      clickHandler={() => submitHandler()}
                      kind="mobileSubmit"
                      type="button"
                    >
                      Search
                    </Button>
                }

              </div>
            ) : (
              <div>
                {
                  fields.length > 0 &&
                  <div className="action-btn" style={styles.filter.actionBtn}>
                    <Button
                      className="add-filter"
                      clickHandler={() => addFilter(fields)}
                      kind="small"
                      type="button"
                    >
                      Add Another Condition
                    </Button>

                    <Button
                      className="remove-all-filter"
                      clickHandler={() => removeAllFilters(fields)}
                      kind="small"
                      type="button"
                    >
                      Clear All
                    </Button>
                    <Button
                      className="submit"
                      clickHandler={() => submitHandler()}
                      kind="submit"
                      type="button"
                    >
                      Search
                    </Button>
                  </div>
                }
              </div>
            )
          }
        </PhoneView>
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    query: state.query,
    form: state.form,
    filters: state.filters
  };
}

function mapDispatchToProps(dispatch) {
  return {
    selectFilterHandler: (data, index) => {
      const selectedCategory = data.target.value;
      dispatch(updateSelectedFilter(selectedCategory, index));
    },

    selectFilterValueHandler: (data, index) => {
      const selectedValue = data.target.value;
      dispatch(updateSelectedValue(selectedValue, index));
    },

    addFilter: (fields) => {
      dispatch(addFilter());
      return fields.push({});
    },

    removeFilter: (fields, index) => {
      dispatch(removeSelectedFilter(index));
      return fields.remove(index);
    },

    removeAllFilters: (fields) => {
      dispatch(removeAllFilters());
      dispatch(clearError());
      return fields.removeAll();
    },

    submitHandler: () => {
      dispatch(requestApi());
    }
  };
}

Filter.propTypes = {
  addFilter: PropTypes.func.isRequired,
  fields: PropTypes.oneOfType([
    PropTypes.shape({
      component: PropTypes.func
    }),
    PropTypes.arrayOf(PropTypes.shape({}))
  ]).isRequired,
  filters: PropTypes.shape({
    get: PropTypes.func.isRequired
  }).isRequired,
  form: PropTypes.shape({}).isRequired,
  query: PropTypes.shape({
    get: PropTypes.func.isRequired
  }).isRequired,
  removeFilter: PropTypes.func.isRequired,
  removeAllFilters: PropTypes.func.isRequired,
  selectFilterHandler: PropTypes.func.isRequired,
  selectFilterValueHandler: PropTypes.func.isRequired,
  submitHandler: PropTypes.func.isRequired
};

export default connect(mapStateToProps, mapDispatchToProps)(Filter);
