const express = require('express')
const Joi = require('joi')
const router = express.Router()

const {
  listContacts,
  getContactById,
  removeContact,
  addContact,
  updateContact,
} = require('../../model/index')

function validateAddContact(req, res, next) {
  const schema = Joi.object({
    name: Joi.string()
      .min(3)
      .max(30)
      .required(),
    email: Joi.string()
      .email()
      .required(),
    phone: Joi.string()
      .min(6)
      .max(15)
      .required(),
  })

  const { error } = schema.validate(req.body)

  if (error) {
    return res.status(400).json({
      message: `🚫 Missing required ${error.details[0]?.context?.label} field`
    })
  }

  next()
}

function validateUpdateContact(req, res, next) {
  const schema = Joi.object({
    name: Joi.string()
      .min(3)
      .max(30),
    email: Joi.string()
      .email(),
    phone: Joi.string()
      .min(6)
      .max(15),
  }).or('name', 'email', 'phone')

  const { error } = schema.validate(req.body)

  if (error) return res.status(400).json({ message: '🚫 Missing fields' })

  next()
}

router.get('/', async (req, res, next) => {
  const contacts = await listContacts()

  if (contacts) return res.json(contacts)

  next()
})

router.get('/:contactId', async (req, res, next) => {
  const contactId = req.params.contactId
  const contactById = await getContactById(contactId)

  if (contactById) return res.json(contactById)

  next()
})

router.post('/', validateAddContact, async (req, res, next) => {
  const addedContact = await addContact(req.body)

  if (addedContact) return res.status(201).json(addedContact)

  next()
})

router.delete('/:contactId', async (req, res, next) => {
  const contactId = req.params.contactId
  const result = await removeContact(contactId)

  if (result === 'Ok') return res.json({ message: `✅ Contact id: ${contactId} deleted` })

  next()
})

router.patch('/:contactId', validateUpdateContact, async (req, res, next) => {
  const contactId = req.params.contactId
  const updatedContact = await updateContact(contactId, req.body)

  if (updatedContact) return res.json(updatedContact)

  next()
})

module.exports = router
