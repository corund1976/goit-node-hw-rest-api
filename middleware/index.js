const middleware = {
  validator: require('./validation'),
  authorizator: require('./authorization'),
  asyncWrapper: require('./asyncWrapper'),
  errorHandler: require('./errorHandler'),
  upload: require('./imageUploader'),
  imageCompressor: require('./imageCompressor'),
}

module.exports = middleware
