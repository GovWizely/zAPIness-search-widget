import colors from './colors';

const fontFamily = '"Helvetica Neue",Helvetica,Arial,sans-serif';

const filter = {
  desktopContainer: {
    backgroundColor: colors.lightGrey,
    border: `1px solid ${colors.mediumGrey}`,
    borderRadius: 3,
    boxSizing: 'border-box',
    color: colors.xDarkGrey,
    fontFamily,
    margin: '10px 0',
    padding: '20px',
    width: '100%'
  },

  mobileContainer: {
    borderBottom: `1px solid ${colors.mediumGrey}`,
    marginTop: '20px',
    paddingBottom: '10px'
  },

  searchLabel: {
    fontSize: '15px',
    fontWeight: 500
  },

  category: {
    display: 'inline-block',
    marginRight: '1%',
    maxWidth: '39%'
  },

  desktopCategoryType: {
    display: 'inline-block',
    marginRight: '1%',
    width: '25%'
  },

  mobileCategoryType: {
    display: 'inline-block',
    marginRight: '1%',
    width: '45%'
  },

  desktopCategoryValue: {
    display: 'inline-block',
    marginRight: '1%',
    width: '50%'
  },

  mobileCategoryValue: {
    display: 'inline-block',
    marginRight: '1%',
    width: '45%'
  },

  label: {
    borderBottom: `1px solid ${colors.mediumGrey}`,
    color: colors.xDarkGrey,
    fontFamily,
    marginBottom: '10px',
    paddingBottom: '10px'
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
    fontWeight: 500,
    marginBottom: '5px'
  },

  listContainer: {
    display: 'inline-block',
    verticalAlign: 'text-top',
    width: '100%'
  },

  desktopBtnContainer: {
    display: 'inline-block',
    position: 'relative',
    verticalAlign: 'middle',
    width: '20%'
  },

  mobileBtnContainer: {
    display: 'inline-block',
    position: 'relative',
    verticalAlign: 'middle',
    width: '2%'
  },

  actionBtn: {
    borderTop: `1px solid ${colors.darkGrey}`,
    paddingTop: '20px',
    textAlign: 'right'
  },

  clearBtn: {
    color: '#999',
    fontSize: '20px',
    position: 'absolute',
    right: '15px',
    textDecoration: 'none',
    top: '9px'
  }
};

export default filter;
