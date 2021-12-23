const Contact = require('./schemas/contact')

const listContacts = async () => {
  return await Contact.find({})
}

const getContactById = async (contactId) => {
  return await Contact.findById(contactId)
}

const addContact = async (body) => {
  const newContact = new Contact(body)
  await newContact.save()
  return newContact
}

const removeContact = async (contactId) => {
  return await Contact.findByIdAndDelete(contactId)
}

const updateContact = async (contactId, body) => {
  return await Contact.findByIdAndUpdate(
    contactId,
    {
      $set: body,
    },
    { new: true }
  )
}

const updateStatusContact = async (contactId, body) => {
  const { favorite } = body
  return await Contact.findByIdAndUpdate(
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
