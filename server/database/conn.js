const mongoose = require('mongoose')
//import mongoose from "mongoose";
const dotenv = require('dotenv')

//import { MongoMemoryServer } from "mongodb-memory-server";
//import ENV from '../config.js'
//import dotenv from 'dotenv'
dotenv.config()
async function connect(){

    //const mongod = await MongoMemoryServer.create();
    //const getUri = mongod.getUri();

    mongoose.set('strictQuery', true)
    // const db = await mongoose.connect(getUri);
    const db = await mongoose.connect(process.env.MONGO_URI);
    console.log("Database Connected")
    return db;
}


module.exports = connect;