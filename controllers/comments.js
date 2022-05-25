import Comment from '../models/Comment'
import Post from '../models/Post'
import User from '../models/User'


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

export async function incrementCommentRating(req){
        const {commentId} = JSON.parse(req.body);
        await Comment.findByIdAndUpdate(commentId, {$inc:{ rating: 1}});
        return;
}

export async function decrementCommentRating(req){
        const {commentId} = JSON.parse(req.body);
        await Comment.findByIdAndUpdate(commentId, {$inc:{ rating: -1 }});
        return;
}

export async function setCommentVoteInUser(req){
        const {commentId , vote} = JSON.parse(req.body);
        const votedComment = { 
                comment: commentId,
                vote
        }
        const currentUser = await User.findById(req.user._id);

        let updated = false;
        currentUser.votedComments.map(votedcomment => {
                if(votedcomment.comment.equals(commentId)){
                        votedcomment.vote = vote;
                        updated = true;
                        return;
                }       
        });

        if(!updated){
                currentUser.votedComments.push(votedComment);            
        }

        await currentUser.save();
        
        return;
}

export async function removeCommentVoteInUser(req){
        const {commentId} = JSON.parse(req.body);
        const currentUser = await User.findById(req.user._id);

        let commentToRemove = "";
        currentUser.votedComments.map(votedcomment =>{
                if(votedcomment.comment.equals(commentId)){
                        commentToRemove = votedcomment;
                }
        })

        await currentUser.votedComments.pull({_id: commentToRemove._id});
        await currentUser.save();
        return;
}