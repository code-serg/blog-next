import multer from 'multer';

export const profileImageUpload = multer({
  limits: {
    fileSize: 5 * 1024 * 1024, // 5 MB
  },
  fileFilter(req, file, callback) {
    if (file.mimetype === 'image/png' || file.mimetype === 'image/jpeg') {
      callback(null, true);
    } else {
      callback(new Error('Only PNG and JPEG images are allowed'));
    }
  },
});

export const featuredImageUpload = multer({
  limits: {
    fileSize: 5 * 1024 * 1024, // 5 MB
  },
  fileFilter(req, file, callback) {
    if (file.mimetype === 'image/png' || file.mimetype === 'image/jpeg') {
      callback(null, true);
    } else {
      callback(new Error('Only PNG and JPEG images are allowed'));
    }
  },
});
