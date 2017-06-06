import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { FieldArray, reduxForm } from 'redux-form';

import debounce from 'lodash/debounce';
import isEmpty from 'lodash/isEmpty';

import {
  requestApi,
  updateKeyword,
  updateHasFilter,
  setFilterRequired,
  resetPageNum
} from '../actions/QueryActions';

import validate from '../actions/validate';
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
            changeHandler={debounce(submitHandler, 1000)}
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
    submitHandler: (data, keyword) => {
      dispatch(setFilterRequired());

      const input = keyword || data.target.value;
      dispatch(resetPageNum());

      dispatch(updateKeyword(input));
      dispatch(requestApi());
    },

    updateFilterStatus: (hasFilter) => {
      dispatch(updateHasFilter(hasFilter));
    }
  };
}

Form.defaultProps = {
  deviceType: '',
  handleSubmit: undefined,
  updateFilterStatus: undefined
};

Form.propTypes = {
  handleSubmit: PropTypes.func,
  isFetching: PropTypes.bool.isRequired,
  submitHandler: PropTypes.func.isRequired,
  updateFilterStatus: PropTypes.func,
  filters: PropTypes.shape({}).isRequired,
  query: PropTypes.shape({}).isRequired,
  deviceType: PropTypes.string
};

export default connect(mapStateToProps, mapDispatchToProps)(reduxForm({
  form: 'form',
  validate
})(Form));
