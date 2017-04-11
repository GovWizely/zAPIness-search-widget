import colors from './colors'
import buttons from './buttons'
import form from './form'
import result from './result'
import pagination from './pagination'
import list from './list'

const styles = {
  buttons,
  form,
  result,
  pagination,
  list,

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
  }
}

export default styles
