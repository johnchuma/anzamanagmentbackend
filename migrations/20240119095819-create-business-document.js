'use strict';
module.exports = {
  async up(queryInterface, DataTypes) {
    await queryInterface.createTable('BusinessDocuments', {
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
      title: {
        type: DataTypes.STRING,
        allowNull:false
      },
      link: {
        type: DataTypes.STRING,
        allowNull:false
      },
      type:{
        type:DataTypes.STRING,
        allowNull:true
      },
      businessId: {
        type: DataTypes.STRING,
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
    await queryInterface.dropTable('BusinessDocuments');
  }
};