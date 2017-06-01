import colors from './colors';

const pagination = {
  container: {
    display: 'inline-block',
    margin: '10px'
  },

  base: {
    listStyle: 'none'
  },

  mobileBase: {
    display: 'block',
    width: '100%'
  },

  total: {
    color: colors.darkGrey,
    display: 'block',
    fontFamily: '"Helvetica Neue",Helvetica,Arial,sans-serif',
    fontSize: '11px',
    fontStyle: 'italic',
    margin: '0 0 20px 20px',
    width: '100%'
  }
};

export default pagination;
