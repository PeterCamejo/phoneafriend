import mongoose from 'mongoose'

const Schema = mongoose.Schema;
const Comment = require('./Comment');

const PostSchema = new Schema({ 
    body: String,
    title: String,
    author:{
        type: Schema.Types.ObjectId,
        ref: 'User'
    },
    comments: [
        {
            type: Schema.Types.ObjectId,
            ref: 'Comment'
        }
    ]
});

//This export apparently prevents mongoose from recompiling the model
module.exports = mongoose.models.Post || mongoose.model('Post' , PostSchema)