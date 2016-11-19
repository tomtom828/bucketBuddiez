'use strict';
module.exports = function(sequelize, DataTypes) {
  var Cities = sequelize.define('Cities', {
    cityName: DataTypes.STRING
  }, {
    classMethods: {
      associate: function(models) {
        // Cities are related to Users through CityLikes
        Cities.belongsToMany(models.Users, {through: 'CityLikes'});
      }
    }
  });
  return Cities;
};