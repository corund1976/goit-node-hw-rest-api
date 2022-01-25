const router = require('express').Router()

const { userController } = require('../controller')
const { authorizator, validator, asyncWrapper, upload, imageCompressor } = require('../middleware')

router.post('/signup',
  validator.user,
  asyncWrapper(userController.signup))

router.post('/login',
  validator.user,
  asyncWrapper(userController.login))

router.get('/current',
  authorizator,
  asyncWrapper(userController.current))

router.post('/logout',
  authorizator,
  asyncWrapper(userController.logout))

router.patch('/:userId/subscription',
  authorizator,
  validator.updateUser,
  asyncWrapper(userController.updateSubscription))

router.patch('/avatars',
  authorizator,
  upload.single('avatar'),
  imageCompressor,
  asyncWrapper(userController.updateAvatar))

router.get('/verify/:verificationToken',
  asyncWrapper(userController.verify))

router.post('/verify',
  validator.postVerify,
  asyncWrapper(userController.repeatVerify))

module.exports = router
