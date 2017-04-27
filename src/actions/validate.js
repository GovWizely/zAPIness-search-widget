const validate = (values) => {
  const errors = {}

  if (!values.filters) { return {} }

  const filterArrayErrors = []

  values.filters.forEach((filter, index) => {
    const filterErrors = {}

    if (!filter.value || !filter.type) {
      filterErrors.value = 'Required'
      filterArrayErrors[index] = filterErrors
    }

    return filterErrors
  })

  if (filterArrayErrors.length) {
    errors.filters = filterArrayErrors
  }

  return errors
}

export default validate
