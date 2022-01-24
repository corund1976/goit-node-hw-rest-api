const fs = require('fs').promises
const Jimp = require('jimp')
const path = require('path')

const TMP_FILES_DIR_NAME = path.join(process.cwd(), process.env.TMP_FILES_DIR_NAME)
const FILES_DIR_NAME = path.join(process.cwd(), process.env.FILES_DIR_NAME)

async function imageCompressor(req, res, next) {
  const file = await Jimp.read(req.file.path)
  const filePath = req.file.path.replace(TMP_FILES_DIR_NAME, FILES_DIR_NAME)

  await file.resize(250, 250).quality(70).writeAsync(filePath)
  await fs.promises.unlink(req.file.path)

  req.file.destination = req.file.destination.replace(TMP_FILES_DIR_NAME, FILES_DIR_NAME)
  req.path = filePath

  next()
}

module.exports = imageCompressor
