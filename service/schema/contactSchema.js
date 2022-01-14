const mongoosePaginate = require('mongoose-paginate-v2')

const mongoose = require('../dbConnection')
const { Schema, model, SchemaTypes } = mongoose

const contactSchema = new Schema({
  name: {
    type: String,
    required: [true, 'Set name for contact'],
  },
  email: {
    type: String,
    min: 5,
    max: 100
  },
  phone: {
    type: String,
    min: 5,
    max: 15,
    require: [true, 'Set phone number for contact']
  },
  favorite: {
    type: Boolean,
    default: false,
  },
  owner: {
    type: SchemaTypes.ObjectId,
    ref: 'user',
  },
})

contactSchema.plugin(mongoosePaginate)

const Contact = model('contact', contactSchema)

module.exports = Contact
