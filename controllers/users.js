import Post from '../models/Post'
import User from '../models/User'

export async function getUserById(id){
    const user = await User.findById(id);
    return user;
}

export async function getUserPosts(userId){
    const posts = await Post.find({author:userId});
    return posts;
}