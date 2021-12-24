const express = require('express')
const router = express.Router()

const { asyncWrapper } = require('../helper/apiHelper')
const controller = require('../controller')
const validator = require('../middleware/validation')

router.get('/', asyncWrapper(controller.listContacts))

router.get('/:contactId', asyncWrapper(controller.getContactById))

router.post('/', validator.validateAddContact, asyncWrapper(controller.addContact))

router.delete('/:contactId', asyncWrapper(controller.removeContact))

router.patch('/:contactId', validator.validateUpdateContact, asyncWrapper(controller.updateContact))

router.patch('/:contactId/favorite', validator.validateUpdateContact, asyncWrapper(controller.updateStatusContact))

module.exports = router
