import mongoose from 'mongoose'

const Schema = mongoose.Schema;

const CommentSchema = new mongoose.Schema({ 
    body: String,
    // rating: Number,
    // author:{
    //     type:Schema.Types.ObjectId,
    //     ref: 'User'
    // }
})

//This export apparently prevents mongoose from recompiling the model
module.exports = mongoose.models.Comment || mongoose.model('Comment' , CommentSchema)