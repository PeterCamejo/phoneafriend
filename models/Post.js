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

module.exports = mongoose.models.Post || mongoose.model('Post' , PostSchema)