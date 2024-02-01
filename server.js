const mongoose = require("mongoose");
const dotenv = require("dotenv");
const app =require("./app")
dotenv.config()

const { DB_HOST } = process.env

mongoose.connect(DB_HOST)
    .then(() => console.log('Database connection successful'))
    .then(() => app.listen(3000, () => {
        console.log("Server is running. Use our API on port: 3000");
        }))
    .catch(err => {
        console.log(err.message);
        process.exit(1);
    }
);