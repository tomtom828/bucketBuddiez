'use strict';

module.exports = {
  up: function (queryInterface, Sequelize) {

    // Add seeded Users to database (note that the date needs to be manually added here)
    return queryInterface.bulkInsert('Users', [
      {firstName: "Tommy", lastName: "Thompson", email: "tom@rutgers.edu", password: "tomPassword", createdAt: new Date(), updatedAt: new Date()},
      {firstName: "Mario", lastName: "Aburto", email: "mario@rutgers.edu", password: "marioPassword", createdAt: new Date(), updatedAt: new Date()},
    ], {});

  },

  down: function (queryInterface, Sequelize) {

    // Remove the seeded Users (note the "{truncate: true}", which resets the primary keys)
    return queryInterface.bulkDelete('Users', null, {truncate : true});

  }
};
