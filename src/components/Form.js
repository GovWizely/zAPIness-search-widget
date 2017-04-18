import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { FieldArray, reduxForm } from 'redux-form'

import * as QueryActions from '../actions/QueryActions'
import validate from '../actions/validate'
import styles from '../stylesheets/styles'

import Filter from './Filter'
import Button from './Button'
import Input from './Input'

const settings = require('../settings.png')
const loadingIcon = require('../loading.png')

const _ = require('lodash')

export class Form extends Component {
  constructor(props) {
    super(props)
    this.state = {
      showFilter: false
    }
    this.toggleFilter = this.toggleFilter.bind(this)
  }

  toggleFilter() {
    this.setState({
      showFilter: !this.state.showFilter
    })
  }

  render() {
    const {
      isFetching,
      submitHandler
    } = this.props

    return (
      <form className="__sw-input__" style={styles.form.container} onSubmit={e => e.preventDefault()}>
        <div style={styles.form.inputWrapper}>
          <Input
            name="keyword"
            placeholder="Search for keyword..."
            changeHandler={_.debounce(submitHandler, 1000)}
          />
          {
            isFetching &&
            <div style={styles.loadingIconWrapper}>
              <span>
                <img src={loadingIcon} alt="Loading" style={styles.loadingIcon} />
              </span>
            </div>
          }
        </div>

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

        {
          this.state.showFilter &&
          <FieldArray
            name="filters"
            component={Filter}
          />
        }
      </form>
    )
  }
}

function mapStateToProps(state) {
  return {
    isFetching: state.isFetching
  }
}

function mapDispatchToProps(dispatch) {
  return {
    submitHandler: (data) => {
      const keyword = data.target.value

      dispatch(QueryActions.updateKeyword(keyword))
      dispatch(QueryActions.requestApi())
    }
  }
}

Form.propTypes = {
  isFetching: PropTypes.bool.isRequired,
  submitHandler: PropTypes.func.isRequired
}

const connected = connect(mapStateToProps, mapDispatchToProps)(Form)

export default reduxForm({
  form: 'form',
  validate,
  fields: ['keyword', 'filters[].type', 'filters[].value']
}, () => ({
  initialValues: {}
}))(connected)
