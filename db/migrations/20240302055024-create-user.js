'use strict'
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.createTable('user', {
      id: {
        allowNull: false,
        primaryKey: true,
        type: Sequelize.STRING(15),
        field: 'id'
      },
      name: {
        type: Sequelize.STRING(50),
        field: 'name'
      },
      username: {
        allowNull: false,
        type: Sequelize.STRING(20),
        field: 'username'
      },
      password: {
        allowNull: false,
        type: Sequelize.STRING,
        field: 'password'
      },
      isActive: {
        allowNull: false,
        type: Sequelize.BOOLEAN,
        defaultValue: true,
        field: 'is_active'
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE,
        field: 'created_at'
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE,
        field: 'updated_at'
      }
    })

    await queryInterface.addConstraint('user', {
      fields: ['username'],
      type: 'unique',
      name: 'user_username_ukey'
    })
  },
  async down (queryInterface, Sequelize) {
    await queryInterface.removeConstraint('user', 'user_username_ukey')
    await queryInterface.dropTable('user')
  }
}
