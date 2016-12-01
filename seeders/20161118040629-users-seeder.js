'use strict';

module.exports = {
  up: function (queryInterface, Sequelize) {

    // Add seeded Users to database (note that the date needs to be manually added here)
    // Unencrypted passwords... Tom -> tom // Mario -> mario // Avani -> avani // Masud -> masud
    return queryInterface.bulkInsert('Users', [
      {firstName: "Tommy", lastName: "Thompson", email: "tom@rutgers.edu", password: "$2a$08$uw8/mPzGaMUwdyR/XiLFCuvEaTl9Tnm6VFLFmt4yCVaJnE0NQyqXm", createdAt: new Date(), updatedAt: new Date()},
      {firstName: "Mario", lastName: "Aburto", email: "mario@rutgers.edu", password: "$2a$08$KFP5G9cXKZfWE6qA2paEm.OtBDisccMN0lNu7yka4HR1Haq0YcTNK", createdAt: new Date(), updatedAt: new Date()},
      {firstName: "Avani", lastName: "Ghetia", email: "avani@rutgers.edu", password: "$2a$08$LaApDZE/Fiq1fVHlEAzUreNofXsrNTAEfQ4uFTiAKjrMgTPkTPshi", createdAt: new Date(), updatedAt: new Date()},
      {firstName: "Masud", lastName: "Chowdhury", email: "masud@rutgers.edu", password: "$2a$08$bdNv.LRH3lWcOQzO2jArv.FeqHkAhA0Yium4Kk31MIWUaokxepPBG", createdAt: new Date(), updatedAt: new Date()}
    ], {});

  },

  down: function (queryInterface, Sequelize) {

    // Remove the seeded Users (note the "{truncate: true}", which resets the primary keys)
    return queryInterface.bulkDelete('Users', null, {truncate : true});

  }
};
