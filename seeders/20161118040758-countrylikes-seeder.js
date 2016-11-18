'use strict';

module.exports = {
  up: function (queryInterface, Sequelize) {

    // Add seeded User-Country relations to database (note that the date needs to be manually added here)
    return queryInterface.bulkInsert('CountryLikes', [
      {userId: 1, countryId: 189, createdAt: new Date(), updatedAt: new Date()},
      {userId: 2, countryId: 189, createdAt: new Date(), updatedAt: new Date()},
      {userId: 1, countryId: 188, createdAt: new Date(), updatedAt: new Date()},
      {userId: 2, countryId: 188, createdAt: new Date(), updatedAt: new Date()},
      {userId: 1, countryId: 156, createdAt: new Date(), updatedAt: new Date()},
      {userId: 2, countryId: 159, createdAt: new Date(), updatedAt: new Date()},
      {userId: 1, countryId: 118, createdAt: new Date(), updatedAt: new Date()},
      {userId: 2, countryId: 119, createdAt: new Date(), updatedAt: new Date()},
      {userId: 1, countryId: 48, createdAt: new Date(), updatedAt: new Date()},
      {userId: 2, countryId: 48, createdAt: new Date(), updatedAt: new Date()}
    ], {});

  },

  down: function (queryInterface, Sequelize) {

    // Remove the seeded Users (note the "{truncate: true}", which resets the primary keys)
    return queryInterface.bulkDelete('CountryLikes', null, {truncate : true});

  }
  
};
