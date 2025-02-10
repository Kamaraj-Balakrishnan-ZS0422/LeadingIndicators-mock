const express = require('express');
const incidentController = require('../controllers/incidentController');
const {authenticateToken,upload} = require('../middleware/middlewares');
const router = express.Router();

router.get('/incidents',authenticateToken, incidentController.getAllIncidents);
router.post('/incidents',authenticateToken, incidentController.saveIncidentData);
router.put('/incidents',authenticateToken, incidentController.updateIncident);
router.post('/upload', upload.single('file'),incidentController.fileUpload);
module.exports = router;
