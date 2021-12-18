const fs = require('fs/promises')
const path = require('path')
const { nanoid } = require('nanoid')
// const contacts = require('./contacts.json')

const contactsPath = path.join(__dirname, './contacts.json')

const listContacts = async () => {
  try {
    const readFileResult = await fs.readFile(contactsPath, 'utf8')
    if (!readFileResult) throw new Error('🚫 Cannot read file to List contacts')

    const contacts = JSON.parse(readFileResult)
    if (!contacts) throw new Error('🚫 Cannot parse .json & get contacts list')

    return contacts
  } catch (err) {
    return err.message
  }
}

const getContactById = async (contactId) => {
  try {
    const contacts = await listContacts()
    const contactById = contacts.find(item => item.id.toString() === contactId)

    if (!contactById) throw new Error(`🚫 Cannot find contact to Get by id: ${contactId}`)

    return contactById
  } catch (err) {
    return err.message
  }
}

const removeContact = async (contactId) => {
  try {
    const contacts = await listContacts()
    const contactToRemove = contacts.find(contact => contact.id.toString() === contactId)

    if (!contactToRemove) throw new Error(`🚫 Cannot find contact id: ${contactId} to Remove`)

    const indexOfContactToRemove = contacts.indexOf(contactToRemove)

    contacts.splice(indexOfContactToRemove, 1)

    await fs.writeFile(contactsPath, JSON.stringify(contacts), (err) => {
      if (err) throw new Error('🚫 Write file failure while Removing contact')

      console.log('✅ Contact removed & file writed successfully')
    })
    return
  } catch (err) {
    return err.message
  }
}

const addContact = async (body) => {
  try {
    const contacts = await listContacts()
    const contactToAdd = {
      id: nanoid(),
      ...body
    }

    if (!contactToAdd) throw new Error('🚫 Cannot create new contact')

    contacts.push(contactToAdd)

    await fs.writeFile(contactsPath, JSON.stringify(contacts), (err) => {
      if (err) throw new Error('🚫 Write file failure while Adding contact')

      console.log('✅ Contact added & file writed successfully')
    })
    return contactToAdd
  } catch (err) {
    return err.message
  }
}

const updateContact = async (contactId, body) => {
  try {
    const contacts = await listContacts()
    const contactToUpdate = contacts.find(contact => contact.id.toString() === contactId)

    if (!contactToUpdate) throw new Error(`🚫 Cannot find contact id: ${contactId} to Update`)

    const indexOfContactToUpdate = contacts.indexOf(contactToUpdate)
    const updatedContact = { ...contactToUpdate, ...body, id: contacts[indexOfContactToUpdate].id }

    contacts.splice(indexOfContactToUpdate, 1, updatedContact)

    await fs.writeFile(contactsPath, JSON.stringify(contacts), (err) => {
      if (err) throw new Error('🚫 Write file failure while Updating contact')

      console.log('✅ Contact updated & file writed successfully')
    })
    return updatedContact
  } catch (err) {
    return err.message
  }
}

module.exports = {
  listContacts,
  getContactById,
  removeContact,
  addContact,
  updateContact,
}
