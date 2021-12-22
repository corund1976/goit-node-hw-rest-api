const express = require('express')
const router = express.Router()

const contactsControllers = require('../../controllers/contactsControllers')
const contactsValidation = require('../../middlewares/contactsValidation')

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

module.exports = router
