import colors from './colors';
import buttons from './buttons';
import form from './form';
import result from './result';
import pagination from './pagination';
import list from './list';
import filter from './filter';

const styles = {
  buttons,
  form,
  result,
  pagination,
  list,
  filter,

  container: {
    padding: '20px',
    width: '100%'
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
  },

  loadingIcon: {
    height: '40px',
    opacity: 0.7,
    width: '40px'
  },

  loadingIconWrapper: {
    position: 'absolute',
    marginTop: '2px',
    right: '10px',
    top: 0
  },

  lookingGlass: {
    height: '30px',
    opacity: '0.3',
    width: '30px'
  },

  lookingGlassWrapper: {
    position: 'absolute',
    marginTop: '7px',
    right: '10px',
    top: 0,

    ':hover': {
      cursor: 'pointer'
    }
  }
};

export default styles;
