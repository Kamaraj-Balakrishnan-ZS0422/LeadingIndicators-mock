const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

    const incidentModel = sequelize.define('IncidentModel', {
      id: {
        type: DataTypes.INTEGER(250),
        primaryKey: true,
        autoIncrement: true,
        allowNull: false,
      },
      recordId: {
        type: DataTypes.STRING(50),
        allowNull: false,
      },
      location: {
        type: DataTypes.STRING(50),
        allowNull: false,
      },
      area: {
        type: DataTypes.STRING(50),
        allowNull: false,
      },
      indicatorType: {
        type: DataTypes.STRING(50),
        allowNull: false,
      },
      date: {
        type: DataTypes.DATE,
        allowNull: false,
      },
      
      initiatedBy: {
        type: DataTypes.TEXT,
        allowNull: false,
      },
      issuedescription:{
        type: DataTypes.TEXT,
        allowNull: false,
      },
      file: {
        type: DataTypes.STRING(50),
        allowNull: false,
      },
      status: {
        type: DataTypes.STRING(30),
        allowNull: false,
      },
      createdAt: {
        type: DataTypes.DATE,
        allowNull: false,
      },
      updatedAt: {
        type: DataTypes.DATE,
        allowNull: false,
      },
    }, {
      tableName: 'incidents', // replace with your table name
      timestamps: true,
    });
  
  module.exports = incidentModel;