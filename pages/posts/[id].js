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
        <div className="flex flex-col justify-center border-2 border-solid border-black items-center h-screen w-screen">
     
            <Flash body={flashSuccess} />
            {flashError && <FlashError body={flashError} /> }
            
            <PostBody post={props.post} />
            <AuthorButtons post={props.post} />
            <Comments postId={props.post.id} comments={props.post.comments}/>

        </div>
    )
}

export async function getServerSideProps(context) {
    let flash = context.query.flash ? context.query.flash : "";
    let post = {
        title: context.query.title,
        author: context.query.author,
        body: context.query.body,
        id: context.query.id,
        comments: context.query.comments
    }
    return{
        props:{
            post:post,
            flash:flash
        }
    }
}



export default ShowPost