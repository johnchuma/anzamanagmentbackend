'use strict';
module.exports = {
  async up(queryInterface, DataTypes) {
    await queryInterface.createTable('InvestorBusinessSectors', {
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
      businessSectorId: {
        type: DataTypes.INTEGER,
        allowNull:false
      },
      investorProfileId: {
        type: DataTypes.INTEGER,
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
    await queryInterface.dropTable('InvestorBusinessSectors');
  }
};