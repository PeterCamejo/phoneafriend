import connectDB from "../../../../lib/mongodb";
import Post from "../../../../models/Post"
import Comment from "../../../../models/Comment"


export default async function handler(req,res){
    const {method} = req;
    
    await connectDB()

    switch(method){
        case 'POST':
            try{
                const body = JSON.parse(req.body);
                const post = await Post.findById(body.postId);
                const comment = new Comment(body.comment);            
                post.comments.push(comment);
                await comment.save();
                await post.save();

                res.status(200).json({success: true , data: "Added your comment!"})
            }catch( error ){
                res.status(400).json({success:false})
            }
            break
        default:
            res.status(400).json({success:false});
    }
}
