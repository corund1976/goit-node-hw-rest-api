const mongoose = require('../dbConnection')
const { Schema, model } = mongoose

const bcrypt = require('bcryptjs')
const SALT_FACTOR = 6

const userSchema = new Schema({
  username: {
    type: String,
    minlength: 2,
    default: 'Guest'
  },
  password: {
    type: String,
    required: [true, 'Password is required'],
  },
  email: {
    type: String,
    required: [true, 'Email is required'],
    unique: true,
    validate(value) {
      const re = /\S+@\S+\.\S+/
      return re.test(String(value).toLocaleLowerCase())
    }
  },
  subscription: {
    type: String,
    enum: ['starter', 'pro', 'business'],
    default: 'starter'
  },
  token: {
    type: String,
    default: null,
  },
  avatarURL: String,
})

// userSchema.pre('save', async function (next) {
//   if (this.isModified('password')) {
//     const salt = bcryptjs.genSaltSync(SALT_FACTOR)
//     this.password = await bcryptjs.hash(this.password, salt)
//   }
//   next()
// })
userSchema.methods.setPassword = function (password) {
  this.password = bcrypt.hashSync(password, bcrypt.genSaltSync(SALT_FACTOR))
}

userSchema.methods.validPassword = function (password) {
  return bcrypt.compareSync(String(password), this.password)
}

const User = model('user', userSchema)

module.exports = User
