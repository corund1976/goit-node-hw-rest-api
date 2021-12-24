const service = require('../service')

async function listContacts(req, res) {
  const result = await service.listContacts()
  res.json(result)
}

async function getContactById(req, res) {
  const { contactId } = req.params
  const result = await service.getContactById(contactId)

  if (!result) throw new Error(`Not Found contact with id ${contactId}`)

  res.json(result)
}

async function addContact(req, res) {
  const result = await service.addContact(req.body)

  res.status(201).json(result)
}

async function removeContact(req, res) {
  const { contactId } = req.params
  const result = await service.removeContact(contactId)

  if (!result) throw new Error(`Not Found contact with id ${contactId}`)

  res.json({ message: `✅ Contact id: ${contactId} deleted` })
}

async function updateContact(req, res) {
  const { contactId } = req.params
  const result = await service.updateContact(contactId, req.body)

  if (!result) throw new Error(`Not Found contact with id ${contactId}`)

  res.json(result)
}

async function updateStatusContact(req, res) {
  const { contactId } = req.params
  const { favorite } = req.body

  if (!favorite) res.status(400).json({ message: 'Missing field ~favorite~' })

  const result = await service.updateContact(contactId, req.body)

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
