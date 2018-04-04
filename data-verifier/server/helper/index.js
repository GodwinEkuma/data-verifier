import multer from 'multer';

const storage = multer.diskStorage({
    destination: (req, file, callback) => {
        callback(null, './uploads/');
    },
    filename: (req, file, callback) => {
        callback(null, new Date().toISOString() + file.originalname);
    }
});

const fileFilter = (req, file, callback) => {
    if (file.mimetype === 'application/json') {
      callback(null, true);
    } else {
      callback(null, false);
    }
  };

const upload = multer({
    storage,
    fileFilter
  });

  const jsonFile = (req, res, next) => {
      
  }