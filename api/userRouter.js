const router = require('express').Router()

const { userController } = require('../controller')
const { authorizator, validator, asyncWrapper, upload, imageCompressor } = require('../middleware')

router.post('/signup',
  validator.validatorUser,
  asyncWrapper(userController.signup))

router.post('/login',
  validator.validatorUser,
  asyncWrapper(userController.login))

router.get('/current',
  authorizator,
  asyncWrapper(userController.current))

router.post('/logout',
  authorizator,
  asyncWrapper(userController.logout))

router.patch('/:userId/subscription',
  authorizator,
  validator.validatorUpdateUser,
  asyncWrapper(userController.updateSubscription))

router.patch('/avatars',
  authorizator,
  upload.single('avatar'),
  imageCompressor,
  asyncWrapper(userController.updateAvatar))

module.exports = router
