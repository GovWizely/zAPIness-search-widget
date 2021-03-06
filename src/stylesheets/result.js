import colors from './colors';

const fontFamily = '"Helvetica Neue",Helvetica,Arial,sans-serif';

const result = {
  base: {
    marginTop: '20px'
  },

  container: {
    borderBottom: `1px solid${colors.lightGrey}`,
    borderRadius: 3,
    color: colors.xDarkGrey,

    ':hover': {
      background: colors.lightGrey,
      cursor: 'pointer'
    }
  },

  noResult: {
    color: colors.darkGrey,
    fontFamily,
    fontStyle: 'italic',
    fontWeight: 500
  },

  link: {
    color: colors.chalk,
    display: 'block',
    textDecoration: 'none',
    fontFamily,
    fontSize: '15px',
    fontWeight: 500,
    padding: '10px 20px',
    width: '100%'
  },

  details: {
    color: colors.chalk,
    fontFamily,
    fontSize: '15px',
    fontWeight: 300,
    marginTop: '10px',
    textDecoration: 'none'
  },

  tr: {
    color: colors.chalk,
    fontSize: '15px',
    fontWeight: 300,
    height: '25px',
    width: '120px'
  }
};

export default result;
