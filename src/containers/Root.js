const rootProd = require('./Root.prod')
const rootDev = require('./Root.dev')

if (process.env.NODE_ENV === 'production') {
  module.exports = rootProd
} else {
  module.exports = rootDev
}
