const crypto = require('crypto');
const multer = require('multer');
const path = require('path');
const fs = require('fs');

exports.multerFactory = ({ ENV } = {}) => {
  return {
    multer: ({ folder } = {}) => {
      const finalPath = path.join(ENV.TEMP_FOLDER, folder);
      if (!fs.existsSync(finalPath)) {
        fs.mkdirSync(finalPath);
      }

      return {
        multerConfig: {
          dest: finalPath,
          storage: multer.diskStorage({
            destination: (req, file, cb) => {
              cb(null, finalPath);
            },
            filename: (req, file, cb) => {
              crypto.randomBytes(16, (err, hash) => {
                if (err) {
                  cb(err);
                }
                file.key = `${hash.toString('hex')}-${file.originalname}`;
                cb(null, file.key);
              });
            },
          }),
        },
      };
    },
  };
};
