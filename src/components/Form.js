import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'
import { Field, FieldArray, reduxForm } from 'redux-form'

import * as QueryActions from '../actions/QueryActions'
import validate from '../actions/validate'
import styles from '../stylesheets/styles'

import Filter from './Filter'
import Button from './Button'
import Input from './Input'

const settings = require('../settings.png')

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

function mapStateToProps() {
  return {}
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
