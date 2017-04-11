import colors from './colors'

const fontFamily = '"Helvetica Neue",Helvetica,Arial,sans-serif'

const form = {
  container: {
    width: '100%'
  },

  input: {
    borderWidth: 1,
    borderColor: colors.lightGrey,
    borderRadius: 3,
    borderStyle: 'solid',
    display: 'inline-block',
    fontFamily,
    fontSize: '15px',
    fontWeight: 300,
    height: '100%',
    padding: '8px 10px',
    width: '100%'
  },

  inputWrapper: {
    display: 'inline-block',
    height: '46px',
    verticalAlign: 'top',
    width: '90%'
  }
}

export default form
