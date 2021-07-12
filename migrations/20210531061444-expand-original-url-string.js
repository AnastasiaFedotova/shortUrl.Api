"use strict";

module.exports = {
  up: async (queryInterface, Sequelize) => {
    return queryInterface.changeColumn("links", "original_url", {
      type: Sequelize.STRING(500)
    });
  },

  down: async (queryInterface, Sequelize) => {
    return queryInterface.changeColumn("links", "original_url", {
      type: Sequelize.STRING(250)
    });
  }
};
