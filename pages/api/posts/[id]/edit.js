import connectDB from "../../../lib/mongodb";
import Post from "../../../models/Post"

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
                await Post.create(post);
                res.status(201).json({success: true, data: "Successfully posted!"})
            }catch( error ){
                res.status(400).json({success:false})
            }
            break;
        case 'DELETE':
            try{
                let id = JSON.parse(req.body);
                await Post.findByIdAndDelete(id);
                //res.redirect('/')
                res.status(200).json({success:true, data:"Successfully deleted."})
                
            }catch(error){
                res.status(400).json({success:false})
            }
            break;
        case 'PUT':
            try{
                console.log('here 1');
                let post = JSON.parse(req.body);
                console.log('here 2');
                await Post.findByIdAndUpdate(post.id,{title: post.title, body: post.body});
                res.status(200).json({success:true, data:'Successfully updated!'})
            }catch(error){
                res.status(400).json({success:false})
            }
            break;
        default:
            res.status(400).json({success:false})
            break
    }
}