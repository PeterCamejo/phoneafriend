import Comment from '../models/Comment'
import Post from '../models/Post'


export async function createComment(req){
                const body = JSON.parse(req.body);
                const post = await Post.findById(body.postId);
                const newComment = {
                    body: body.comment.body,
                    rating: 1,
                    author: req.user._id
                }
                const comment = new Comment(newComment);          
                post.comments.push(comment);
                await comment.save();
                await post.save();
                return comment;
}

export async function deleteComment(req){
                const {postId , commentId} = JSON.parse(req.body);
                await Post.findByIdAndUpdate(postId, {$pull: {comments:commentId}});             
                await Comment.findByIdAndDelete(commentId);
                return
}