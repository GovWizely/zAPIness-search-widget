import colors from './colors';

const fontFamily = '"Helvetica Neue",Helvetica,Arial,sans-serif';

const select = {
  placeholder: {
    overflow: 'hidden',
    textOverflow: 'ellipsis',
    whiteSpace: 'nowrap'
  },

  input: {
    boxSizing: 'border-box',
    display: 'inline-block',
    fontFamily,
    fontSize: '15px',
    fontWeight: 400,
    lineHeight: '28px',
    padding: '8px 10px',
    width: '100%',
    zIndex: 0
  },

  inputBorder: {
    borderWidth: 1,
    borderColor: colors.grey,
    borderStyle: 'solid'
  },

  openSelectInputBorder: {
    borderTopRightRadius: 3,
    borderTopLeftRadius: 3,
    borderTop: `1px solid ${colors.grey}`,
    borderLeft: `1px solid ${colors.grey}`,
    borderRight: `1px solid ${colors.grey}`
  },

  disabled: {
    background: colors.lightGrey,
    color: colors.grey
  },

  options: {
    background: colors.white,
    borderBottom: `1px solid ${colors.grey}`,
    borderBottomRightRadius: 3,
    borderBottomLeftRadius: 3,
    marginTop: '-1px',
    maxHeight: '150px',
    position: 'absolute',
    overflow: 'auto',
    width: '100%',
    zIndex: 1
  },

  ul: {
    listStyle: 'none',
    padding: 0
  },

  li: {
    borderLeft: '1px solid #ccc',
    borderRight: '1px solid #ccc',

    ':hover': {
      background: colors.lightBlue,
      cursor: 'pointer'
    }
  },

  noResult: {
    borderLeft: '1px solid #ccc',
    borderRight: '1px solid #ccc',
    // padding: '10px',

    ':hover': {
      cursor: 'no-drop'
    }
  },

  link: {
    color: colors.black,
    display: 'block',
    fontFamily,
    fontSize: '15px',
    padding: '10px',
    marginLeft: 0,
    textDecoration: 'none',
    width: '100%',

    ':hover': {
      cursor: 'pointer'
    }
  },

  noResultLink: {
    color: colors.chalk,
    display: 'block',
    fontFamily,
    fontSize: '15px',
    padding: '10px',
    marginLeft: 0,
    textDecoration: 'none',
    width: '100%',

    ':hover': {
      cursor: 'no-drop'
    }
  },

  noSelect: {
    WebkitTouchCallout: 'none',
    WebkitUserSelect: 'none',
    khtmlUserSelect: 'none',
    MozUserSelect: 'none',
    msUserSelect: 'none',
    userSelect: 'none',
    outline: 0
  },

  dropdownOnly: {
    backgroundImage: `linear-gradient(-180deg, #fafbfc 0%, ${colors.aliceBlue} 90%)`
  },

  hover: {
    ':hover': {
      cursor: 'pointer'
    }
  }
};

export default select;
