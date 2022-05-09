import connectDB from "../../../../lib/mongodb";
import Post from "../../../../models/Post"
import Comment from "../../../../models/Comment"


export default async function handler(req,res){
    const {method} = req;
    
    await connectDB()

    switch(method){
        case 'GET':
            try{
                const comments = await Comment.find({});
                res.status(200).json({success: true, data : comments});
            }catch(error){
                res.status(400).json({success:false})
            }
            break;
        case 'POST':
            try{
                const body = JSON.parse(req.body);
                const post = await Post.findById(body.postId);
                const comment = new Comment(body.comment);            
                post.comments.push(comment);
                await comment.save();
                await post.save();

                res.status(200).json({success: true , data: comment})
            }catch( error ){
                res.status(400).json({success:false})
            }
            break
        case 'DELETE':
            try{
                const {postId , commentId} = JSON.parse(req.body);
                await Post.findByIdAndUpdate(postId, {$pull: {comments:commentId}});             
                await Comment.findByIdAndDelete(commentId);
                res.status(200).json({success:true, data:"Comment deleted."})
            }catch(error){
                res.status(400).json({success:false});
            }
            break;
        default:
            res.status(400).json({success:false});
    }
}
