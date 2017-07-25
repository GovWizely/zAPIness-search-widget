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

    ':hover': {
      background: 'none',
      cursor: 'pointer'
    }
  },

  desktopLink: {
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

  mobileDeleteLink: {
    background: 'none',
    position: 'absolute',
    top: '-14px',
    right: '-26px'
  },

  desktopDeleteLink: {
    background: 'none',
    color: colors.darkChalk,
    fontFamily: '"Helvetica Neue",Helvetica,Arial,sans-serif',
    fontSize: '13px',
    fontWeight: 300,
    position: 'absolute',
    textDecoration: 'underline',
    top: '-12px'
  },

  wide: {
    border: `1px solid ${colors.xDarkGrey}`,
    fontSize: '13px',
    fontWeight: 500,
    color: colors.xDarkGrey,
    marginLeft: '5px',
    width: '100%'
  },

  desktopSmall: {
    border: `1px solid ${colors.xDarkGrey}`,
    fontSize: '15px',
    fontWeight: 500,
    color: colors.xDarkGrey,
    marginLeft: '5px',
    padding: '5px 8px'
  },

  mobileSmall: {
    border: `1px solid ${colors.xDarkGrey}`,
    display: 'block',
    fontSize: '15px',
    fontWeight: 500,
    color: colors.xDarkGrey,
    marginBottom: '10px',
    padding: '8px',
    width: '100%'
  },

  desktopSubmit: {
    background: '#5cb85c',
    border: '1px solid #4cae4c',
    display: 'block',
    fontSize: '15px',
    fontWeight: 600,
    color: colors.white,
    padding: '8px 40px',

    ':hover': {
      background: '#5cb85c',
      border: '1px solid #4cae4c',
      cursor: 'pointer'
    },

    ':disabled': {
      background: colors.chalk,
      border: colors.white,
      opacity: '0.5'
    }
  },

  mobileSubmit: {
    background: colors.darkChalk,
    color: colors.white,
    display: 'block',
    fontSize: '15px',
    fontWeight: 500,
    padding: '8px',
    width: '100%',
    marginBottom: '10px'
  }
};

export default buttons;
