const router = require('express').Router()

const { contactController } = require('../controller')
const { authorizator, validator, asyncWrapper } = require('../middleware')

router.get('/', authorizator, validator.queryPagination, asyncWrapper(contactController.listContacts))

router.get('/:contactId', authorizator, validator.objectId, asyncWrapper(contactController.getContactById))

router.post('/', authorizator, validator.addContact, asyncWrapper(contactController.addContact))

router.delete('/:contactId', authorizator, asyncWrapper(contactController.removeContact))

router.patch('/:contactId', authorizator, validator.updateContact, asyncWrapper(contactController.updateContact))

router.patch('/:contactId/favorite', authorizator, validator.updateContact, asyncWrapper(contactController.updateStatusContact))

module.exports = router
