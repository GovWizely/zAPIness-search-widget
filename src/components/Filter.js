import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Field, formValueSelector } from 'redux-form';

import isEmpty from 'lodash/isEmpty';
import keys from 'lodash/keys';
import SelectInput from './SelectInput';

import Button from './Button';
import DesktopView from './responsive/DesktopView';
import PhoneView from './responsive/PhoneView';

import {
  clearError,
  requestApi,
  resetPageNum
} from '../actions/QueryActions';

import {
  addDefaultFilter,
  addFilters,
  removeAllFilters,
  removeSelectedFilter
} from '../actions/FilterActions';

import styles from '../stylesheets/styles';

const trash = require('../trash.png');

export class Filter extends Component {
  componentDidMount() {
    if (this.props.fields.length > 0) { return; }

    this.props.addFilter(this.props.fields);
  }

  getAvailableValues(index) {
    const target = this.props.formFilters[index].type;
    const categories = this.props.filters.get('categories');

    return categories ? categories[target] : [];
  }

  render() {
    const {
      fields,
      filters,
      form,
      formFilters,
      query,
      addFilter,
      removeAllFilters,
      removeFilter,
      submitHandler,
      ...rest
    } = this.props;

    return (
      <div className="__sw-filter__" style={styles.filter.container}>
        <DesktopView>
          <div style={styles.filter.searchLabel}>
            <div style={{ marginBottom: '10px' }}>Filtered By:</div>
          </div>
        </DesktopView>

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
                    changeHandler={() => {}}
                    component={SelectInput}
                    className="select-type"
                    fieldName={`${member}.type`}
                    styles={styles.filter.select}
                    {...rest}
                  />
                </div>
                <div style={styles.filter.categoryValue}>
                  { index === 0 && <div style={styles.filter.span}>Value:</div> }
                  <Field
                    name={`${member}.value`}
                    list={this.getAvailableValues(index)}
                    changeHandler={() => {}}
                    component={SelectInput}
                    fieldName={`${member}.value`}
                    styles={styles.filter.select}
                    {...rest}
                  />
                </div>

                <div className="btn-container" style={styles.filter.btnContainer}>
                  <PhoneView>
                    {
                      matches => matches ? (
                        <Button
                          className="remove-filter"
                          clickHandler={() => removeFilter(fields, index)}
                          kind="sLink"
                          type="button"
                        >
                          <img src={trash} alt="Delete" style={styles.shallowImg} />
                        </Button>
                      ) : (
                          <Button
                            className="remove-filter"
                            clickHandler={() => removeFilter(fields, index)}
                            kind="sLink"
                            type="button"
                          >
                            Delete
                          </Button>
                      )
                    }
                  </PhoneView>
                </div>
              </div>
            </li>
          )}
          <DesktopView>
            <li>
              <Button
                className="add-filter"
                clickHandler={() => addFilter(fields)}
                kind="sLink"
                type="button"
              >
                { fields.length === 0 ? 'Add New Filter' : 'Add Another Filter' }
              </Button>
            </li>
          </DesktopView>
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
                      clickHandler={() => submitHandler(formFilters)}
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
                      className="remove-all-filter"
                      clickHandler={() => removeAllFilters(fields)}
                      kind="small"
                      type="button"
                    >
                      Clear All
                    </Button>
                    <Button
                      className="submit"
                      clickHandler={() => submitHandler(formFilters)}
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

const selector = formValueSelector('form');

function mapStateToProps(state) {
  return {
    formFilters: selector(state, 'filters') || [],
    query: state.query,
    form: state.form,
    filters: state.filters
  };
}

function mapDispatchToProps(dispatch) {
  return {
    addFilter: (fields) => {
      dispatch(addDefaultFilter(fields));
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

    submitHandler: (formFilters) => {
      dispatch(addFilters(formFilters));
      dispatch(resetPageNum());
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
  formFilters: PropTypes.arrayOf(
    PropTypes.shape({
      type: PropTypes.string,
      value: PropTypes.string
    })
  ).isRequired,
  form: PropTypes.shape({}).isRequired,
  query: PropTypes.shape({
    get: PropTypes.func.isRequired
  }).isRequired,
  removeFilter: PropTypes.func.isRequired,
  removeAllFilters: PropTypes.func.isRequired,
  submitHandler: PropTypes.func.isRequired
};

export default connect(mapStateToProps, mapDispatchToProps)(Filter);
