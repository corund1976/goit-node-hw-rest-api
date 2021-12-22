const contactsOperations = require('../model/contactsOperations')

async function listContacts(req, res, next) {
  try {
    const result = await contactsOperations.listContacts()

    if (typeof result === 'string') return res.status(500).json(result)

    return res.json(result)
  } catch (error) {
    next(error)
  }
}

async function getContactById(req, res, next) {
  try {
    const result = await contactsOperations.getContactById(req.params.contactId)

    if (typeof result === 'string') return res.status(500).json(result)

    return res.json(result)
  } catch (error) {
    next(error)
  }
}

async function addContact(req, res, next) {
  try {
    const result = await contactsOperations.addContact(req.body)

    if (typeof result === 'string') return res.status(500).json(result)

    return res.status(201).json(result)
  } catch (error) {
    next(error)
  }
}

async function removeContact(req, res, next) {
  try {
    const result = await contactsOperations.removeContact(req.params.contactId)

    if (typeof result === 'string') return res.status(500).json(result)

    return res.json({ message: `✅ Contact id: ${req.params.contactId} deleted` })
  } catch (error) {
    next(error)
  }
}

async function updateContact(req, res, next) {
  try {
    const result = await contactsOperations.updateContact(req.params.contactId, req.body)

    if (typeof result === 'string') return res.status(500).json(result)

    return res.json(result)
  } catch (error) {
    next(error)
  }
}

module.exports = {
  listContacts,
  getContactById,
  removeContact,
  addContact,
  updateContact,
}
