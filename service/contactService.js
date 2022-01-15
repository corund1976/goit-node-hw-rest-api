const { Contact } = require('./schema')

const listContacts = async (userId, query) => {
  const {
    sortBy, sortByDesc, filter, favorite = false, limit = 5, offset = 0
  } = query
  const optionsSearch = { owner: userId }

  if (favorite !== null) {
    optionsSearch.favorite = favorite
  }

  return await Contact.paginate(optionsSearch,
    {
      limit,
      offset,
      sort: {
        ...(sortBy ? { [`${sortBy}`]: 1 } : {}),
        ...(sortByDesc ? { [`${sortByDesc}`]: -1 } : {})
      },
      select: filter ? filter.split('|').join(' ') : '',
      populate: {
        path: 'owner',
        select: 'name email gender -_id'
      }
    }
  )
}

const getContactById = async (userId, contactId) => {
  return await Contact.findOne({ _id: contactId, owner: userId }).populate({
    path: 'owner',
    select: 'name email subscription -_id'
  })
}

const addContact = async (userId, body) => {
  return await Contact.create({ ...body, owner: userId })
}

const removeContact = async (userId, contactId) => {
  return await Contact.findByIdAndRemove({ _id: contactId, owner: userId })
}

const updateContact = async (userId, contactId, body) => {
  return await Contact.findByIdAndUpdate(
    { _id: contactId, owner: userId },
    { $set: body },
    { new: true }
  )
}

const updateStatusContact = async (userId, contactId, body) => {
  const { favorite } = body
  return await Contact.findByIdAndUpdate(
    { _id: contactId, owner: userId },
    { $set: { favorite } },
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
