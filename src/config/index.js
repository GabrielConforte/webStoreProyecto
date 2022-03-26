
require("dotenv").config();

let config = {
    port: process.env.PORT,
    cors: process.env.CORS
}

let mongo_db = {
    uri: process.env.MONGO_DB_URI,
    name: process.env.DB_NAME,
}

let file = {
    path: "./data",
}

module.exports = { config, mongo_db , file};