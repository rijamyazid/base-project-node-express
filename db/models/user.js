'use strict'
const { Model } = require('sequelize')

module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate (models) {
      // define association here
    }
  }
  User.init({
    id: {
      primaryKey: true,
      allowNull: false,
      type: DataTypes.STRING(15),
      field: 'id'
    },
    name: {
      type: DataTypes.STRING,
      field: 'name'
    },
    username: {
      allowNull: false,
      type: DataTypes.STRING(50),
      field: 'username'
    },
    password: {
      allowNull: false,
      type: DataTypes.STRING(20),
      field: 'password'
    },
    isActive: {
      allowNull: false,
      type: DataTypes.BOOLEAN,
      defaultValue: true,
      field: 'is_active'
    },
    createdAt: {
      allowNull: false,
      type: DataTypes.DATE,
      field: 'created_at'
    },
    updatedAt: {
      allowNull: false,
      type: DataTypes.DATE,
      field: 'updated_at'
    }
  }, {
    sequelize,
    modelName: 'User',
    tableName: 'user'
  })
  return User
}
