const express = require('express')
const router = express.Router()

const controller = require('../controller')
const validator = require('../middleware/validation')

router.get('/', async (req, res, next) =>
  await controller.listContacts(req, res, next))

router.get('/:contactId', async (req, res, next) =>
  await controller.getContactById(req, res, next))

router.post('/', validator.validateAddContact, async (req, res, next) =>
  await controller.addContact(req, res, next))

router.delete('/:contactId', async (req, res, next) =>
  await controller.removeContact(req, res, next))

router.patch('/:contactId', validator.validateUpdateContact, async (req, res, next) =>
  await controller.updateContact(req, res, next))

router.patch('/:contactId/favorite', validator.validateUpdateContact, async (req, res, next) =>
  await controller.updateStatusContact(req, res, next))

module.exports = router
