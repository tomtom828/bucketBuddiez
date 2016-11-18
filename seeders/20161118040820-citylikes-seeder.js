'use strict';

module.exports = {
  up: function (queryInterface, Sequelize) {

    // Add seeded User-Country relations to database (note that the date needs to be manually added here)
    return queryInterface.bulkInsert('CityLikes', [
      {userId: 1, cityId: 189, createdAt: new Date(), updatedAt: new Date()},
      {userId: 2, cityId: 189, createdAt: new Date(), updatedAt: new Date()},
      {userId: 1, cityId: 188, createdAt: new Date(), updatedAt: new Date()},
      {userId: 2, cityId: 188, createdAt: new Date(), updatedAt: new Date()},
      {userId: 1, cityId: 156, createdAt: new Date(), updatedAt: new Date()},
      {userId: 2, cityId: 159, createdAt: new Date(), updatedAt: new Date()},
      {userId: 1, cityId: 118, createdAt: new Date(), updatedAt: new Date()},
      {userId: 2, cityId: 119, createdAt: new Date(), updatedAt: new Date()},
      {userId: 1, cityId: 48, createdAt: new Date(), updatedAt: new Date()},
      {userId: 2, cityId: 48, createdAt: new Date(), updatedAt: new Date()}
    ], {});

  },

  down: function (queryInterface, Sequelize) {

    // Remove the seeded State Likes (note the "{truncate: true}", which resets the primary keys)
    return queryInterface.bulkDelete('CityLikes', null, {truncate : true});

  }
};
