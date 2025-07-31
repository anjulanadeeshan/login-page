const mongoose = require("mongoose");
require("dotenv").config();

const connectToDb = async ()=> {
    try {
        const connect = await mongoose.connect(process.env.DB_Connection);
        console.log(`Database connected ${connect.connection.name}`);
    } catch (e) {
        console.log(e);
    }
}

module.exports = connectToDb;