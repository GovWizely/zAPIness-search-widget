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

  primary: {
    alignItems: 'center',
    background: colors.lightGrey,
    color: colors.xDarkGrey,
    display: 'inline-block',
    flex: 1,
    height: '46px',
    justifyContent: 'center',
    marginLeft: '10px',
    padding: '0 5px',
    overflow: 'hidden',
    width: '46px'
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
