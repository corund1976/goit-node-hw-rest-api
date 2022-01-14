const service = require('../service/contactService')

async function listContacts(req, res) {
  const userId = req.user?.id
  const result = await service.listContacts(userId, req.query)
  res.json(result)
}

async function getContactById(req, res) {
  const { contactId } = req.params
  const userId = req.user?.id
  const result = await service.getContactById(userId, contactId)

  if (!result) throw new Error(`Not Found contact with id ${contactId}`)

  res.json(result)
}

async function addContact(req, res) {
  const userId = req.user?.id
  const result = await service.addContact(userId, req.body)

  res.status(201).json(result)
}

async function removeContact(req, res) {
  const { contactId } = req.params
  const userId = req.user?.id
  const result = await service.removeContact(userId, contactId)

  if (!result) throw new Error(`Not Found contact with id ${contactId}`)

  res.json({ message: `✅ Contact id: ${contactId} deleted` })
}

async function updateContact(req, res) {
  const { contactId } = req.params
  const userId = req.user?.id
  const result = await service.updateContact(userId, contactId, req.body)

  if (!result) throw new Error(`Not Found contact with id ${contactId}`)

  res.json(result)
}

async function updateStatusContact(req, res) {
  const { contactId } = req.params
  const userId = req.user?.id
  const { favorite } = req.body

  if (!favorite) res.status(400).json({ message: 'Missing field ~favorite~' })

  const result = await service.updateContact(userId, contactId, req.body)

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
