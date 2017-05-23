import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { FieldArray, reduxForm } from 'redux-form';

import debounce from 'lodash/debounce';
import isEmpty from 'lodash/isEmpty';

import DesktopView from '../components/responsive/DesktopView';
import PhoneView from '../components/responsive/PhoneView';

import {
  requestApi,
  updateKeyword
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
  }

  render() {
    const {
      filters,
      isFetching,
      handleSubmit,
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
          />
        </div>

        <PhoneView>
          {
            matches => matches ? (
              <div>
                <Button
                  type="button"
                  kind="mobileLink"
                  clickHandler={this.toggleFilter}
                  className="__mobile-sw-advanced-search__"
                >
                  <img src={settings} alt="settings" style={styles.sImg} />
                  { this.state.showFilter && <span>Hide Advanced Search</span> }
                  { !this.state.showFilter && <span>Advanced Search</span> }
                </Button>
              </div>
            ) : (
              <div style={{ overflow: 'hidden' }}>
                <Button
                  type="button"
                  kind="link"
                  clickHandler={this.toggleFilter}
                  className="__sw-advanced-search__"
                >
                  <img src={settings} alt="settings" style={styles.sImg} />
                  { this.state.showFilter && <span>Hide Advanced Search</span> }
                  { !this.state.showFilter && <span>Advanced Search</span> }
                </Button>
              </div>
            )
          }
        </PhoneView>

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

function mapStateToProps() {
  return {};
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
  handleSubmit: PropTypes.func.isRequired,
  isFetching: PropTypes.bool.isRequired,
  submitHandler: PropTypes.func.isRequired,
  filters: PropTypes.shape({}).isRequired
};

const connected = connect(mapStateToProps, mapDispatchToProps)(Form);

export default reduxForm({
  form: 'form',
  validate,
  fields: ['keyword', 'filters[].type', 'filters[].value']
}, () => ({
  initialValues: {}
}))(connected);
