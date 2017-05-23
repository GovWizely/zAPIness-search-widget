import colors from './colors';

const fontFamily = '"Helvetica Neue",Helvetica,Arial,sans-serif';

const filter = {
  container: {
    backgroundColor: colors.lightGrey,
    border: `1px solid ${colors.mediumGrey}`,
    borderRadius: 3,
    boxSizing: 'border-box',
    color: colors.xDarkGrey,
    fontFamily,
    margin: '20px 0',
    padding: '20px',
    width: '100%'
  },

  searchLabel: {
    borderBottom: `1px solid ${colors.darkGrey}`,
    fontSize: '15px',
    fontWeight: 500,
    marginBottom: '20px',
    paddingBottom: '10px'
  },

  category: {
    display: 'inline-block',
    marginRight: '1%',
    width: '39%'
  },

  numbering: {
    display: 'inline-block',
    fontSize: '13px',
    fontStyle: 'italic',
    fontWeight: 400,
    width: '10%'
  },

  ul: {
    fontFamily,
    listStyle: 'none',
    margin: '0 0 20px 0',
    padding: 0
  },

  li: {
    padding: '0 0 10px 0'
  },

  span: {
    fontSize: '13px',
    fontWeight: 300,
    marginBottom: '5px'
  },

  listContainer: {
    display: 'inline-block',
    verticalAlign: 'text-top',
    width: '100%'
  },

  btnContainer: {
    display: 'inline-block',
    verticalAlign: 'middle',
    width: '20%'
  },

  select: {
    border: `1px solid ${colors.xDarkGrey}`,
    height: '20px',
    width: '100%'
  },

  actionBtn: {
    borderTop: `1px solid ${colors.darkGrey}`,
    paddingTop: '20px',
    textAlign: 'right'
  }
};

export default filter;
