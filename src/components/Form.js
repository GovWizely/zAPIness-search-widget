import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { FieldArray, reduxForm } from 'redux-form';

import debounce from 'lodash/debounce';
import isEmpty from 'lodash/isEmpty';

import {
  requestApi,
  updateKeyword
} from '../actions/QueryActions';

import validate from '../actions/validate';
import styles from '../stylesheets/styles';

import Filter from './Filter';
import Button from './Button';
import Input from './Input';

const settings = require('../settings.png');
const loadingIcon = require('../spin.gif');

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
  }

  render() {
    const {
      filters,
      isFetching,
      submitHandler
    } = this.props;

    return (
      <form className="__sw-input__" style={styles.form.container} onSubmit={e => e.preventDefault()}>
        <div style={styles.form.inputWrapper}>
          <Input
            name="keyword"
            placeholder="Search for keyword..."
            changeHandler={debounce(submitHandler, 1000)}
          />
          {
            isFetching &&
            <div style={styles.loadingIconWrapper} className="__sw-loading__">
              <span>
                <img src={loadingIcon} alt="Loading" style={styles.loadingIcon} />
              </span>
            </div>
          }
        </div>

        {
          !isEmpty(filters.get('categories')) &&
          <Button
            type="button"
            kind="primary"
            clickHandler={this.toggleFilter}
            className="__sw-advanced-search__"
          >
            <span>
              <img style={styles.img} src={settings} alt="Add" />
            </span>
          </Button>
        }

        {
          this.state.showFilter &&
          <FieldArray
            name="filters"
            component={Filter}
          />
        }
      </form>
    );
  }
}

function mapDispatchToProps(dispatch) {
  return {
    submitHandler: (data) => {
      const keyword = data.target.value;

      dispatch(updateKeyword(keyword));
      dispatch(requestApi());
    }
  };
}

Form.propTypes = {
  isFetching: PropTypes.bool.isRequired,
  submitHandler: PropTypes.func.isRequired,
  filters: PropTypes.shape({}).isRequired
};

const connected = connect(mapDispatchToProps)(Form);

export default reduxForm({
  form: 'form',
  validate,
  fields: ['keyword', 'filters[].type', 'filters[].value']
}, () => ({
  initialValues: {}
}))(connected);
