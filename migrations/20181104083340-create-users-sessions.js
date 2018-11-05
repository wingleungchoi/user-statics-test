module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('UserSessions', {
      id: {
        allowNull: false,
        primaryKey: true,
        type: Sequelize.UUID,
      },
      userId: {
        allowNull: false,
        type: Sequelize.UUID,
      },
      sessionId: {
        allowNull: false,
        type: Sequelize.UUID,
      },
      totalModulesStudied: {
        allowNull: false,
        type: Sequelize.INTEGER,
      },
      averageScore: {
        allowNull: false,
        type: Sequelize.DECIMAL,
      },
      timeStudied: {
        allowNull: false,
        type: Sequelize.DECIMAL,
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
    });
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.dropTable('UserSessions');
  },
};
