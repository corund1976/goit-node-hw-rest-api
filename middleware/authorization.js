const passport = require('passport')

require('../config/passport')
const HttpCode = require('../helper/httpCode')

function authorizator(req, res, next) {
  passport.authenticate('jwt', { session: false }, (err, user) => {
    // const [, token] = req.get('Authorization')?.split(' ')
    const authHeader = req.headers.authorization || ''
    const token = authHeader.replace('Bearer ', '')

    if (!user || err || token !== user.token) {
      return res.status(HttpCode.UNAUTHORIZED).json({
        status: 'Unauthorized',
        code: HttpCode.UNAUTHORIZED,
        message: 'Not authorized'
      })
    }
    req.user = user
    next()
  })(req, res, next)
}

module.exports = authorizator
