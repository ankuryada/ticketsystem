const dotenv = require('dotenv');
dotenv.config({ path: './Config/.env' });
const mongoose = require("mongoose");
mongoose.connect(process.env.MONGO_URI);

function connect() {
    mongoose.connection.on("error", (err) => {
        console.log("connection failed ", err);
    });
    mongoose.connection.on("connected", (connected) => {
        console.log("Database connected");
    });
}
module.exports = connect;