'use strict';
const { Validator } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  const Note = sequelize.define('Note', {
    title: DataTypes.STRING,
    content: DataTypes.TEXT,
    userId: DataTypes.INTEGER,
    notebookId: DataTypes.INTEGER
  }, {});
  Note.associate = function(models) {
    Note.belongsTo(models.Notebook, { foreignKey: 'notebookId' });
    Note.belongsTo(models.User, { foreignKey: 'userId' });
  };
  return Note;
};