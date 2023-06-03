import "../config/db.js"
import express from 'express';
import session from 'express-session';
import MongoStore from "connect-mongo";
import cookieParser from 'cookie-parser';

const baseSessions = session ({
    store: MongoStore.create({mongoUrl: process.env.MONGOSESSION_ULR }),
    key: 'user_sid',
    secret: "c0der",
    resave: true,
    saveUninitialized: true
})

const app = express();
const port = process.env.PORT || 8080;
const server = app.listen(port, () => console.log('Server Up'))

export  { server, app, express, session, baseSessions, cookieParser }