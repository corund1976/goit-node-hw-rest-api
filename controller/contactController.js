const { contactService } = require('../service')

async function listContacts(req, res) {
  const userId = req.user?.id
  const result = await contactService.listContacts(userId, req.query)
  res.json(result)
}

async function getContactById(req, res) {
  const { contactId } = req.params
  const userId = req.user?.id
  const result = await contactService.getContactById(userId, contactId)

  if (!result) throw new Error(`Not Found contact with id ${contactId}`)

  res.json(result)
}

async function addContact(req, res) {
  const userId = req.user?.id
  const result = await contactService.addContact(userId, req.body)

  res.status(201).json(result)
}

async function removeContact(req, res) {
  const { contactId } = req.params
  const userId = req.user?.id
  const result = await contactService.removeContact(userId, contactId)

  if (!result) throw new Error(`Not Found contact with id ${contactId}`)

  res.json({ message: `✅ Contact id: ${contactId} deleted` })
}

async function updateContact(req, res) {
  const { contactId } = req.params
  const userId = req.user?.id
  const result = await contactService.updateContact(userId, contactId, req.body)

  if (!result) throw new Error(`Not Found contact with id ${contactId}`)

  res.json(result)
}

async function updateStatusContact(req, res) {
  const { contactId } = req.params
  const userId = req.user?.id

  if (!('favorite' in req.body)) {
    return res.status(400).json({ message: 'Missing field ~favorite~' })
  }

  const result = await contactService.updateContact(userId, contactId, req.body)

  if (!result) throw new Error(`Not Found contact with id ${contactId}`)

  res.json(result)
}

module.exports = {
  listContacts,
  getContactById,
  removeContact,
  addContact,
  updateContact,
  updateStatusContact,
}
