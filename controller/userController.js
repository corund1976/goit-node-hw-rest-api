const jwt = require('jsonwebtoken')
const gravatar = require('gravatar')
const { nanoid } = require('nanoid')
require('dotenv').config()

const { userService } = require('../service')
const HttpCode = require('../helper/httpCode')
const sendVerifyEmail = require('../helper/sendVerifyEmail')

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
    const avatarURL = gravatar.url(email, { s: 250 }, true)
    const verificationToken = nanoid()
    const newUser = await userService.createUser(req.body, avatarURL, verificationToken)

    await sendVerifyEmail(email, verificationToken, next)

    return res.status(HttpCode.CREATED).json({
      status: 'Created',
      code: HttpCode.CREATED,
      data: {
        user: {
          id: newUser.id,
          username: newUser.username,
          email: newUser.email,
          subscription: newUser.subscription,
        }
      }
    })
  } catch (error) {
    next(error)
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

  if (!user.verify) {
    return await res.status(HttpCode.UNAUTHORIZED).json({
      status: 'Unauthorized',
      code: HttpCode.UNAUTHORIZED,
      message: 'Email not verified'
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
          id: user.id,
          username: user.username,
          email: user.email,
          subscription: user.subscription,
          avatarURL: user.avatarURL
        }
      }
    })
  } catch (error) {
    next(error)
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
  } catch (error) {
    next(error)
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
  } catch (error) {
    next(error)
  }
}

async function updateSubscription(req, res, next) {
  const { userId } = req.params
  const { subscription } = req.body

  if (!('subscription' in req.body)) res.status(400).json({ message: 'Missing field ~subscription~' })

  try {
    await userService.updateSubscription(userId, subscription)

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
  } catch (error) {
    next(error)
  }
}

async function updateAvatar(req, res, next) {
  const userId = req.user.id
  const newAvatarURL = `/avatars/${req.file.filename}`

  try {
    await userService.updateAvatar(userId, newAvatarURL)

    return await res.status(HttpCode.OK).json({
      status: 'Ok',
      code: HttpCode.OK,
      data: {
        user: {
          newAvatarURL,
        }
      }
    })
  } catch (error) {
    next(error)
  }
}

const verify = async (req, res, next) => {
  try {
    const { verificationToken } = req.params

    const user = await userService.findByVerifyToken(verificationToken)

    if (user) {
      await userService.updateVerify(verificationToken)

      return res.status(HttpCode.OK).json({
        status: 'success',
        code: HttpCode.OK,
        message: 'Verification successful'
      })
    }

    return res.status(HttpCode.NOT_FOUND).json({
      status: 'error',
      code: HttpCode.NOT_FOUND,
      message: 'Not found'
    })
  } catch (error) {
    next(error)
  }
}

const repeatVerify = async (req, res, next) => {
  try {
    const { email } = req.body
    const user = await userService.findByEmail(email)

    if (user.verify) {
      return res.status(HttpCode.BAD_REQUEST).json({
        status: 'error',
        code: HttpCode.BAD_REQUEST,
        message: 'Verification has already been passed'
      })
    }

    if (user) {
      const { verificationToken } = user

      await sendVerifyEmail(email, verificationToken, next)

      return res.status(HttpCode.OK).json({
        status: 'success',
        code: HttpCode.OK,
        data: {
          message: 'Verification email resubmitted'
        }
      })
    }

    return res.status(HttpCode.NOT_FOUND).json({
      status: 'error',
      code: HttpCode.NOT_FOUND,
      message: 'User not found'
    })
  } catch (error) {
    next(error)
  }
}

module.exports = {
  signup,
  login,
  current,
  logout,
  updateSubscription,
  updateAvatar,
  verify,
  repeatVerify,
}
