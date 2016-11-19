# :earth_americas: Bucket Buddiez! :smile:


### Overview
A web app that allows users to input places they would like to travel to, and then match with mutual friends who also want to go there!

Log in with your FaceBook account and then click on places you want to travel to in your lifetime. Clicking on these locations will add them to your bucket list. When veiwing your bucket list, click on a location to see if you have any mutual friends who also want to go there. If you do, then start arranging some travel plans! :airplane:

Please try out the deployed app in Heroku, found [here](https://bucket-buddiez.herokuapp.com/).


### Functionality
...  To be added included later ...


### Cloning down the repo
If you wish to clone the app down to your local machine...

1. Use MySQL Workbench to create a database called `bucketBuddiezDB`:
  * The raw SQL query is `CREATE DATABASE bucketBuddiezDB;`.
2. Inside the `config` folder, open up the `config.json` file:
  * In the `development` object, add your MySQL localhost `password`.
3. In your terminal, `cd` into the project folder and run:
  * `npm install` to download all node.js dependencies
  * `npm run-script setupDB` to migrate/seed the database
4. Finally, you can run the programming using:
  * `node server.js` in the terminal to start the node server
  * And navigating to `localhost:3000` in your browser.
