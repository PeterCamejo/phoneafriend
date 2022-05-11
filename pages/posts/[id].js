import { useRouter } from "next/router"
import Link from 'next/link'
import Flash from '../../components/flash/Flash'
import {useState, useEffect} from 'react'
import Comments from "../../components/comment/Comments"
import PostBody from "../../components/post/PostBody"
import AuthorButtons from "../../components/AuthorButtons"
import FlashError from "../../components/flash/FlashError"
import Post from "../../models/Post"
import connectDB from "../../lib/mongodb";




function ShowPost(props) {
    const [flashError , setFlashError] = useState('');
    const [flashSuccess, setFlashSuccess] = useState(props.flash);

    const setPageFlash = (flash , error) => {
        if(error){
            setFlashError(flash);
        }else{
            setFlashSuccess(flash);
        }
    }



    return(
        <div className="flex flex-col p-5 items-center h-screen w-screen">
            <div className="container h-1/2 flex flex-col justify-center">
                <div className="container">
                    {flashSuccess && <Flash body={flashSuccess} /> }
                    {flashError && <FlashError body={flashError} /> }
                </div>
                <PostBody post={props.post} /> 
                <AuthorButtons post={props.post} /> 
            </div>
            <div className="container h-1/2">
                <Comments postId={props.post._id} setPageFlash={setPageFlash} comments={props.post.comments ? props.post.comments : ""}/>
            </div>
        </div>
    )
}

export async function getServerSideProps(context) {    
    let flash = context.query.flash ? context.query.flash : "";
    let post = null;

    // Functions like /api/posts/[id] would have, get a specific Post based on the given Id. 
    // Can't call internal api routes in getServerSideProps, so just do that server stuff
    // directly in getServerSideProps
    await connectDB();

    try{
        post = await Post.findById(context.query.postId).populate('comments');
    }catch( error ){
        //handle
        console.log(error);
    }

    return{
        props:{
            post: JSON.parse(JSON.stringify(post)) , //I dont want to talk about this, it works ok.
            flash:flash
        }
    }
}




export default ShowPost