import colors from './colors';

const buttons = {
  base: {
    background: colors.lightGrey,
    border: 'none',
    borderRadius: 3,
    color: '#fff',

    // Adding interactive state couldn't be easier! Add a special key to your
    // style object (:hover, :focus, :active, or @media) with the additional rules.
    ':focus': {
      outline: 'none'
    },

    ':hover': {
      background: colors.mediumGrey,
      cursor: 'pointer'
    }
  },

  link: {
    background: 'none',
    border: 'none',
    color: colors.darkChalk,
    fontFamily: '"Helvetica Neue",Helvetica,Arial,sans-serif',
    fontSize: '13px',
    fontWeight: 700,
    marginTop: '5px',
    textDecoration: 'underline',
    width: '100%',

    ':hover': {
      background: 'none',
      cursor: 'pointer'
    }
  },

  active: {
    alignItems: 'center',
    background: colors.darkChalk,
    border: 'none',
    color: colors.white,
    display: 'block',
    fontSize: '14px',
    fontWeight: 500,
    padding: '5px',
    position: 'absolute',
    right: '45px',
    top: '8px',

    ':hover': {
      background: colors.mediumGrey,
      color: colors.darkChalk,
      cursor: 'pointer'
    }
  },

  primary: {
    alignItems: 'center',
    background: 'none',
    border: `1px solid ${colors.darkChalk}`,
    color: colors.xDarkGrey,
    display: 'block',
    flex: 1,
    fontSize: '14px',
    fontWeight: 500,
    justifyContent: 'center',
    padding: '5px',
    position: 'absolute',
    overflow: 'hidden',
    right: '45px',
    top: '8px'
  },

  wide: {
    border: `1px solid ${colors.xDarkGrey}`,
    fontSize: '13px',
    fontWeight: 500,
    color: colors.xDarkGrey,
    marginLeft: '5px',
    width: '100%'
  },

  small: {
    border: `1px solid ${colors.xDarkGrey}`,
    fontSize: '13px',
    fontWeight: 500,
    color: colors.xDarkGrey,
    marginLeft: '5px'
  },

  smallBlock: {
    border: `1px solid ${colors.xDarkGrey}`,
    display: 'block',
    fontSize: '13px',
    fontWeight: 500,
    color: colors.xDarkGrey,
    marginBottom: '10px',
    width: '100%'
  },

  mobileSubmit: {
    background: colors.darkChalk,
    display: 'block',
    fontSize: '13px',
    fontWeight: 500,
    color: colors.white,
    width: '100%'
  }
};

export default buttons;
