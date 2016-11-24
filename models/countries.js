'use strict';
module.exports = function(sequelize, DataTypes) {
  var Countries = sequelize.define('Countries', {
    countryName: DataTypes.STRING,
    countryImageURL: DataTypes.STRING
  }, {
    classMethods: {
      associate: function(models) {
        // Countries are related to Users through CountryLikes
        Countries.belongsToMany(models.Users, {through: 'CountryLikes'});
      }
    }
  });
  return Countries;
};