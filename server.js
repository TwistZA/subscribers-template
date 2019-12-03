// server.js
// where your node app starts

// init project
const mongodb = require("mongodb");
const mongoose = require("mongoose");
const express = require("express");
const app = express();
const uri = process.env.URI;

// we've started you off with Express,
// but feel free to use whatever libs or frameworks you'd like through `package.json`.

// MONGO SETUP
const MongoClient = require("mongodb").MongoClient;

mongoose.set('useNewUrlParser', true);
mongoose.set('useFindAndModify', false);
mongoose.set('useCreateIndex', true);
mongoose.set('useUnifiedTopology', true);

mongoose.connect(uri);

const client = new MongoClient(uri, { 
  useNewUrlParser: true,
  useUnifiedTopology: true
});

const db = mongoose.connection;
db.on('error', (error) => console.error(error));
db.once('open', () => console.log('DB Connected'));



client.connect(err => {
  //const collection = client.db("test").collection("devices");
  // perform actions on the collection object
  console.log("AVINASH - client.connect new");

  //client.close();
});

// MONGO SETUP END


app.use(express.json());

// const subscribersRouter = require('./routes/subscribers');
const subscribersRouter = require('./routes/subscribers');
app.use('/subscribers', subscribersRouter);





// http://expressjs.com/en/starter/static-files.html
//app.use(express.static("public"));

// http://expressjs.com/en/starter/basic-routing.html

// app.get("/", function(request, response) {
  // response.sendFile(__dirname + "/views/index.html");
// });

// listen for requests :)
const listener = app.listen(process.env.PORT, function() {
  console.log("Your app is listening on port " + listener.address().port);
});
