const contactsOperations = require('../model')

async function listContacts(req, res, next) {
  try {
    const result = await contactsOperations.listContacts()

    return res.json(result)
  } catch (error) {
    next(error)
  }
}

async function getContactById(req, res, next) {
  try {
    const { contactId } = req.params
    const result = await contactsOperations.getContactById(contactId)

    if (!result) throw new Error(`Not Found contact with id ${contactId}`)

    return res.json(result)
  } catch (error) {
    next(error)
  }
}

async function addContact(req, res, next) {
  try {
    const result = await contactsOperations.addContact(req.body)

    return res.status(201).json(result)
  } catch (error) {
    next(error)
  }
}

async function removeContact(req, res, next) {
  try {
    const { contactId } = req.params
    const result = await contactsOperations.removeContact(contactId)

    if (!result) throw new Error(`Not Found contact with id ${contactId}`)

    return res.json({ message: `✅ Contact id: ${contactId} deleted` })
  } catch (error) {
    next(error)
  }
}

async function updateContact(req, res, next) {
  try {
    const { contactId } = req.params
    const result = await contactsOperations.updateContact(contactId, req.body)

    if (!result) throw new Error(`Not Found contact with id ${contactId}`)

    return res.json(result)
  } catch (error) {
    next(error)
  }
}

async function updateStatusContact(req, res, next) {
  try {
    const { contactId } = req.params
    const { favorite } = req.body

    if (!favorite) res.status(400).json({ message: 'Missing field ~favorite~' })

    const result = await contactsOperations.updateContact(contactId, req.body)

    if (!result) throw new Error(`Not Found contact with id ${contactId}`)

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
  updateStatusContact,
}
