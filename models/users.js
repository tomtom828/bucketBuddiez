'use strict';
module.exports = function(sequelize, DataTypes) {
  var Users = sequelize.define('Users', {
    firstName: DataTypes.STRING,
    lastName: DataTypes.STRING,
    email: DataTypes.STRING,
    password: DataTypes.STRING
  }, {
    classMethods: {
      associate: function(models) {

        // Each of the users has many country, state, and city likes
        // Users.hasMany(models.CountryLikes);
        // Users.hasMany(models.StateLikes);
        // Users.hasMany(models.CityLikes);

        // Each of the users has many countries, states, and cities THROUGH the countrylikes, statelikes, and citylikes
        Users.belongsToMany(models.Countries, {through: 'CountryLikes'});
        Users.belongsToMany(models.States, {through: 'StateLikes'});
        Users.belongsToMany(models.Cities, {through: 'CityLikes'});
        
      }
    }
  });
  return Users;
};