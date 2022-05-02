import mongoose from 'mongoose'

const PostSchema = new mongoose.Schema({ 
    author: String,
    body: String,
    title: String
})

//This export apparently prevents mongoose from recompiling the model
module.exports = mongoose.models.Post || mongoose.model('Post' , PostSchema)