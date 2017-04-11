import colors from './colors'
import buttons from './buttons'
import form from './form'
import result from './result'
import pagination from './pagination'
import list from './list'
import filter from './filter'

const styles = {
  buttons,
  form,
  result,
  pagination,
  list,
  filter,

  container: {
    padding: '20px',
    width: '600px'
  },

  img: {
    height: '20px',
    width: '20px',
    color: colors.grey
  },

  link: {
    color: colors.darkGrey,
    textDecoration: 'none'
  },

  error: {
    color: colors.red,
    fontWeight: 500
  }
}

export default styles
