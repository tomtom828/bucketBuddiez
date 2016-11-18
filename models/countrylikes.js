'use strict';
module.exports = function(sequelize, DataTypes) {
  var CountryLikes = sequelize.define('CountryLikes', {
    userId: DataTypes.INTEGER,
    countryId: DataTypes.INTEGER
  }, {
    classMethods: {
      associate: function(models) {
        // associations can be defined here
      }
    }
  });
  return CountryLikes;
};