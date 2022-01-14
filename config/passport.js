const passport = require('passport')
const { Strategy, ExtractJwt } = require('passport-jwt')
require('dotenv').config()

const JWT_SECRET_KEY = process.env.JWT_SECRET_KEY
const Users = require('../service/schemas/userSchema')

const options = {
  secretOrKey: JWT_SECRET_KEY,
  jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
}

passport.use(
  new Strategy(options, async (payload, done) => {
    try {
      const user = await Users.findById(payload.id)
      if (!user) {
        return done(new Error('User not found'), false)
      }
      if (!user.token) {
        return done(null, false)
      }
      return done(null, user)
    } catch (err) {
      return done(err, false)
    }
  })
)
