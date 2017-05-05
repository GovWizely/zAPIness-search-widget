import colors from './colors';

const fontFamily = '"Helvetica Neue",Helvetica,Arial,sans-serif';

const filter = {
  container: {
    backgroundColor: colors.lightGrey,
    border: `1px solid ${colors.mediumGrey}`,
    borderRadius: 3,
    color: colors.xDarkGrey,
    fontFamily,
    margin: '20px 0',
    padding: '20px'
  },

  ul: {
    fontFamily,
    listStyle: 'none',
    margin: '20px 0',
    padding: 0
  },

  li: {
    padding: '0 0 10px 0'
  },

  span: {
    fontSize: '13px',
    fontWeight: 500,
    marginRight: '5px'
  },

  listContainer: {
    display: 'inline-block',
    verticalAlign: 'text-top'
  },

  btnContainer: {
    display: 'inline-block',
    verticalAlign: 'middle'
  },

  select: {
    height: '20px',
    marginRight: '10px',
    width: '170px'
  },

  actionBtn: {
    textAlign: 'right'
  }
};

export default filter;
