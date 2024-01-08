'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, DataTypes) {
    await queryInterface.createTable('Businesses', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: DataTypes.INTEGER
      },
      uuid:{
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4
      },
      userId:{
        type:DataTypes.INTEGER,
        allowNull:false
      },
      businessSectorId:{
        type: DataTypes.INTEGER, 
        allowNull:false  
      },
      stage: {
        type: DataTypes.STRING,
        allowNull:false
      },
      problem: {
        type: DataTypes.STRING,
        allowNull:false
      },
      solution: {
        type: DataTypes.STRING,
        allowNull:false
      },
      registration:{
        type: DataTypes.STRING, 
        allowNull:true
      },
      team:{
        type: DataTypes.STRING, 
        allowNull:true
      },
      traction:{
        type: DataTypes.STRING, 
        allowNull:true 
      },
      status:{
        type: DataTypes.ENUM('waiting','rejected','accepted'), 
        defaultValue:"waiting"
      },
      createdAt: {
        allowNull: false,
        type: DataTypes.DATE
      },
      updatedAt: {
        allowNull: false,
        type: DataTypes.DATE
      }
    });
  },
  async down(queryInterface, DataTypes) {
    await queryInterface.dropTable('Businesses');
  }
};