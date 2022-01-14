const router = require('express').Router()

const controller = require('../controller/userController')
const { asyncWrapper } = require('../helper/apiHelper')
const { validatorUser } = require('../middleware/validation')
const authorizator = require('../middleware/authorization')

router.post('/signup', validatorUser, asyncWrapper(controller.signup))

router.post('/login', validatorUser, asyncWrapper(controller.login))

router.get('/current', authorizator, asyncWrapper(controller.current))

router.post('/logout', authorizator, asyncWrapper(controller.logout))

// router.patch('/users', )

module.exports = router
