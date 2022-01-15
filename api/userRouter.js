const router = require('express').Router()

const { userController } = require('../controller')
const { authorizator } = require('../middleware')
const { validator } = require('../middleware')
const { asyncWrapper } = require('../middleware')

router.post('/signup', validator.validatorUser, asyncWrapper(userController.signup))

router.post('/login', validator.validatorUser, asyncWrapper(userController.login))

router.get('/current', authorizator, asyncWrapper(userController.current))

router.post('/logout', authorizator, asyncWrapper(userController.logout))

router.patch('/:userId/subscription', authorizator, validator.validatorUpdateUser, asyncWrapper(userController.updateSubscriptionUser))

module.exports = router
