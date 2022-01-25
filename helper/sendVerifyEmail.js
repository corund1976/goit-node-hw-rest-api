const sgMail = require('@sendgrid/mail')
require('dotenv').config()

async function sendVerifyEmail(email, verificationToken, next) {
  sgMail.setApiKey(process.env.SENDGRID_API_KEY)

  const verificationLink = `${process.env.API_BASE_URL}/users/verify/${verificationToken}`

  try {
    await sgMail.send({
      from: process.env.SENDGRID_SENDER_EMAIL,
      to: email,
      subject: 'Email verification needed',
      html: `<a href='${verificationLink}'>Verify email</a>`,
    })
  } catch (error) {
    next(error)
  }
}

module.exports = sendVerifyEmail
