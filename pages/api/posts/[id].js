import connectDB from "../../../lib/mongodb";
import Post from "../../../models/Post"
import Comment from "../../../models/Comment"

export default async function handler(req,res){
    const {method} = req;

    await connectDB()

    switch(method){
        case 'GET':
            try{
                const post = await Post.findById(req.query.postId).populate('comments');
                res.status(200).json({success: true , data: post })
            }catch( error ){
                res.status(400).json({success:false})
            }
            break
        default:
            res.status(400).json({success:false})
            break
    }
}