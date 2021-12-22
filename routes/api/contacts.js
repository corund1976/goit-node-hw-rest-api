const express = require('express')
const router = express.Router()

const contactsControllers = require('../../controllers/controllers')
const contactsValidation = require('../../middlewares/validation')

router.get('/', async (req, res, next) =>
  await contactsControllers.listContacts(req, res, next))

router.get('/:contactId', async (req, res, next) =>
  await contactsControllers.getContactById(req, res, next))

router.post('/', contactsValidation.validateAddContact, async (req, res, next) =>
  await contactsControllers.addContact(req, res, next))

router.delete('/:contactId', async (req, res, next) =>
  await contactsControllers.removeContact(req, res, next))

router.patch('/:contactId', contactsValidation.validateUpdateContact, async (req, res, next) =>
  await contactsControllers.updateContact(req, res, next))

router.patch('/:contactId/favorite', contactsValidation.validateUpdateContact, async (req, res, next) =>
  await contactsControllers.updateStatusContact(req, res, next))

module.exports = router
