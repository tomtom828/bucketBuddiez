'use strict';
module.exports = function(sequelize, DataTypes) {
  var States = sequelize.define('States', {
    stateName: DataTypes.STRING
  }, {
    classMethods: {
      associate: function(models) {
        // associations can be defined here
      }
    }
  });
  return States;
};