const service = require('../service')

async function listContacts(req, res, next) {
  try {
    const result = await service.listContacts()

    return res.json(result)
  } catch (error) {
    next(error)
  }
}

async function getContactById(req, res, next) {
  try {
    const { contactId } = req.params
    const result = await service.getContactById(contactId)

    if (!result) throw new Error(`Not Found contact with id ${contactId}`)

    return res.json(result)
  } catch (error) {
    next(error)
  }
}

async function addContact(req, res, next) {
  try {
    const result = await service.addContact(req.body)

    return res.status(201).json(result)
  } catch (error) {
    next(error)
  }
}

async function removeContact(req, res, next) {
  try {
    const { contactId } = req.params
    const result = await service.removeContact(contactId)

    if (!result) throw new Error(`Not Found contact with id ${contactId}`)

    return res.json({ message: `✅ Contact id: ${contactId} deleted` })
  } catch (error) {
    next(error)
  }
}

async function updateContact(req, res, next) {
  try {
    const { contactId } = req.params
    const result = await service.updateContact(contactId, req.body)

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

    const result = await service.updateContact(contactId, req.body)

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
