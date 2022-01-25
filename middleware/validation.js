const Joi = require('joi')
const mongoose = require('mongoose')

const schemaAddContact = Joi.object({
  name: Joi.string()
    .min(3)
    .max(30)
    .required(),
  email: Joi.string()
    .email()
    .required(),
  phone: Joi.string()
    .min(6)
    .max(15)
    .required(),
  favorite: Joi.bool()
})

const schemaUpdateContact = Joi.object({
  name: Joi.string()
    .min(3)
    .max(30),
  email: Joi.string()
    .email(),
  phone: Joi.string()
    .min(6)
    .max(15),
  favorite: Joi.bool()
}).or('name', 'email', 'phone', 'favorite')

const schemaUser = Joi.object({
  username: Joi.string()
    .min(3)
    .max(30),
  email: Joi.string()
    .email()
    .required(),
  password: Joi.string()
    .required(),
  subscription: ['starter', 'pro', 'business']
})

const schemaUpdateUser = Joi.object({
  username: Joi.string()
    .min(3)
    .max(30),
  email: Joi.string()
    .email(),
  password: Joi.string(),
  subscription: ['starter', 'pro', 'business']
}).or('username', 'email', 'password', 'subscription')

const schemaQueryPagination = Joi.object({
  sortBy: Joi.string()
    .valid('name', 'subscription', 'id', 'phone')
    .optional(),
  sortByDesc: Joi.string()
    .valid('name', 'subscription', 'id', 'phone')
    .optional(),
  filter: Joi.string()
    .optional(),
  limit: Joi.number()
    .integer()
    .min(1)
    .max(50)
    .optional(),
  offset: Joi.number()
    .integer()
    .min(1)
    .optional(),
  favorite: Joi.boolean()
    .optional(),
}).without('sortBy', 'sortByDesc')

const schemaPostVerify = Joi.object({
  email: Joi.string()
    .email()
    .required(),
})

async function validate(schema, obj, next) {
  try {
    await schema.validateAsync(obj)
    return next()
  } catch (err) {
    next({ status: 400, message: err.message.replace(/"/g, '~') })
  }
}

async function addContact(req, res, next) {
  return await validate(schemaAddContact, req.body, next)
}

async function updateContact(req, res, next) {
  return await validate(schemaUpdateContact, req.body, next)
}

async function user(req, res, next) {
  return await validate(schemaUser, req.body, next)
}

async function updateUser(req, res, next) {
  return await validate(schemaUpdateUser, req.body, next)
}

async function queryPagination(req, res, next) {
  return await validate(schemaQueryPagination, req.query, next)
}

async function objectId(req, res, next) {
  if (!mongoose.Types.ObjectId.isValid(req.params.contactId)) {
    return next({ status: 400, message: 'Inavalid Object Id' })
  }
  next()
}

async function postVerify(req, res, next) {
  return await validate(schemaPostVerify, req.body, next)
}

module.exports = {
  addContact,
  updateContact,
  user,
  updateUser,
  queryPagination,
  objectId,
  postVerify,
}
