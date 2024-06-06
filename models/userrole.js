'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class UserRole extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      UserRole.belongsTo(models.User, { onDelete: 'cascade'})
      UserRole.belongsTo(models.Role, { onDelete: 'cascade'})
    }
  }
  UserRole.init({
    uuid: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4
    },
    userId:{
     type:DataTypes.INTEGER,
     allowNull:false
    },
    roleId:{
     type:DataTypes.INTEGER,
     allowNull:false
    },
  }, {
    sequelize,
    modelName: 'UserRole',
  });
  return UserRole;
};