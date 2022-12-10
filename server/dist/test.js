"use strict";
const dbConfig = require("./config/db.config");
const mongoose = require("mongoose");
mongoose
    .set('strictQuery', false);
mongoose
    .connect(`mongodb://${dbConfig.USER}:${dbConfig.PASSWORD}@${dbConfig.HOST}:${dbConfig.PORT}/${dbConfig.DB}?${dbConfig.CONNECTIONOPTS}`, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
})
    .then(() => {
    console.log("Successfully connect to MongoDB.");
})
    .catch((err) => {
    console.error("Connection error", err);
    process.exit();
});
