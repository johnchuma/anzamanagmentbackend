'use strict';
/** @type {import('DataTypes-cli').Migration} */
module.exports = {
  async up(queryInterface, DataTypes) {
    await queryInterface.createTable('InvestorProfiles', {
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
      userId: {
        type: DataTypes.INTEGER,
        allowNull:false
      },
      investor: {
        type: DataTypes.STRING,
        allowNull:false
      },
      name: {
        type: DataTypes.STRING,
        allowNull:false
      },
      sector: {
        type: DataTypes.STRING,
        allowNull:false
      },
      geography: {
        type: DataTypes.STRING,
        allowNull:false
      },
      average: {
        type: DataTypes.STRING,
        allowNull:false
      },
      structure: {
        type: DataTypes.ENUM('equity', 'debt','mezzanine'),
        allowNull:false
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
    await queryInterface.dropTable('InvestorProfiles');
  }
};