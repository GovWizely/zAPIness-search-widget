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
    float: 'right',
    fontFamily: '"Helvetica Neue",Helvetica,Arial,sans-serif',
    fontSize: '13px',
    fontWeight: 700,
    marginTop: '5px',
    overflow: 'hidden',
    textAlign: 'right',
    textDecoration: 'underline',
    width: '30%',

    ':hover': {
      background: 'none',
      cursor: 'pointer'
    }
  },

  mobileLink: {
    background: 'none',
    border: 'none',
    color: colors.darkChalk,
    fontFamily: '"Helvetica Neue",Helvetica,Arial,sans-serif',
    fontSize: '13px',
    fontWeight: 700,
    marginTop: '5px',
    textAlign: 'right',
    textDecoration: 'underline',
    width: '100%',

    ':hover': {
      background: 'none',
      cursor: 'pointer'
    }
  },

  sLink: {
    background: 'none',
    border: 'none',
    color: colors.darkChalk,
    fontFamily: '"Helvetica Neue",Helvetica,Arial,sans-serif',
    fontSize: '13px',
    fontWeight: 300,
    textDecoration: 'underline',

    ':hover': {
      background: 'none',
      cursor: 'pointer'
    }
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

  submit: {
    background: colors.darkChalk,
    display: 'inline-block',
    fontSize: '13px',
    fontWeight: 500,
    color: colors.white,
    marginLeft: '5px',

    ':hover': {
      background: colors.chalk,
      cursor: 'pointer'
    },

    ':disabled': {
      background: colors.chalk,
      opacity: '0.5'
    }
  },

  mobileSubmit: {
    background: colors.darkChalk,
    display: 'block',
    fontSize: '13px',
    fontWeight: 500,
    color: colors.white,
    width: '100%',
    marginBottom: '10px'
  }
};

export default buttons;
