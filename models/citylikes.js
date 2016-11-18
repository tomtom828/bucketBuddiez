'use strict';
module.exports = function(sequelize, DataTypes) {
  var CityLikes = sequelize.define('CityLikes', {
    userId: DataTypes.INTEGER,
    cityId: DataTypes.INTEGER
  }, {
    classMethods: {
      associate: function(models) {
        // associations can be defined here
      }
    }
  });
  return CityLikes;
};