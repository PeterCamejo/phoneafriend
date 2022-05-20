import Flash from '../../components/flash/Flash'
import {useState} from 'react'
import Comments from "../../components/comment/Comments"
import PostBody from "../../components/post/PostBody"
import AuthorButtons from "../../components/user/AuthorButtons"
import FlashError from "../../components/flash/FlashError"
import Post from "../../models/Post"
import connectDB from "../../lib/mongodb";
import {useUser} from '../../lib/hooks'

import useSWR from 'swr'
import { fetcherFn } from '../../lib/hooks'

function ShowPost(props) {
    const [flashError , setFlashError] = useState('');
    const [flashSuccess, setFlashSuccess] = useState(props.flash);
    const[user, {loading}] = useUser();
    const [post,  setPost] = useState(props.post);


   const isAuthor = ()=> {
            if((user || loading) && user !== undefined){
                        if(props.author._id === user._id){
                            return true;
                        }
                }

            return false;
    }

    return(
        <div className="flex flex-col p-5 items-center h-screen w-screen">
            <div className="container h-1/2 flex flex-col justify-center">
                <div className="container">
                    {flashSuccess && <Flash body={flashSuccess} /> }
                    {flashError && <FlashError body={flashError} /> }
                </div>
                <PostBody post={props.post} author={props.author} /> 
                {isAuthor() && <AuthorButtons post={props.post} /> }
            </div>
            <div className="container h-1/2">
                <Comments postId={props.post._id} comments={props.comments ? props.comments : ""}/>
            </div>
        </div>
    )
}

export async function getServerSideProps(context) {    
    let flash = context.query.flash ? context.query.flash : "";
    let post = null;
    let author = null;
    let comments = null;

    // Functions like /api/posts/[id] would have, get a specific Post based on the given Id. 
    // Can't call internal api routes in getServerSideProps, so just do that server stuff
    // directly in getServerSideProps
    await connectDB();

    try{
        post = await Post.findById(context.query.postId).populate('comments').populate('author');
        author = post.author;
        comments = post.comments;
        post = {
            _id: post._id,
            title: post.title,
            body: post.body
        }
    }catch( error ){
        //handle
        console.log(error);
    }

    return{
        props:{
            post: JSON.parse(JSON.stringify(post)),
            author: JSON.parse(JSON.stringify(author)),
            comments: JSON.parse(JSON.stringify(comments)),
            flash
        }
    }
}




export default ShowPost