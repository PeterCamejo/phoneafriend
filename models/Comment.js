import mongoose from 'mongoose'

const CommentSchema = new mongoose.Schema({ 
    author: String,
    body: String
})

//This export apparently prevents mongoose from recompiling the model
module.exports = mongoose.models.Comment || mongoose.model('Comment' , CommentSchema)