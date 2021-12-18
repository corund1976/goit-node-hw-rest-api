const express = require('express')
const router = express.Router()

const { validateAddContact, validateUpdateContact } = require('../../middlewares/validation')

const {
  listContacts,
  getContactById,
  removeContact,
  addContact,
  updateContact,
} = require('../../model/index')

router.get('/', async (req, res, next) => {
  try {
    const result = await listContacts()

    if (typeof result === 'string') return res.status(500).json(result)

    return res.json(result)
  } catch (error) {
    next(error)
  }
})

router.get('/:contactId', async (req, res, next) => {
  try {
    const result = await getContactById(req.params.contactId)

    if (typeof result === 'string') return res.status(500).json(result)

    return res.json(result)
  } catch (error) {
    next(error)
  }
})

router.post('/', validateAddContact, async (req, res, next) => {
  try {
    const result = await addContact(req.body)

    if (typeof result === 'string') return res.status(500).json(result)

    return res.status(201).json(result)
  } catch (error) {
    next(error)
  }
})

router.delete('/:contactId', async (req, res, next) => {
  try {
    const result = await removeContact(req.params.contactId)

    if (typeof result === 'string') return res.status(500).json(result)

    return res.json({ message: `✅ Contact id: ${req.params.contactId} deleted` })
  } catch (error) {
    next(error)
  }
})

router.patch('/:contactId', validateUpdateContact, async (req, res, next) => {
  try {
    const result = await updateContact(req.params.contactId, req.body)

    if (typeof result === 'string') return res.status(500).json(result)

    return res.json(result)
  } catch (error) {
    next(error)
  }
})

module.exports = router
