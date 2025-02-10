const jwt = require('jsonwebtoken');
require('dotenv').config();
const util =require('../config/util');
const {Incident} = require('../models');

// Get all users
exports.getAllIncidents = async (req, res) => {
  console.log(req.cookies);
  const token = util.getUserToken(req);
  const {user} = jwt.verify(token, process.env.JWT_SECRET);
  const {email,isadmin} = user;

  let queryOptions = {};

  if (isadmin) {
    queryOptions.where = { status: 'In Progress' };
  } else {
    queryOptions.where = { initiatedBy: email };
  }
  
  try {
    const incidents = await Incident.findAll(queryOptions);
    
    res.status(200).json(incidents);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

//save incident data
exports.saveIncidentData = async (req, res) => {
    try {
         console.log(req.body);
         const recordId = 'INC_'+ Math.floor(Math.random() * 1000);
         const status = 'In Progress';
         const formData = {...req.body,recordId:recordId,status:status}
         const newIncident = await Incident.create(formData);
         res.status(201).json(newIncident);
         
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  };

  exports.fileUpload = (req,res)=>{

    if (!req.file) {
      return res.status(400).send('No file uploaded.');
    }
  
    console.log('File:', req.file);
  
    res.status(200).json({message:'File and form data uploaded successfully',filename:req.file.filename});
  
  }

// Update multiple incidents
exports.updateIncident = async (req, res) => {
  try {
    const incidentIds = req.body; // Expecting an array of IDs in req.body

    if (!Array.isArray(incidentIds) || incidentIds.length === 0) {
      return res.status(400).json({ message: "No incident IDs provided" });
    }

    // Iterate through incidentIds and update each one
    for (const id of incidentIds) {
      const incident = await Incident.findAll({ where: { recordId : id } });
      if (incident) {
        await Incident.update(
          { status: "Closed" }, 
          { where: { recordId : id } } 
        );
      }
    }

    res.status(200).json({ status: 'success', message: 'Incidents updated successfully' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
