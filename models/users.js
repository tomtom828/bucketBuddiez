'use strict';

var bcrypt = require('bcrypt-nodejs');

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
    },
    instanceMethods: {
      generateHash: function(password) {
        return bcrypt.hashSync(password, bcrypt.genSaltSync(8), null);
      },
      validPassword: function(password) {
        return bcrypt.compareSync(password, this.password);
      },
    }
  });

  Users.hook('beforeCreate', function(user, options) {
    user.password = user.generateHash(user.password);
  });

  return Users;
};