import mongoose, { Schema } from 'mongoose'
const passportLocalMongoose = require('passport-local-mongoose');

const UserSchema = new mongoose.Schema({ 
        email:{
            type:String,
            required: true,
            unique: true
        },

        votedComments:[{
                comment:{
                    type: Schema.Types.ObjectId, 
                    ref: 'Comment',
                    required: true,
                    unique: true,
                },
                vote:{
                    type: Number, 
                    enum: [1, -1],
                    required:true
                }
        }]
});

UserSchema.plugin(passportLocalMongoose);

module.exports = mongoose.models.User || mongoose.model('User' , UserSchema)