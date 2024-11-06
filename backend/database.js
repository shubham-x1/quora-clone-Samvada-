const mongoose = require("mongoose");

const url =
  "mongodb://satputeshubham424:BMWM5CS635@cluster0-shard-00-00.zqxlo.mongodb.net:27017,cluster0-shard-00-01.zqxlo.mongodb.net:27017,cluster0-shard-00-02.zqxlo.mongodb.net:27017/?ssl=true&replicaSet=atlas-d5quau-shard-0&authSource=admin&retryWrites=true&w=majority&appName=Cluster0";

  module.exports.connect = () => {
    mongoose.connect(url)
      .then(() => {
        console.log("MongoDB connected successfully");
      })
      .catch((error) => console.log("Error: ", error));
  };
  