const prodStore = require('./configureStore.prod')
const prodDev = require('./configureStore.dev')

if (process.env.NODE_ENV === 'production') {
  module.exports = prodStore
} else {
  module.exports = prodDev
}
