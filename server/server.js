// import express from 'express';
// import cors from 'cors';
// import morgan from 'morgan';
// import connect from './database/conn.js';
// import router from './router/route.js';
// import dotenv from 'dotenv'
const express = require('express')
const cors = require('cors')
const morgan = require('morgan')
const connect = require('./database/conn.js')
const router = require('./router/route.js')
const dotenv = require('dotenv')

dotenv.config()
const app = express();

/** middlewares */

// const corsOptions = {
//     origin: 'https://mernlogin.azurewebsites.net',
//   };

app.use(express.json());
app.use(cors());
app.use(morgan('tiny'));
app.disable('x-powered-by'); // less hackers know about our stack


const port = process.env.PORT || 4589;


/** api routes */
app.use('/api', router)

/** start server only when we have valid connection */
connect().then(() => {
    try {
        app.listen(port, () => {
            console.log(`Server connected to http://localhost:${port}`);
        })
    } catch (error) {
        console.log('Cannot connect to the server')
    }
}).catch(error => {
    console.log("Invalid database connection...!");
})

