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
  }
};

export default buttons;
