const User = require('./schemas/userSchema')

const findByEmail = async (email) => {
  return await User.findOne({ email })
}

const createUser = async ({ username, email, password }) => {
  const newUser = new User({ username, email })

  newUser.setPassword(password)

  return await newUser.save()
}

const findById = async (id) => {
  return await User.findOne({ _id: id })
}

const updateToken = async (id, token) => {
  return await User.updateOne({ _id: id }, { token })
}

module.exports = {
  findByEmail,
  findById,
  createUser,
  updateToken
}
