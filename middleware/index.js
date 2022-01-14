const middleware = {
  validator: require('./validation'),
  authorizator: require('./authorization'),
  asyncWrapper: require('./asyncWrapper'),
  errorHandler: require('./errorHandler')
}

module.exports = middleware
