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
  sortBy: Joi.string().valid('name', 'subscription', 'id', 'phone').optional(),
  sortByDesc: Joi.string().valid('name', 'subscription', 'id', 'phone').optional(),
  filter: Joi.string().optional(),
  limit: Joi.number().integer().min(1).max(50).optional(),
  offset: Joi.number().integer().min(1).optional(),
  favorite: Joi.boolean().optional(),
}).without('sortBy', 'sortByDesc')

async function validate(schema, obj, next) {
  try {
    await schema.validateAsync(obj)
    return next()
  } catch (err) {
    next({ status: 400, message: err.message.replace(/"/g, '~') })
  }
}

async function validatorAddContact(req, res, next) {
  return await validate(schemaAddContact, req.body, next)
}

async function validatorUpdateContact(req, res, next) {
  return await validate(schemaUpdateContact, req.body, next)
}

async function validatorUser(req, res, next) {
  return await validate(schemaUser, req.body, next)
}

async function validatorUpdateUser(req, res, next) {
  return await validate(schemaUpdateUser, req.body, next)
}

async function validatorQueryPagination(req, res, next) {
  return await validate(schemaQueryPagination, req.query, next)
}

async function validatorObjectId(req, res, next) {
  if (!mongoose.Types.ObjectId.isValid(req.params.contactId)) {
    return next({ status: 400, message: 'Inavalid Object Id' })
  }
  next()
}

module.exports = {
  validatorAddContact,
  validatorUpdateContact,
  validatorUser,
  validatorUpdateUser,
  validatorQueryPagination,
  validatorObjectId
}
