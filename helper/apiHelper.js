const asyncWrapper = (controller) => {
  return (req, res, next) => {
    controller(req, res).catch(next)
  }
}

const errorHandler = (err, req, res, next) => {
  res.status(err.status || 500).json({ message: err.message })
}

module.exports = {
  asyncWrapper,
  errorHandler,
}
