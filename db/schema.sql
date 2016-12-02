-- NOTE: If you followed the readme steps, you can disregard this entire file.-

-- Raw SQL for Database Creation (run this in MySQL Workbench)
CREATE DATABASE bucketBuddiezDB;

-- Then run the following in your Sequelize CLI to create the migrations and seed the database
` sequelize db:migrate && sequelize db:seed:all `

-- Then, (optional but used during development) you can seed associations
` node db/seed-user-likes.js `

-- NOTE: If you completed the readme, both of these steps were done when you ran...
npm run setupDB



-- ==========================================================================================



-- The following lines are for documentation, no need to copy for run anything after this...


-- CREATE MIGRATIONS

  -- Users Table Migration
  ` sequelize model:create --name Users --attributes 'firstName:string lastName:string facebookId:integer' `



  -- Countries Table Migration
  ` sequelize model:create --name Countries --attributes 'countryName:string' `

  -- States Table Migration
  ` sequelize model:create --name States --attributes 'stateName:string' `

  -- Cities Table Migration
  ` sequelize model:create --name Cities --attributes 'cityName:string' `



  -- Country Likes (all the countries that all the users like)
  ` sequelize model:create --name CountryLikes --attributes 'userId:integer countryId:integer' `

  -- State Likes (all the states that all the users like)
  ` sequelize model:create --name StateLikes --attributes 'userId:integer stateId:integer' `

  -- City Likes (all the cities that all the users like)
  ` sequelize model:create --name CityLikes --attributes 'userId:integer cityId:integer' `




-- CREATE SEEDS (up and down entries were done manually)

  ` sequelize seed:create --name users-seeder `

  ` sequelize seed:create --name countries-seeder `
  ` sequelize seed:create --name states-seeder `
  ` sequelize seed:create --name cities-seeder `

  ` sequelize seed:create --name countrylikes-seeder `
  ` sequelize seed:create --name statelikes-seeder `
  ` sequelize seed:create --name citylikes-seeder `




-- UNDO COMMANDS

  -- Remove the seeds
  ` sequelize db:seed:undo:all `

  -- Remove all tables
  ` sequelize db:migrate:undo:all `