const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const User = sequelize.define('User', {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  email: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
    validate: {
      isEmail: true,
    },
  },
  isadmin: {
    type: DataTypes.BOOLEAN,
    allowNull: true,
  },
  lastloggedin: {
    type: DataTypes.DATE,
    allowNull: true,
  },
}, { 
  tableName: 'users',
  timestamps: true,
});

module.exports = User;
