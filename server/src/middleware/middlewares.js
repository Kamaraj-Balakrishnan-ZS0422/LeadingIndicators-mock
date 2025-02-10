const jwt = require('jsonwebtoken');
require('dotenv').config();
const multer = require('multer');
const util =require('../config/util');

// Configure multer for file storage
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'src/assets/uploads/'); 
  },
  filename: (req, file, cb) => {
    cb(null, `${Date.now()}-${file.originalname}`);
  },
});

const upload = multer({ storage: storage });

// authendication middleware
authenticateToken = (req, res, next) => {

  const token = util.getUserToken(req);
    if (!token) {
    return res.status(403).json({ error: 'Access denied' });
  }

  try {
    const verified = jwt.verify(token, process.env.JWT_SECRET);
    req.user = verified; 
    next(); 
  } catch (error) {
    res.status(401).json({ error: 'Invalid token' });
  }
};

module.exports = {
  authenticateToken,
  upload
};
