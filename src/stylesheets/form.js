import colors from './colors';

const fontFamily = '"Helvetica Neue",Helvetica,Arial,sans-serif';

const form = {
  container: {
    position: 'relative'
  },

  input: {
    borderWidth: 1,
    borderColor: colors.grey,
    borderRadius: 3,
    boxSizing: 'border-box',
    borderStyle: 'solid',
    display: 'inline-block',
    fontFamily,
    fontSize: '15px',
    fontWeight: 300,
    lineHeight: '28px',
    padding: '8px 10px',
    width: '100%'
  },

  inputWrapper: {
    display: 'inline-block',
    height: '46px',
    position: 'relative',
    verticalAlign: 'top',
    width: '100%'
  },

  clearBtn: {
    color: '#999',
    fontSize: '20px',
    height: '10px',
    position: 'absolute',
    right: '50px',
    top: '10px',
    width: '10px',

    ':hover': {
      color: colors.errorRed,
      cursor: 'pointer'
    }
  }
};

export default form;
