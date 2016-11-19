'use strict';
module.exports = function(sequelize, DataTypes) {
  var States = sequelize.define('States', {
    stateName: DataTypes.STRING
  }, {
    classMethods: {
      associate: function(models) {
        // States are related to Users through StateLikes
        States.belongsToMany(models.Users, {through: 'StateLikes'});
      }
    }
  });
  return States;
};