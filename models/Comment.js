import mongoose from 'mongoose'

const Schema = mongoose.Schema;

const CommentSchema = new mongoose.Schema({ 
    body: String,
    // rating: Number,
    author:{
        type:Schema.Types.ObjectId,
        ref: 'User'
    }
})


module.exports = mongoose.models.Comment || mongoose.model('Comment' , CommentSchema)