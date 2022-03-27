
require("dotenv").config();

let config = {
    port: process.env.PORT,
    cors: process.env.CORS
}

let mongo_db = {
    uri: "mongodb://localhost:27017",
    name: "webStore2022",
}

let file = {
    path: "./data",
}

module.exports = { config, mongo_db , file};