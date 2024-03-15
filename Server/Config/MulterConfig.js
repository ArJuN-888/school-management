const fs = require('fs').promises;
const multer = require('multer');

const dir = 'public/uploads';

const storage = multer.diskStorage({
  destination: async (req, file, callback) => {
    try {
      await fs.mkdir(dir, { recursive: true });
      callback(null, dir);
    } catch (error) {
      callback(error, dir);
    }
  },
  filename: (req, file, callback) => {
    const name = file.originalname.split(' ').join('_');
    const extension = file.originalname.split('.').pop(); // Extract extension directly from the filename
    callback(null, Date.now() + '.' + extension);
  },
});

const fileFilter = (req, file, cb) => {
  if (file.size === 0) {
    // If file is empty, reject it with an error
    cb(new Error('File is empty'), false);
  } else {
    cb(null, true); // Accept all other files
  }
};

module.exports = multer({
  storage: storage,
  limits: {
    fileSize: 200000000, // Adjust as needed
  },
  fileFilter,
}).single('file');
