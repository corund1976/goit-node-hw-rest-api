const { User } = require('./schema')

const findByEmail = async (email) => {
  return await User.findOne({ email })
}

const createUser = async ({ username, email, password }) => {
  const newUser = new User({ username, email })
  newUser.setPassword(password)
  return await newUser.save()
}

const findById = async (id) => {
  return await User.findById(id)
}

const updateToken = async (id, token) => {
  return await User.findByIdAndUpdate(
    id,
    { $set: { token } },
    { new: true }
  )
}

const updateSubscriptionUser = async (id, subscription) => {
  return await User.findByIdAndUpdate(
    id,
    { $set: { subscription } },
    { new: true }
  )
}

module.exports = {
  findByEmail,
  findById,
  createUser,
  updateToken,
  updateSubscriptionUser
}
