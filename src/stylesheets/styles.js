import colors from './colors';
import buttons from './buttons';
import form from './form';
import result from './result';
import pagination from './pagination';
import list from './list';
import select from './select';
import filter from './filter';
import arrow from './arrow';

const fontFamily = '"Helvetica Neue",Helvetica,Arial,sans-serif';

const styles = {
  buttons,
  form,
  result,
  pagination,
  list,
  filter,
  select,
  arrow,

  container: {
    background: colors.white,
    boxSizing: 'border-box',
    width: '100%'
  },

  img: {
    height: '20px',
    width: '20px',
    color: colors.grey
  },

  shallowImg: {
    height: '20px',
    marginLeft: '15px',
    opacity: 0.6,
    width: '20px'
  },

  sImg: {
    height: '15px',
    marginRight: '3px',
    marginTop: '-2px',
    opacity: 0.5,
    verticalAlign: 'middle',
    width: '15px'
  },

  link: {
    color: colors.darkGrey,
    textDecoration: 'none'
  },

  error: {
    border: `1px solid ${colors.errorRed}`,
    borderRadius: '5px'
  },

  errorMessage: {
    background: '#f2dede',
    border: '1px solid #ebccd1',
    borderRadius: '4px',
    color: colors.red,
    fontFamily,
    fontSize: '14px',
    padding: '15px 20px',
    margin: '10px 0'
  },

  loadingIcon: {
    height: '40px',
    opacity: 0.7,
    width: '40px'
  },

  loadingIconWrapper: {
    position: 'absolute',
    right: '10px',
    top: '8px'
  },

  lookingGlass: {
    height: '25px',
    opacity: '0.8',
    width: '25px'
  },

  lookingGlassWrapper: {
    position: 'absolute',
    right: '10px',
    top: '10px',

    ':hover': {
      cursor: 'pointer'
    }
  }
};

export default styles;
