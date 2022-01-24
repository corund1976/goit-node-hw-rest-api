require('dotenv').config()
const path = require('path')
const uniqid = require('uniqid')
const multer = require('multer')

const TMP_FILES_DIR_NAME = path.join(process.cwd(), process.env.TMP_FILES_DIR_NAME)

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, TMP_FILES_DIR_NAME)
  },
  filename: function (req, file, cb) {
    const filename = uniqid() + path.extname(file.originalname)
    cb(null, filename)
  }
})

const upload = multer({
  storage: storage,
  limits: { fileSize: 2 * 1024 * 1024 },
  fileFilter: (req, file, cb) => {
    if (file.mimetype.includes('image')) {
      cb(null, true)
      return
    }
    const err = new Error('Формат загруженного изображения не корректный')
    err.status = 400
    cb(err)
  }
})

module.exports = upload
