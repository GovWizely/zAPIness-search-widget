import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import {
  FieldArray,
  reduxForm,
  change
} from 'redux-form';

import isEmpty from 'lodash/isEmpty';

import {
  requestApi,
  updateKeyword,
  updateHasFilter,
  resetPageNum
} from '../actions/QueryActions';

import styles from '../stylesheets/styles';

import Filter from './Filter';
import Button from './Button';
import Input from './Input';
import Fetcher from './Fetcher';

const settings = require('../settings.png');

export class Form extends Component {
  constructor(props) {
    super(props);
    this.state = {
      showFilter: false
    };
    this.toggleFilter = this.toggleFilter.bind(this);
  }

  toggleFilter() {
    this.setState({
      showFilter: !this.state.showFilter
    });
    this.props.updateFilterStatus(!this.state.showFilter);
  }

  render() {
    const {
      clearHandler,
      deviceType,
      filters,
      handleSubmit,
      isFetching,
      query,
      submitHandler
    } = this.props;

    return (
      <form className="__sw-input__" style={styles.form.container} onSubmit={handleSubmit}>
        <div style={styles.form.inputWrapper}>
          <Input
            name="keyword"
            placeholder="Search for keyword..."
            changeHandler={submitHandler}
            clearHandler={clearHandler}
            value={query.get('keyword') || ''}
          />

          <Fetcher
            submitHandler={submitHandler}
            fetching={isFetching}
            keyword={query.get('keyword')}
          />
        </div>

        {
          !isEmpty(filters.get('categories')) &&
          <div style={{ overflow: 'hidden' }}>
            <Button
              type="button"
              kind={`${deviceType}Link`}
              clickHandler={this.toggleFilter}
              className="_sw-advanced-search__"
            >
              <img src={settings} alt="settings" style={styles.sImg} />
              { this.state.showFilter && <span>Hide Advanced Filter</span> }
              { !this.state.showFilter && <span>Advanced Filter</span> }
            </Button>
          </div>
        }

        {
          query.get('error') &&
          <div className="__sw-error__" style={styles.errorMessage}>
            { query.get('error') }
          </div>
        }

        {
          this.state.showFilter &&
          <FieldArray
            name="filters"
            deviceType={deviceType}
            component={Filter}
          />
        }
      </form>
    );
  }
}

function mapStateToProps() {
  return {
    fields: ['keyword', 'filters[].type', 'filters[].value']
  };
}

function mapDispatchToProps(dispatch) {
  return {
    submitHandler: (keyword) => {
      //debugger
      const input = keyword;
      dispatch(resetPageNum());

      dispatch(updateKeyword(input));
      dispatch(requestApi());
    },

    updateFilterStatus: (hasFilter) => {
      dispatch(updateHasFilter(hasFilter));
    },

    clearHandler: () => {
      dispatch(updateKeyword(''));
      dispatch(change('form', 'keyword', ''));
    }
  };
}

Form.defaultProps = {
  deviceType: '',
  handleSubmit: undefined,
  updateFilterStatus: undefined
};

Form.propTypes = {
  clearHandler: PropTypes.func.isRequired,
  handleSubmit: PropTypes.func,
  isFetching: PropTypes.bool.isRequired,
  submitHandler: PropTypes.func.isRequired,
  updateFilterStatus: PropTypes.func,
  filters: PropTypes.shape({}).isRequired,
  query: PropTypes.shape({}).isRequired,
  deviceType: PropTypes.string
};

export default connect(mapStateToProps, mapDispatchToProps)(reduxForm({
  form: 'form'
})(Form));
