const { User } = require('./schema')

const findByEmail = async (email) => {
  return await User.findOne({ email })
}

const createUser = async ({ username, email, password }, avatarURL, verificationToken) => {
  const newUser = new User({ username, email, avatarURL, verificationToken })
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

const updateSubscription = async (id, subscription) => {
  return await User.findByIdAndUpdate(
    id,
    { $set: { subscription } },
    { new: true }
  )
}

const updateAvatar = async (id, newAvatarURL) => {
  return await User.findByIdAndUpdate(
    id,
    { $set: { avatarURL: newAvatarURL } },
    { new: true }
  )
}

const findByVerifyToken = async (verificationToken) => {
  return await User.findOne({ verificationToken })
}

const updateVerify = async (verificationToken) => {
  return await User.findOneAndUpdate(
    { verificationToken },
    {
      verify: true,
      verificationToken: null
    }
  )
}

module.exports = {
  findByEmail,
  findById,
  createUser,
  updateToken,
  updateSubscription,
  updateAvatar,
  findByVerifyToken,
  updateVerify,
}
