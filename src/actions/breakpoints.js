export default const breakpoints = (styleName) => (width) => {
  return width > 768 ? styleName['desktop'] : styleName['mobile'];
}
