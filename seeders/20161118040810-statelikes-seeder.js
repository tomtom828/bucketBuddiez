'use strict';

module.exports = {
  up: function (queryInterface, Sequelize) {

    // Add seeded User-State relations to database (note that the date needs to be manually added here)
    return queryInterface.bulkInsert('StateLikes', [
      {userId: 1, stateId: 6, createdAt: new Date(), updatedAt: new Date()},
      {userId: 2, stateId: 6, createdAt: new Date(), updatedAt: new Date()},
      {userId: 1, stateId: 21, createdAt: new Date(), updatedAt: new Date()},
      {userId: 2, stateId: 47, createdAt: new Date(), updatedAt: new Date()},
      {userId: 1, stateId: 43, createdAt: new Date(), updatedAt: new Date()},
      {userId: 2, stateId: 43, createdAt: new Date(), updatedAt: new Date()},
      {userId: 1, stateId: 19, createdAt: new Date(), updatedAt: new Date()},
      {userId: 2, stateId: 9, createdAt: new Date(), updatedAt: new Date()},
      {userId: 1, stateId: 5, createdAt: new Date(), updatedAt: new Date()},
      {userId: 2, stateId: 5, createdAt: new Date(), updatedAt: new Date()}
    ], {});

  },

  down: function (queryInterface, Sequelize) {

    // Remove the seeded State Likes (note the "{truncate: true}", which resets the primary keys)
    return queryInterface.bulkDelete('StateLikes', null, {truncate : true});
  }
  
};
