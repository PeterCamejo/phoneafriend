import mongoose from "mongoose";

/* Source
 * https://itnext.io/using-mongoose-with-next-js-11-b2a08ff2dd3c
*/

const URI = process.env.MONGO_URI;

//TODO: This is a good thing to have but it keeps throwing the error even URI is defined.
// if(!URI){
//     throw new Error(
//         'Define MONGO_URI environmental variable'
//     )
// }

let cache = global.mongoose;

if(!cache){
   cache = global.mongoose = { conn: null , promise: null}
}

async function connectDB(){
    if(cache.conn){
        console.log("returning cached db connection");
        return cache.conn
    }

    if(!cache.promise){
        const options ={
            useNewUrlParser: true,
            useUnifiedTopology: true,
            bufferCommands: false
        }
        cache.promise = mongoose.connect(URI, options).then(mongoose => {
            console.log("Database connected");
            return mongoose
        },
        err => {
            console.log("Error Connecting");
        })
    }
    cache.conn = await cache.promise
    return cache.conn
}

export default connectDB

