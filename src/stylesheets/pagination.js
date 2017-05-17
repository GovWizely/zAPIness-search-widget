import colors from './colors';

const pagination = {
  container: {
    display: 'inline-block',
    margin: '10px -10px'
  },

  base: {
    listStyle: 'none'
  },

  total: {
    color: colors.darkGrey,
    display: 'inline-block',
    fontFamily: '"Helvetica Neue",Helvetica,Arial,sans-serif',
    fontSize: '11px',
    fontStyle: 'italic',
    marginTop: '20px',
    textAlign: 'right',
    width: '100%'
  }
};

export default pagination;
