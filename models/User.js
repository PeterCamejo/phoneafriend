import mongoose from 'mongoose'
const passportLocalMongoose = require('passport-local-mongoose');

const UserSchema = new mongoose.Schema({ 
        email:{
            type:String,
            required: true,
            unique: true
        }
});

UserSchema.plugin(passportLocalMongoose);
//This export apparently prevents mongoose from recompiling the model
module.exports = mongoose.models.User || mongoose.model('User' , UserSchema)