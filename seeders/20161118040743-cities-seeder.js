'use strict';

module.exports = {
  up: function (queryInterface, Sequelize) {

    // Add seeded Cities to database (all are country capitols)
    // Don't worry, I used Excel to create these formulas... Drag And Drop ;)
    return queryInterface.bulkInsert('Cities', [
      {cityName: "Dubai", cityImageURL: "http://whatson.ae/dubai/wp-content/uploads/2016/05/Dubai-2016-9838.jpg", createdAt: new Date(), updatedAt: new Date()},
      {cityName: "Kakslauttanen", cityImageURL: "http://cdn.images.express.co.uk/img/dynamic/25/590x/The-glass-igloos-624757.jpg", createdAt: new Date(), updatedAt: new Date()},
      {cityName: "Ko Samui,", cityImageURL: "http://www.thetravelerszone.com/wp-content/uploads/2010/02/thailand.jpg", createdAt: new Date(), updatedAt: new Date()},
      {cityName: "Portland", cityImageURL: "http://cdn29.elitedaily.com/content/uploads/2015/10/20130158/15514312032_11913b6b95_o.jpg", createdAt: new Date(), updatedAt: new Date()},
      {cityName: "Colorado Springs", cityImageURL: "http://cdn29.elitedaily.com/content/uploads/2015/10/20141029/8352681766_eef3decc95_o.jpg", createdAt: new Date(), updatedAt: new Date()},
      {cityName: "Cape May", cityImageURL: "http://cdn29.elitedaily.com/content/uploads/2015/10/20145120/14566172229_fe509ade6e_k.jpg", createdAt: new Date(), updatedAt: new Date()},
      {cityName: "Key West", cityImageURL: "http://cdn29.elitedaily.com/content/uploads/2015/10/21113221/357940337_9938deefcd_o.jpg", createdAt: new Date(), updatedAt: new Date()},
      {cityName: "Berlin", cityImageURL: "http://i.huffpost.com/gen/1895354/thumbs/o-BERLIN-900.jpg?1", createdAt: new Date(), updatedAt: new Date()},
      {cityName: "Fira", cityImageURL: "http://i.huffpost.com/gen/1881416/thumbs/o-SANTORINI-900.jpg?6", createdAt: new Date(), updatedAt: new Date()},
      {cityName: "Florence", cityImageURL: "http://i.huffpost.com/gen/1887626/thumbs/o-FLORENCE-900.jpg?1", createdAt: new Date(), updatedAt: new Date()},
      {cityName: "New York", cityImageURL: "http://assets.fodors.com/destinations/1128/skyline-manhattan-new-york-city-new-york-usa_main.jpg", createdAt: new Date(), updatedAt: new Date()},
      {cityName: "New Orleans", cityImageURL: "https://media-cdn.tripadvisor.com/media/photo-s/06/bb/29/bd/french-quarter.jpg", createdAt: new Date(), updatedAt: new Date()},
    ], {});

  },

  down: function (queryInterface, Sequelize) {

    // Remove the seeded Cities (note the "{truncate: true}", which resets the primary keys)
    return queryInterface.bulkDelete('Cities', null, {truncate : true});

  }
};
