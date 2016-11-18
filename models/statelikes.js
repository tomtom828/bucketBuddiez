'use strict';
module.exports = function(sequelize, DataTypes) {
  var StateLikes = sequelize.define('StateLikes', {
    userId: DataTypes.INTEGER,
    stateId: DataTypes.INTEGER
  }, {
    classMethods: {
      associate: function(models) {
        // associations can be defined here
      }
    }
  });
  return StateLikes;
};