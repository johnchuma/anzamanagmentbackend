'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Program extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Program.hasMany(models.ProgramRequirement, { onDelete: 'cascade'})
      Program.hasMany(models.ProgramUpdate, { onDelete: 'cascade'})
      Program.hasMany(models.ProgramApplication, { onDelete: 'cascade'})
    }
  }
  Program.init({
      uuid:{
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4
      },
      title: {
        type: DataTypes.STRING,
        allowNull:false
      },
      type: {
        type: DataTypes.STRING,
        allowNull:false
      },
      description: {
        type: DataTypes.TEXT,
        allowNull:false
      },
  }, {
    sequelize,
    modelName: 'Program',
  });
  return Program;
};