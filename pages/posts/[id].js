import { useRouter } from "next/router"
import Link from 'next/link'
import Flash from '../../components/flash/Flash'
import {useState, useEffect} from 'react'
import Comments from "../../components/comment/Comments"
import PostBody from "../../components/post/PostBody"
import AuthorButtons from "../../components/AuthorButtons"
import FlashError from "../../components/flash/FlashError"


function ShowPost(props) {
    const router = useRouter();
    const [flashError , setFlashError] = useState('');
    const [flashSuccess, setFlashSuccess] = useState(props.flash);


    return(
        <div className="flex flex-col justify-center items-center h-screen w-screen">
        
            <Flash body={flashSuccess} />
            {flashError && <FlashError body={flashError} /> }

            <PostBody post={props.post} /> 
            <AuthorButtons post={props.post} /> 
            <Comments postId={props.post._id} comments={props.post.comments ? props.post.comments : ""}/>
        
        </div>
    )
}

export async function getServerSideProps(context) {
    const URL = process.env.NODE_ENV === 'production' ? process.env.SITE_URL : process.env.LOCAL_URL;
    const route = `/api/posts/${context.query.postId}/?postId=${context.query.postId}`;
    const path = URL + route;
    let flash = context.query.flash ? context.query.flash : "";
    let response = await fetch(path);
    let data = await response.json();
    let post = null;
    if(data){
        post = data.data;
    }


    return{
        props:{
            post: post,
            flash:flash
        }
    }
}




export default ShowPost