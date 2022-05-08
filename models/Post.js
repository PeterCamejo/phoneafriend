import mongoose from 'mongoose'

const Schema = mongoose.Schema;
const Comment = require('./Comment');

const PostSchema = new mongoose.Schema({ 
    author: String,
    body: String,
    title: String,
    comments: [
        {
            type: Schema.Types.ObjectId,
            ref: 'Comment'
        }
    ]
});

//This export apparently prevents mongoose from recompiling the model
module.exports = mongoose.models.Post || mongoose.model('Post' , PostSchema)