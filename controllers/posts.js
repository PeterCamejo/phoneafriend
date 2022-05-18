import connectDB from "../lib/mongodb";
import Post from "../models/Post"



export async function getPostIndex(){
    await connectDB();
    const posts = await Post.find({});
    return posts;
}

export async function createPost(req){
    await connectDB();
    let post = JSON.parse(req.body);
    post.author = req.user._id;
    await Post.create(post);
    return;
}

export async function updatePost(req){
    await connectDB();
    let post = JSON.parse(req.body);
    await Post.findByIdAndUpdate(post._id, {title: post.title, body: post.body});
    return;
}

export async function deletePost(req){
    await connectDB();    
    let _id = JSON.parse(req.body);
    await Post.findByIdAndDelete(_id);
    return;
}