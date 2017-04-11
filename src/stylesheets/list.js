import colors from './colors'

const list = {
  container: {
    display: 'inline'
  },

  base: {
    padding: '9px',
    fontFamily: '"Helvetica Neue",Helvetica,Arial,sans-serif',
    fontSize: '13px',
    marginLeft: '-1px',
    textDecoration: 'none'
  },

  active: {
    background: colors.darkChalk,
    border: `1px solid ${colors.chalk}`,
    boxSizing: 'border-box',
    color: colors.white
  },

  normal: {
    border: `1px solid ${colors.darkGrey}`,
    color: colors.darkGrey
  },

  first: {
    borderTopLeftRadius: 3,
    borderBottomLeftRadius: 3,
    border: `1px solid ${colors.darkGrey}`,
    color: colors.darkGrey
  },

  last: {
    borderTopRightRadius: 3,
    borderBottomRightRadius: 3,
    border: `1px solid ${colors.darkGrey}`,
    color: colors.darkGrey
  }
}

export default list
