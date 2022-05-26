import session from '../../lib/middlewares/session';
import passport from '../../lib/passport'
import nextCOptions from '../../lib/nextConnectOptions'
import nc from 'next-connect'
import {isLoggedIn, isPostAuthor} from '../../lib/middlewares/user'
import {validatePost} from '../../lib/middlewares/joiValidation'
import catchAsync from '../../utils/catchAsync'
import {getPostIndex, createPost, updatePost, deletePost} from '../../controllers/posts'

const handler = nc(nextCOptions);

handler.use(session);
handler.use(passport.initialize());
handler.use(passport.session());



handler.get(catchAsync(async(req, res) =>{
                const posts = await getPostIndex();
                res.status(200).json({success: true , data: posts})
}))

handler.post(isLoggedIn, validatePost, catchAsync(async (req, res) =>{
                try{
                    await createPost(req);
                    res.status(201).json({success: true, data: "Successfully posted!"})
                }catch(error){
                    res.status(400).json({success:false});
                }
                
}))

handler.put(isLoggedIn, isPostAuthor, validatePost, catchAsync(async (req, res)=>{
                try{   
                    await updatePost(req);
                    res.status(200).json({success:true, data:'Successfully updated!'})
                }catch(error){
                    res.status(400).json({success:false})
                }
}))

handler.delete(isLoggedIn, isPostAuthor, catchAsync(async(req,res)=>{
            try{
                await deletePost(req);
                res.status(200).json({success:true, data:"Successfully deleted."})
            }catch(error){
                res.status(400).json({success:false})
            }
}))

export default handler






// import connectDB from "../../lib/mongodb";
// import Post from "../../models/Post"


// export default async function handler(req,res){
//     const {method} = req;

//     await connectDB()

//     switch(method){
//         case 'GET':
//             try{
//                 const posts = await Post.find({})
//                 res.status(200).json({success: true , data: posts})
//             }catch( error ){
//                 res.status(400).json({success:false})
//             }
//             break
//         case 'POST':
//             try{
//                 let post = JSON.parse(req.body);
//                 await Post.create(post);
//                 res.status(201).json({success: true, data: "Successfully posted!"})
//             }catch( error ){
//                 res.status(400).json({success:false})
//             }
//             break;
//         case 'DELETE':
//             try{
//                 let _id = JSON.parse(req.body);
//                 await Post.findByIdAndDelete(_id);
//                 res.status(200).json({success:true, data:"Successfully deleted."})
           
//             }catch(error){
//                 res.status(400).json({success:false})
//             }
//             break;
//         case 'PUT':
//                 try{
//                     let post = JSON.parse(req.body);
//                     await Post.findByIdAndUpdate(post._id, {title: post.title, body: post.body});
//                     res.status(200).json({success:true, data:'Successfully updated!'})
//                 }catch(error){
//                     res.status(400).json({success:false})
//                 }
//                 break;
//             default:
//                 res.status(400).json({success:false})
//                 break
//     }
// }