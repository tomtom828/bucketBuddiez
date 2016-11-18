'use strict';

module.exports = {
  up: function (queryInterface, Sequelize) {
    // 100000544140061 || 100001259538717
    // Add seeded Users to database (note that the date needs to be manually added here)
    return queryInterface.bulkInsert('Users', [
      {firstName: "Tommy", lastName: "Thompson", facebookId: 100000544140061, createdAt: new Date(), updatedAt: new Date()},
      {firstName: "Mario", lastName: "Aburto", facebookId: 100001259538717, createdAt: new Date(), updatedAt: new Date()},
    ], {});

  },

  down: function (queryInterface, Sequelize) {

    // Remove the seeded Users (note the "{truncate: true}", which resets the primary keys)
    return queryInterface.bulkDelete('Users', null, {truncate : true});

  }
};
