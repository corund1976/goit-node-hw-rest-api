const jwt = require('jsonwebtoken')
require('dotenv').config()

const { userService } = require('../service')
const HttpCode = require('../helper/httpCode')

const JWT_SECRET_KEY = process.env.JWT_SECRET_KEY

async function signup(req, res, next) {
  const { email } = req.body
  const user = await userService.findByEmail(email)

  if (user) {
    return await res.status(HttpCode.CONFLICT).json({
      status: 'Conflict',
      code: HttpCode.CONFLICT,
      message: 'Email in use'
    })
  }

  try {
    const newUser = await userService.createUser(req.body)

    return res.status(HttpCode.CREATED).json({
      status: 'Created',
      code: HttpCode.CREATED,
      data: {
        user: {
          id: newUser.id,
          username: newUser.username,
          email: newUser.email,
          subscription: newUser.subscription
        }
      }
    })
  } catch (e) {
    next(e)
  }
}

async function login(req, res, next) {
  const { email, password } = req.body
  const user = await userService.findByEmail(email)
  const isValidPassword = await user?.validPassword(password)

  if (!user || !isValidPassword) {
    return await res.status(HttpCode.UNAUTHORIZED).json({
      status: 'Unauthorized',
      code: HttpCode.UNAUTHORIZED,
      message: 'Email or password is wrong'
    })
  }

  const payload = {
    id: user.id,
    username: user.username
  }
  const token = jwt.sign(payload, JWT_SECRET_KEY, { expiresIn: '1h' })

  try {
    await userService.updateToken(user.id, token)

    return res.status(HttpCode.OK).json({
      status: 'Ok',
      code: HttpCode.OK,
      data: {
        token: token,
        user: {
          email: user.email,
          subscription: user.subscription
        }
      }
    })
  } catch (e) {
    next(e)
  }
}

async function current(req, res, next) {
  const { email, subscription, username } = req.user

  try {
    return await res.status(HttpCode.OK).json({
      status: 'Ok',
      code: HttpCode.OK,
      data: {
        user: {
          username: username,
          email: email,
          subscription: subscription
        }
      }
    })
  } catch (e) {
    next(e)
  }
}

async function logout(req, res, next) {
  const userId = req.user.id

  try {
    await userService.updateToken(userId, null)

    return await res.status(HttpCode.NO_CONTENT).json({
      status: 'No Content',
      code: HttpCode.NO_CONTENT
    })
  } catch (e) {
    next(e)
  }
}

async function updateSubscriptionUser(req, res, next) {
  const { userId } = req.params
  const { subscription } = req.body

  if (!('subscription' in req.body)) res.status(400).json({ message: 'Missing field ~subscription~' })

  try {
    await userService.updateSubscriptionUser(userId, req.body)

    return await res.status(HttpCode.OK).json({
      status: 'Ok',
      code: HttpCode.OK,
      data: {
        user: {
          userId,
          subscription
        }
      }
    })
  } catch (e) {
    next(e)
  }
}

module.exports = {
  signup,
  login,
  current,
  logout,
  updateSubscriptionUser
}