const router = require('express').Router()

const controller = require('../controller/contactController')
const { asyncWrapper } = require('../helper/apiHelper')
const {
  validatorQueryPagination,
  validatorObjectId,
  validatorAddContact,
  validatorUpdateContact
} = require('../middleware/validation')
const authorizator = require('../middleware/authorization')

router.get('/', authorizator, validatorQueryPagination, asyncWrapper(controller.listContacts))

router.get('/:contactId', authorizator, validatorObjectId, asyncWrapper(controller.getContactById))

router.post('/', authorizator, validatorAddContact, asyncWrapper(controller.addContact))

router.delete('/:contactId', authorizator, asyncWrapper(controller.removeContact))

router.patch('/:contactId', authorizator, validatorUpdateContact, asyncWrapper(controller.updateContact))

router.patch('/:contactId/favorite', authorizator, validatorUpdateContact, asyncWrapper(controller.updateStatusContact))

module.exports = router
