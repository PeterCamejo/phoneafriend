import nextSession from 'next-session';
import MongoStore from "connect-mongo";
import {promisifyStore} from 'next-session/lib/compat'

const dbURI = process.env.MONGO_URI;

const mongoStore = MongoStore.create({
    mongoUrl: dbURI,
    touchAfter: 24 * 60 * 60 //24 hours
});

mongoStore.on('error', (e) => {
    console.log("Session Store Error", e);
});

const getSession = nextSession({
    store: mongoStore,
    cookie:{
        maxAge: 60 * 60 * 24 * 7,
        httpOnly: true,
        path: '/'
    }
});

export default async function session(req, res, next){
    await getSession(req, res);
    next();
}