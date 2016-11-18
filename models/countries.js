'use strict';
module.exports = function(sequelize, DataTypes) {
  var Countries = sequelize.define('Countries', {
    countryName: DataTypes.STRING
  }, {
    classMethods: {
      associate: function(models) {
        // associations can be defined here
      }
    }
  });
  return Countries;
};