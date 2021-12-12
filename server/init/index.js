const express = require('express')
const path = require('path')
const config = require('config')
const database = require('../database')


module.exports = async function(server) {
    //set up database
    try {
        await database.authenticate()
        console.log(`Connection successfully established to db:${config.get("db.name")}`)
    } catch(error) {
        console.error("Unable to connect to database.", error.message)
        process.exit(1)
    }

    //set up static routes
    server.use("/assets/images", express.static(path.resolve(__dirname, "../", "images")))
}