const dotenv = require('dotenv')
dotenv.config()

module.exports = { mongoURL: process.env.mongoURL, PORT: process.env.PORT}
