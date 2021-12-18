const Joi = require('joi')

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
}).or('name', 'email', 'phone')

async function validate(schema, obj, next) {
  try {
    await schema.validateAsync(obj)
    return next()
  } catch (err) {
    next({ status: 400, message: err.message.replace(/"/g, "~") })
  }
}

async function validateAddContact(req, res, next) {
  return await validate(schemaAddContact, req.body, next)
}

async function validateUpdateContact(req, res, next) {
  return await validate(schemaUpdateContact, req.body, next)
}

module.exports = {
  validateAddContact,
  validateUpdateContact
}

// function validateAddContact(req, res, next) {
//   const validationResult = schemaAddContact.validate(req.body)
//   if (validationResult.error) return
//     res.status(400).json({ message: `🚫 Missing required ${error.details[0]?.context?.label} field` })
//   next()
// }

// function validateUpdateContact(req, res, next) {
//   const validationResult = schemaAddContact.validate(req.body)
//   if (validationResult.error) return
//     res.status(400).json({ message: '🚫 Missing fields' })
//   next()
// }
