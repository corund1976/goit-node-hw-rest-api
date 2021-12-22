const { ContactModel } = require('../db/model')

const listContacts = async () => {
  return await ContactModel.find({})
}

const getContactById = async (contactId) => {
  return await ContactModel.findById(contactId)
}

const addContact = async (body) => {
  const newContact = new ContactModel(body)
  await newContact.save()
  return newContact
}

const removeContact = async (contactId) => {
  return await ContactModel.findByIdAndDelete(contactId)
}

const updateContact = async (contactId, body) => {
  return await ContactModel.findByIdAndUpdate(
    contactId,
    {
      $set: body,
    },
    { new: true }
  )
}

const updateStatusContact = async (contactId, body) => {
  const { favorite } = body
  return await ContactModel.findByIdAndUpdate(
    contactId,
    {
      $set: { favorite },
    },
    { new: true }
  )
}

module.exports = {
  listContacts,
  getContactById,
  addContact,
  removeContact,
  updateContact,
  updateStatusContact,
}
