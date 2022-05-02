import connectDB from "../../lib/mongodb";
import Post from "../../models/Post"

export default async function handler(req,res){
    const {method} = req;

    await connectDB()

    switch(method){
        case 'GET':
            try{
                const posts = await Post.find({})
                res.status(200).json({success: true , data: posts})
            }catch( error ){
                res.status(400).json({success:false})
            }
            break
        case 'POST':
            try{
                let post = JSON.parse(req.body);
                Post.create(post);
                res.status(201).json({success: true, data: "Successfully posted!"})
            }catch( error ){
                res.status(400).json({success:false})
            }
            break
        default:
            res.status(400).json({success:false})
            break
    }
}