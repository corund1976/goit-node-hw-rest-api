const router = require('express').Router()

const { contactController } = require('../controller')
const { asyncWrapper } = require('../middleware')
const { validator } = require('../middleware')
const { authorizator } = require('../middleware')

router.get('/', authorizator, validator.validatorQueryPagination, asyncWrapper(contactController.listContacts))

router.get('/:contactId', authorizator, validator.validatorObjectId, asyncWrapper(contactController.getContactById))

router.post('/', authorizator, validator.validatorAddContact, asyncWrapper(contactController.addContact))

router.delete('/:contactId', authorizator, asyncWrapper(contactController.removeContact))

router.patch('/:contactId', authorizator, validator.validatorUpdateContact, asyncWrapper(contactController.updateContact))

router.patch('/:contactId/favorite', authorizator, validator.validatorUpdateContact, asyncWrapper(contactController.updateStatusContact))

module.exports = router
