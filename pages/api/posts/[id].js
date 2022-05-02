import connectDB from "../../../lib/mongodb";
import Post from "../../../models/Post"

export default async function handler(req,res){
    const {method} = req;
    console.log(req)
    console.log(res)
    await connectDB()

    switch(method){
        case 'GET':
            try{
                const posts = await Post.find({})
                res.status(200).json({success: true , data: 'ok' })
            }catch( error ){
                res.status(400).json({success:false})
            }
            break
        default:
            res.status(400).json({success:false})
            break
    }
}