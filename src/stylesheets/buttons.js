import colors from './colors'

const buttons = {
  base: {
    border: 'none',
    borderRadius: '3px',
    color: '#fff',

    // Adding interactive state couldn't be easier! Add a special key to your
    // style object (:hover, :focus, :active, or @media) with the additional rules.
    ':focus': {
      outline: 'none'
    },

    ':hover': {
      background: colors.grey,
      cursor: 'pointer'
    }
  },

  primary: {
    alignItems: 'center',
    background: colors.darkGrey,
    color: colors.xDarkGrey,
    display: 'inline-block',
    flex: 1,
    height: '46px',
    justifyContent: 'center',
    marginLeft: '10px',
    padding: '0 5px',
    overflow: 'hidden'
  }
}

export default buttons
